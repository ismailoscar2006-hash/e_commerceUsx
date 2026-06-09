/**
 * Image Service
 *
 * Gère le mapping des images de produits vers les fichiers stockés dans Laravel storage
 */

const STORAGE_BASE = 'http://127.0.0.1:8000/storage/products'

// Extensions d'image supportées (dans l'ordre de préférence)
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.svg', '.webp']

// Catégories disponibles dans storage
const CATEGORIES = {
  smartphones: 'smartphones',
  laptops: 'laptops',
  desktops: 'desktops',
  tablets: 'tablets',
  smartwatches: 'smartwatches',
  headphones: 'headphones',
  earbuds: 'earbuds',
  speakers: 'speakers',
  monitors: 'monitors',
  keyboards: 'keyboards',
  mice: 'mice',
  printers: 'printers',
  cameras: 'cameras',
  networking: 'networking',
}

// Mapping explicite des produits connus
const KNOWN_PRODUCTS = {
  'iPhone 15 Pro': {
    category: 'smartphones',
    filename: 'iphone15pro.jpg',
  },
  'iPhone 15 Pro Max': {
    category: 'smartphones',
    filename: 'iphone15promax.jpg',
  },
  'Samsung Galaxy S25 Ultra': {
    category: 'smartphones',
    filename: 'galaxy-s25-ultra.jpg',
  },
  'Samsung Galaxy S25': {
    category: 'smartphones',
    filename: 'galaxy-s25.jpg',
  },
  'MacBook Pro': {
    category: 'laptops',
    filename: 'macbook-pro.jpg',
  },
  'MacBook Air': {
    category: 'laptops',
    filename: 'macbook-air.jpg',
  },
  'Dell XPS': {
    category: 'laptops',
    filename: 'dell-xps.jpg',
  },
  'Canon EOS R6': {
    category: 'cameras',
    filename: 'canon-eos-r6.jpg',
  },
  'Sony Alpha A7R': {
    category: 'cameras',
    filename: 'sony-a7r.jpg',
  },
  'HP LaserJet': {
    category: 'printers',
    filename: 'hp-laserjet.jpg',
  },
}

/**
 * Détecte la catégorie d'un produit
 */
function detectCategory(product) {
  if (!product) return null

  const name = (product.name || '').toLowerCase()
  const categoryName = (product.category?.name || '').toLowerCase()

  // Vérifier le nom de la catégorie du produit
  for (const [key, val] of Object.entries(CATEGORIES)) {
    if (categoryName.includes(key)) {
      return key
    }
  }

  // Vérifier le nom du produit
  if (
    name.includes('iphone') ||
    name.includes('samsung') ||
    name.includes('galaxy') ||
    name.includes('pixel') ||
    name.includes('phone')
  ) {
    return 'smartphones'
  }

  if (
    name.includes('macbook') ||
    name.includes('laptop') ||
    name.includes('notebook') ||
    name.includes('thinkpad') ||
    name.includes('xps')
  ) {
    return 'laptops'
  }

  if (
    name.includes('desktop') ||
    name.includes('imac') ||
    name.includes('tower') ||
    name.includes('pc')
  ) {
    return 'desktops'
  }

  if (name.includes('tablet') || name.includes('ipad')) {
    return 'tablets'
  }

  if (
    name.includes('watch') ||
    name.includes('smartwatch') ||
    name.includes('fitbit')
  ) {
    return 'smartwatches'
  }

  if (
    name.includes('headphone') ||
    name.includes('headset') ||
    name.includes('wh-')
  ) {
    return 'headphones'
  }

  if (
    name.includes('earbud') ||
    name.includes('airpods') ||
    name.includes('buds')
  ) {
    return 'earbuds'
  }

  if (
    name.includes('speaker') ||
    name.includes('soundbar') ||
    name.includes('homepod')
  ) {
    return 'speakers'
  }

  if (name.includes('monitor')) {
    return 'monitors'
  }

  if (
    name.includes('keyboard') ||
    name.includes('clavier') ||
    name.includes('keychron')
  ) {
    return 'keyboards'
  }

  if (
    name.includes('mouse') ||
    name.includes('souris') ||
    name.includes('mx master')
  ) {
    return 'mice'
  }

  if (name.includes('printer') || name.includes('laserjet')) {
    return 'printers'
  }

  if (
    name.includes('camera') ||
    name.includes('eos') ||
    name.includes('gopro') ||
    name.includes('mirrorless')
  ) {
    return 'cameras'
  }

  if (
    name.includes('router') ||
    name.includes('wifi') ||
    name.includes('mesh') ||
    name.includes('modem')
  ) {
    return 'networking'
  }

  // Retourner la catégorie du produit si disponible
  if (product.category?.name) {
    const catKey = Object.keys(CATEGORIES).find((key) =>
      product.category.name.toLowerCase().includes(key)
    )
    if (catKey) return catKey
  }

  return null
}

/**
 * Génère un nom de fichier valide à partir du nom du produit
 */
function generateFilename(productName) {
  if (!productName) return null

  return productName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 50) + '.jpg'
}

/**
 * Obtient l'URL de l'image de storage pour un produit
 */
export function getStorageImageUrl(product) {
  if (!product) return null

  // Vérifier si le produit a déjà une image définie
  if (product.image && typeof product.image === 'string') {
    // Si c'est un chemin de storage (commence par "products/")
    if (product.image.startsWith('products/')) {
      return `${STORAGE_BASE}/${product.image.replace('products/', '')}`
    }

    // Si c'est une URL complète
    if (product.image.startsWith('http')) {
      return product.image
    }

    // Sinon, traiter comme un chemin relatif
    return `${STORAGE_BASE}/${product.image}`
  }

  // Vérifier les produits connus
  for (const [knownName, info] of Object.entries(KNOWN_PRODUCTS)) {
    if (product.name?.toLowerCase().includes(knownName.toLowerCase())) {
      return `${STORAGE_BASE}/${info.category}/${info.filename}`
    }
  }

  // Détecter la catégorie et générer le chemin
  const category = detectCategory(product)
  if (!category) return null

  const filename = generateFilename(product.name)
  if (!filename) return null

  return `${STORAGE_BASE}/${category}/${filename}`
}

/**
 * Obtient l'image par défaut d'une catégorie
 */
export function getCategoryDefaultImage(category) {
  if (!category) return `${STORAGE_BASE}/smartphones/default.svg`

  const normalized = (category || '').toLowerCase()
  const found = Object.keys(CATEGORIES).find((key) =>
    normalized.includes(key)
  )

  if (found) {
    return `${STORAGE_BASE}/${found}/default.svg`
  }

  return `${STORAGE_BASE}/smartphones/default.svg`
}

/**
 * Valide qu'une image existe dans le storage
 */
export async function validateStorageImage(imageUrl) {
  if (!imageUrl) return false

  try {
    const response = await fetch(imageUrl, { method: 'HEAD' })
    return response.ok
  } catch (error) {
    return false
  }
}

export default {
  getStorageImageUrl,
  getCategoryDefaultImage,
  validateStorageImage,
  detectCategory,
  generateFilename,
}
