<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed categories and products from dedicated seeders
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);

        // Admin User
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin'),
            'role' => 'admin',
            'phone' => '0612345678',
            'address' => '123 Rue Admin, Paris',
        ]);

        // Admin User 2
        $admin2 = User::create([
            'name' => 'Admin User 2',
            'email' => 'admin2@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '0698765432',
            'address' => '456 Avenue Admin, Lyon',
        ]);

        // Client User
        $client = User::create([
            'name' => 'Test Client',
            'email' => 'client@example.com',
            'password' => Hash::make('password'),
            'role' => 'client',
            'phone' => '0612345678',
            'address' => '789 Boulevard Client, Marseille',
        ]);

        // Create carts for users
        Cart::create(['user_id' => $admin->id]);
        Cart::create(['user_id' => $admin2->id]);
        Cart::create(['user_id' => $client->id]);

        // Create 15 random client users
        User::factory(15)->create()->each(function ($user) {
            Cart::create(['user_id' => $user->id]);
        });
    }
}
