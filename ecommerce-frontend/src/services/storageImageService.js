/**
 * Storage Image Service
 *
 * Service pour gérer les images stockées dans Laravel storage
 */

const STORAGE_BASE = 'http://127.0.0.1:8000/storage/products'

/**
 * Construit l'URL complète d'une image de storage
 */
export function buildStorageImageUrl(category, filename) {
  if (!category || !filename) return null
  return `${STORAGE_BASE}/${category}/${filename}`
}

/**
 * Construit l'URL pour une image de produit
 */
export function buildProductImageUrl(product) {
  if (!product) return null

  // Si le produit a déjà un chemin d'image
  if (product.image) {
    // Si c'est un chemin de storage (commence par "products/")
    if (typeof product.image === 'string') {
      if (product.image.startsWith('products/')) {
        return `${STORAGE_BASE}/${product.image.replace('products/', '')}`
      }
      if (product.image.startsWith('http')) {
        return product.image
      }
      // Chemin relatif - construire l'URL
      return `${STORAGE_BASE}/${product.image}`
    }
  }

  return null
}

/**
 * Récupère les informations de catégorie d'un produit
 */
export function getCategoryForProduct(product) {
  if (!product || !product.category) return null
  return product.category.slug || product.category.name?.toLowerCase()
}

/**
 * Valide que l'image existe et est accessible
 */
export async function imageExists(imageUrl) {
  if (!imageUrl) return false

  try {
    const response = await fetch(imageUrl, { method: 'HEAD' })
    return response.ok
  } catch (error) {
    console.warn(`Image check failed for ${imageUrl}:`, error.message)
    return false
  }
}

/**
 * Crée un lien d'accès direct au fichier de storage
 */
export function getDirectStorageLink(storagePath) {
  if (!storagePath) return null

  // Si c'est un chemin complet
  if (storagePath.startsWith('http')) {
    return storagePath
  }

  // Si c'est un chemin partiel
  if (storagePath.startsWith('products/')) {
    return `${STORAGE_BASE}/${storagePath.replace('products/', '')}`
  }

  // Sinon, concaténer directement
  return `${STORAGE_BASE}/${storagePath}`
}

export default {
  buildStorageImageUrl,
  buildProductImageUrl,
  getCategoryForProduct,
  imageExists,
  getDirectStorageLink,
}
