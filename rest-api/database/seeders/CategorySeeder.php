<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['id' => 1, 'name' => 'Práce'],
            ['id' => 2, 'name' => 'Škola'],
            ['id' => 3, 'name' => 'Domov'],
            ['id' => 4, 'name' => 'Zahrada']
        ];

        DB::table('categories')->insert($categories);
    }
}
