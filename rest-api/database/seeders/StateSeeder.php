<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $states = [
            ['id' => 1, 'name' => 'Začátek'],
            ['id' => 2, 'name' => 'V procesu'],
            ['id' => 3, 'name' => 'Dokončení'],
            ['id' => 4, 'name' => 'Celek'],
            ['id' => 5, 'name' => 'Chybí část']
        ];


        DB::table('states')->insert($states);

    }
}
