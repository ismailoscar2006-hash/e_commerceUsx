<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateProductImages extends Command
{
    protected $signature = 'products:generate-images';
    protected $description = 'Generate product image paths based on category and product name';

    public function handle()
    {
        $this->info('🖼️  Generating product images...');

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

        $products = Product::with('category')->get();
        $updatedCount = 0;

        foreach ($products as $product) {
            $categoryName = $product->category->name;
            $folder = $categoryImageMap[$categoryName] ?? 'products';

            // Generate clean filename from product name
            $filename = Str::slug($product->name, '-') . '.jpg';
            $imagePath = "products/{$folder}/{$filename}";

            $product->update(['image' => $imagePath]);
            $updatedCount++;

            $this->line("✅ {$product->name} → {$imagePath}");
        }

        $this->info("\n🎉 Successfully updated {$updatedCount} products!");
    }
}
