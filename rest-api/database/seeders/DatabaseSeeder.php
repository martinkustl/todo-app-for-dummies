<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->delete();
        DB::table('states')->delete();
        // \App\Models\User::factory(10)->create();

        $this->call([
            CategorySeeder::class,
            StateSeeder::class
        ]);
    }
}
