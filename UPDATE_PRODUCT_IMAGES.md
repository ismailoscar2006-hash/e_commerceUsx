# Mettre à jour les images des produits

## Problème

Les images stockées dans `storage/app/public/products/smartphones/` ne s'affichent pas car la colonne `image` de la table `products` n'a pas le chemin des fichiers.

## Solution

Mettez à jour la colonne `image` pour chaque produit avec le chemin du fichier image correspondant.

### Option 1: Utiliser Laravel Tinker (Recommandé)

```bash
cd ecommerce-backend
php artisan tinker
```

Puis, dans Tinker, exécutez:

```php
// Mettre à jour iPhone 15 Pro Max
\App\Models\Product::where('name', 'Apple iPhone 15 Pro Max 256GB')
    ->update(['image' => 'products/smartphones/iphone15promax.jpg']);

// Mettre à jour iPhone 15
\App\Models\Product::where('name', 'Apple iPhone 15 256GB')
    ->update(['image' => 'products/smartphones/iphone15.jpg']);

// Mettre à jour Galaxy S24 Ultra
\App\Models\Product::where('name', 'Samsung Galaxy S24 Ultra 512GB')
    ->update(['image' => 'products/smartphones/galaxy-s24-ultra.jpg']);

// Mettre à jour Galaxy S24 Pro
\App\Models\Product::where('name', 'Samsung Galaxy S24 Pro 256GB')
    ->update(['image' => 'products/smartphones/galaxy-s24.jpg']);

// Quitter
exit
```

### Option 2: Vérifier les produits existants

Avant de mettre à jour, listez les noms exacts des produits:

```php
php artisan tinker
> \App\Models\Product::all('id', 'name')->toArray();
```

Adaptez les noms exacts dans les commandes UPDATE.

### Option 3: Mettre à jour via SQL direct

```bash
# SQL pour MySQL/PostgreSQL
UPDATE products 
SET image = 'products/smartphones/iphone15promax.jpg'
WHERE name LIKE '%iPhone 15 Pro Max%';

UPDATE products 
SET image = 'products/smartphones/iphone15.jpg'
WHERE name LIKE '%iPhone 15 256GB%' AND name NOT LIKE '%Pro Max%';

UPDATE products 
SET image = 'products/smartphones/galaxy-s24-ultra.jpg'
WHERE name LIKE '%Galaxy S24 Ultra%';

UPDATE products 
SET image = 'products/smartphones/galaxy-s24.jpg'
WHERE name LIKE '%Galaxy S24 Pro%';
```

---

## Vérification

Après la mise à jour, vérifiez via l'API:

```bash
curl http://127.0.0.1:8000/api/products | jq '.data[] | {name, image}'
```

Vous devriez voir les URLs complètes:
```json
{
  "name": "Apple iPhone 15 Pro Max 256GB",
  "image": "http://127.0.0.1:8000/storage/products/smartphones/iphone15promax.jpg"
}
```

---

## Images disponibles

Fichiers existants dans `storage/app/public/products/smartphones/`:

- `default.svg` - Image par défaut SVG
- `iphone15promax.jpg` - iPhone 15 Pro Max (RÉEL)

---

## Résultat

Une fois mis à jour, les images s'afficheront:

- ✅ Home page - Featured products
- ✅ Products page - Product grid
- ✅ Product details page
- ✅ Cart page
- ✅ Admin dashboard

---

## Troubleshooting

### Les images ne s'affichent toujours pas?

1. Vérifiez que le serveur Laravel est en cours d'exécution:
   ```bash
   php artisan serve
   ```

2. Testez l'URL directement:
   ```
   http://127.0.0.1:8000/storage/products/smartphones/iphone15promax.jpg
   ```

3. Vérifiez que le lien symbolique existe:
   ```bash
   ls -la storage/app/public/
   ```

4. Vérifiez que le fichier image existe:
   ```bash
   ls -la storage/app/public/products/smartphones/
   ```

5. Videz le cache du navigateur (Ctrl+Shift+Delete)

6. Vérifiez la base de données:
   ```php
   php artisan tinker
   > \App\Models\Product::where('name', 'Apple iPhone 15 Pro Max 256GB')->first()->image;
   ```
