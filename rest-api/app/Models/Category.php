<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    /**
     * The table associated with the model
     *
     * @var string
     */

    protected $table = 'categories';

    public function todos()
    {
        return $this->hasMany(Todo::class);
    }
}
