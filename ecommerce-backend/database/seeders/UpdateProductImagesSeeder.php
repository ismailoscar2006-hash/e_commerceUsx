<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UpdateProductImagesSeeder extends Seeder
{
    public function run(): void
    {
        $categoryImageMap = [
            'Smartphones' => 'smartphones',
            'Laptops' => 'laptops',
            'Desktop Computers' => 'desktops',
            'Gaming PCs' => 'gaming-pcs',
            'Tablets' => 'tablets',
            'Smart Watches' => 'smartwatches',
            'Headphones' => 'headphones',
            'Earbuds' => 'earbuds',
            'Speakers' => 'speakers',
            'Monitors' => 'monitors',
            'Keyboards' => 'keyboards',
            'Mice' => 'mice',
            'Printers' => 'printers',
            'Cameras' => 'cameras',
            'Networking' => 'networking',
            'Storage Devices' => 'storage',
            'Power Banks' => 'powerbanks',
            'Chargers' => 'chargers',
            'Computer Accessories' => 'accessories',
            'Gaming Accessories' => 'gaming-accessories',
        ];

        Product::with('category')->chunk(50, function ($products) use ($categoryImageMap) {
            foreach ($products as $product) {
                $categoryName = $product->category->name;
                $folder = $categoryImageMap[$categoryName] ?? 'products';

                $filename = Str::slug($product->name, '-') . '.jpg';
                $imagePath = "products/{$folder}/{$filename}";

                $product->update(['image' => $imagePath]);
            }
        });
    }
}
