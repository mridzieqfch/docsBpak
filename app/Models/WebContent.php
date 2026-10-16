<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_key',
        'content_text',
        'content_text_en',
    ];
}
