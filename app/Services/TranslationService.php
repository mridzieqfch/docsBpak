<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TranslationService
{
    /**
     * Circuit breaker state for current request execution.
     */
    protected static bool $circuitBroken = false;

    protected static ?float $startTime = null;

    protected static float $maxCumulativeSeconds = 2.0;

    /**
     * Reset circuit breaker (useful for CLI commands or tests).
     */
    public static function resetCircuitBreaker(): void
    {
        static::$circuitBroken = false;
        static::$startTime = null;
    }

    /**
     * Translate a given text or HTML content from source language to target language.
     */
    public static function translate(?string $text, string $target = 'en', string $source = 'id'): ?string
    {
        if ($text === null || trim($text) === '') {
            return $text;
        }

        if ($source === $target) {
            return $text;
        }

        if (static::$circuitBroken) {
            return $text;
        }

        if (static::$startTime === null) {
            static::$startTime = microtime(true);
        } elseif ((microtime(true) - static::$startTime) > static::$maxCumulativeSeconds) {
            static::$circuitBroken = true;
            Log::warning('TranslationService: Circuit breaker triggered due to cumulative time limit.');

            return $text;
        }

        try {
            if ($text !== strip_tags($text)) {
                return static::translateHtml($text, $target, $source);
            }

            return static::translateText($text, $target, $source);
        } catch (\Throwable $e) {
            Log::error('TranslationService Error: '.$e->getMessage());
            static::$circuitBroken = true;

            return $text;
        }
    }

    /**
     * Translate plain text chunk.
     */
    protected static function translateText(string $text, string $target, string $source): string
    {
        if (static::$circuitBroken) {
            return $text;
        }

        $chunks = str_split($text, 500);
        $translatedChunks = [];

        foreach ($chunks as $chunk) {
            if (trim($chunk) === '') {
                $translatedChunks[] = $chunk;

                continue;
            }

            if (static::$circuitBroken || (static::$startTime !== null && (microtime(true) - static::$startTime) > static::$maxCumulativeSeconds)) {
                static::$circuitBroken = true;
                $translatedChunks[] = $chunk;

                continue;
            }

            // Primary: MyMemory API
            try {
                $response = Http::timeout(1)->get('https://api.mymemory.translated.net/get', [
                    'q' => $chunk,
                    'langpair' => "{$source}|{$target}",
                ]);

                if ($response->successful()) {
                    $json = $response->json();
                    $translatedText = $json['responseData']['translatedText'] ?? null;
                    if (! empty($translatedText) && strtoupper($translatedText) !== 'IS EMPTY') {
                        $translatedChunks[] = html_entity_decode($translatedText, ENT_QUOTES | ENT_HTML5, 'UTF-8');

                        continue;
                    }
                }
            } catch (\Throwable $e) {
                // Fallback to Google Translate endpoint below
            }

            // Fallback: Google Translate GTX API
            try {
                $url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl='.$source.'&tl='.$target.'&dt=t&q='.rawurlencode($chunk);
                $response = Http::timeout(1)->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                ])->get($url);

                if ($response->successful()) {
                    $result = $response->json();
                    if (isset($result[0]) && is_array($result[0])) {
                        $translatedPiece = '';
                        foreach ($result[0] as $sentence) {
                            if (isset($sentence[0])) {
                                $translatedPiece .= $sentence[0];
                            }
                        }
                        if (! empty($translatedPiece)) {
                            $translatedChunks[] = $translatedPiece;

                            continue;
                        }
                    }
                }
            } catch (\Throwable $e) {
                // If both APIs fail/timeout, break circuit to avoid delaying future items
                static::$circuitBroken = true;
            }

            $translatedChunks[] = $chunk;
        }

        return implode('', $translatedChunks);
    }

    /**
     * Translate HTML content while preserving HTML structure.
     */
    protected static function translateHtml(string $html, string $target, string $source): string
    {
        $parts = preg_split('/(<[^>]+>)/', $html, -1, PREG_SPLIT_DELIM_CAPTURE);
        $translatedParts = [];

        foreach ($parts as $part) {
            if (static::$circuitBroken) {
                $translatedParts[] = $part;

                continue;
            }

            if (preg_match('/^<[^>]+>$/', $part)) {
                $translatedParts[] = $part;
            } elseif (trim($part) !== '') {
                $translatedParts[] = static::translateText($part, $target, $source);
            } else {
                $translatedParts[] = $part;
            }
        }

        return implode('', $translatedParts);
    }
}
