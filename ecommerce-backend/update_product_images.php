<?php
/**
 * Script pour mettre à jour les chemins d'images des produits
 *
 * Utilisation:
 * php artisan tinker
 * > include('update_product_images.php');
 */

// Mapping des produits aux images
$productImageMap = [
    'Apple iPhone 15 Pro Max 256GB' => 'products/smartphones/iphone15promax.jpg',
    'Apple iPhone 15 256GB' => 'products/smartphones/iphone15.jpg',
    'Samsung Galaxy S24 Ultra 512GB' => 'products/smartphones/galaxy-s24-ultra.jpg',
    'Samsung Galaxy S24 Pro 256GB' => 'products/smartphones/galaxy-s24.jpg',
    // Ajouter d'autres produits selon le besoin
];

// Mettre à jour les produits
foreach ($productImageMap as $productName => $imagePath) {
    $product = \App\Models\Product::where('name', $productName)->first();

    if ($product) {
        $product->update(['image' => $imagePath]);
        echo "✓ Mis à jour: $productName → $imagePath\n";
    } else {
        echo "✗ Produit non trouvé: $productName\n";
    }
}

echo "\n✅ Mise à jour des images terminée!\n";
?>
