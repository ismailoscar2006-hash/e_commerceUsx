<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CreatePlaceholderImages extends Command
{
    protected $signature = 'images:create-placeholders';
    protected $description = 'Create placeholder images for all products';

    public function handle()
    {
        $this->info('🖼️  Creating placeholder images for all products...');

        $products = Product::with('category')->get();
        $createdCount = 0;
        $skippedCount = 0;

        foreach ($products as $product) {
            $imagePath = $product->image;

            // Check if image already exists
            if (Storage::disk('public')->exists($imagePath)) {
                $skippedCount++;
                $this->line("⏭️  Skipped: {$product->name} (image exists)");
                continue;
            }

            try {
                // Create placeholder image
                if ($this->createPlaceholder($imagePath, $product->name)) {
                    $createdCount++;
                    $this->line("✅ Created: {$imagePath}");
                } else {
                    $this->line("❌ Failed: {$imagePath}");
                }
            } catch (\Exception $e) {
                $this->error("Error for {$product->name}: " . $e->getMessage());
            }
        }

        $this->info("\n🎉 Created: {$createdCount} | Skipped: {$skippedCount}");
    }

    private function createPlaceholder(string $imagePath, string $productName): bool
    {
        // Only proceed if GD is available
        if (!extension_loaded('gd')) {
            $this->warn('⚠️  GD extension not loaded. Install imagick or use real images.');
            return false;
        }

        try {
            // Create image (400x300)
            $image = imagecreatetruecolor(400, 300);
            $bgColor = imagecolorallocate($image, 230, 230, 230);
            $textColor = imagecolorallocate($image, 100, 100, 100);

            imagefill($image, 0, 0, $bgColor);

            // Add text
            $text = substr($productName, 0, 25) . '...';
            $fontFile = __DIR__ . '/../../fonts/arial.ttf';

            if (file_exists($fontFile)) {
                imagettftext($image, 14, 0, 20, 150, $textColor, $fontFile, $text);
            } else {
                imagestring($image, 3, 50, 140, $text, $textColor);
            }

            // Create directory if needed
            $directory = dirname('public/' . $imagePath);
            if (!Storage::disk('public')->exists(dirname($imagePath))) {
                Storage::disk('public')->makeDirectory(dirname($imagePath));
            }

            // Save image
            $tempFile = storage_path('temp_' . uniqid() . '.jpg');
            imagejpeg($image, $tempFile, 85);
            imagedestroy($image);

            // Store in public disk
            $content = file_get_contents($tempFile);
            Storage::disk('public')->put($imagePath, $content);
            @unlink($tempFile);

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
