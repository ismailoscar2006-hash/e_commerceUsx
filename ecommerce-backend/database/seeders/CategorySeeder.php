<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Smartphones',
            'Laptops',
            'Desktop Computers',
            'Gaming PCs',
            'Tablets',
            'Smart Watches',
            'Headphones',
            'Earbuds',
            'Speakers',
            'Monitors',
            'Keyboards',
            'Mice',
            'Printers',
            'Cameras',
            'Networking',
            'Storage Devices',
            'Power Banks',
            'Chargers',
            'Computer Accessories',
            'Gaming Accessories',
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
