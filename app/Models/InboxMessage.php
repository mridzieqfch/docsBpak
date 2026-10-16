<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InboxMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_name',
        'sender_id_number',
        'question_category',
        'message_body',
        'is_read',
    ];

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
        ];
    }
}
