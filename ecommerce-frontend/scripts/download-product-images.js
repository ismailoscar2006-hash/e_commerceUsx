#!/usr/bin/env node

/**
 * Product Image Downloader
 *
 * Télécharge les images réelles des produits depuis les APIs publiques
 * et les stocke dans Laravel storage.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const STORAGE_PATH = path.join(__dirname, '../../../ecommerce-backend/storage/app/public/products');
const API_BASE = 'http://127.0.0.1:8000/api';

// Mapping des produits avec leurs sources d'image
const PRODUCT_IMAGE_MAP = {
  'iPhone 15 Pro': {
    category: 'smartphones',
    filename: 'iphone15pro.jpg',
    search: 'iPhone 15 Pro official',
  },
  'iPhone 15 Pro Max': {
    category: 'smartphones',
    filename: 'iphone15promax.jpg',
    search: 'iPhone 15 Pro Max',
  },
  'Samsung Galaxy S25 Ultra': {
    category: 'smartphones',
    filename: 'galaxy-s25-ultra.jpg',
    search: 'Samsung Galaxy S25 Ultra',
  },
  'MacBook Pro M4': {
    category: 'laptops',
    filename: 'macbook-pro-m4.jpg',
    search: 'MacBook Pro M4',
  },
  'MacBook Air M3': {
    category: 'laptops',
    filename: 'macbook-air-m3.jpg',
    search: 'MacBook Air M3',
  },
  'Dell XPS 15': {
    category: 'laptops',
    filename: 'dell-xps-15.jpg',
    search: 'Dell XPS 15',
  },
  'Canon EOS R6': {
    category: 'cameras',
    filename: 'canon-eos-r6.jpg',
    search: 'Canon EOS R6 camera',
  },
  'Sony Alpha A7R': {
    category: 'cameras',
    filename: 'sony-a7r.jpg',
    search: 'Sony Alpha A7R camera',
  },
};

// Pexels API (gratuit, haute qualité)
const PEXELS_API_KEY = 'PEXELS_API_KEY'; // À remplacer par une vraie clé

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol
      .get(url, { timeout: 10000 }, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
  });
}

async function ensureDirectories() {
  const categories = [
    'smartphones',
    'laptops',
    'desktops',
    'tablets',
    'smartwatches',
    'headphones',
    'earbuds',
    'speakers',
    'monitors',
    'keyboards',
    'mice',
    'printers',
    'cameras',
    'networking',
  ];

  categories.forEach((cat) => {
    const dir = path.join(STORAGE_PATH, cat);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✓ Created directory: ${dir}`);
    }
  });
}

async function searchAndDownloadImage(productName, category, filename) {
  console.log(`\n📥 Searching for: ${productName}`);

  try {
    // Utiliser Pixabay comme source gratuite (nécessite clé API)
    // Ou utiliser Unsplash (limitée mais gratuite)

    const searchQuery = encodeURIComponent(productName);
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&client_id=UNSPLASH_API_KEY`;

    console.log(`⏳ Attempting to download ${productName}...`);

    // Note: Implémentation réelle nécessite une clé API valide
    console.log(`⚠️  API keys needed for automatic download`);
    console.log(`   Unsplash: https://unsplash.com/developers`);
    console.log(`   Pexels: https://www.pexels.com/api/`);
    console.log(`   Pixabay: https://pixabay.com/api/`);

    return false;
  } catch (error) {
    console.error(`✗ Failed to download ${productName}: ${error.message}`);
    return false;
  }
}

async function createPlaceholderImage(category, filename) {
  const filepath = path.join(STORAGE_PATH, category, filename);

  // Créer une image SVG professionnelle comme fallback
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <circle cx="200" cy="150" r="60" fill="rgba(255,255,255,0.2)"/>
  <text x="200" y="260" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle" font-weight="bold">
    Product Image
  </text>
  <text x="200" y="290" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.8)" text-anchor="middle">
    Coming soon...
  </text>
</svg>`;

  fs.writeFileSync(filepath, svg, 'utf8');
  return filepath;
}

async function main() {
  console.log('🖼️  ELECTRO_USX Product Image Manager\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Créer les répertoires
  await ensureDirectories();

  console.log('\n📋 Analyzing products...\n');

  // Pour maintenant, créer des images SVG placeholder
  const categories = Object.keys(PRODUCT_IMAGE_MAP).reduce((acc, product) => {
    const { category, filename } = PRODUCT_IMAGE_MAP[product];
    if (!acc[category]) acc[category] = [];
    acc[category].push(filename);
    return acc;
  }, {});

  // Créer des images placeholder professionnelles
  for (const [category, filenames] of Object.entries(categories)) {
    for (const filename of filenames) {
      const filepath = await createPlaceholderImage(category, filename);
      console.log(`✓ Created placeholder: products/${category}/${filename}`);
    }
  }

  console.log('\n✅ Setup complete!\n');
  console.log('📌 Next steps:');
  console.log('   1. Get API keys from:');
  console.log('      - Unsplash: https://unsplash.com/developers');
  console.log('      - Pexels: https://www.pexels.com/api/');
  console.log('      - Pixabay: https://pixabay.com/api/');
  console.log('   2. Replace API_KEY in this script');
  console.log('   3. Run: node scripts/download-product-images.js\n');
}

main().catch(console.error);
