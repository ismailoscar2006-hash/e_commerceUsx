import { getStorageImageUrl, getCategoryDefaultImage } from '../services/imageService'

const STORAGE_BASE_URL = 'http://127.0.0.1:8000/storage'
const IMG = (category, filename) =>
  `${STORAGE_BASE_URL}/products/${category}/${filename}`

const CATEGORY_FALLBACKS = {
  smartphones: IMG('smartphones', 'default.svg'),
  laptops: IMG('laptops', 'default.svg'),
  desktops: IMG('desktops', 'default.svg'),
  'gaming-pcs': IMG('gaming-pcs', 'default.svg'),
  tablets: IMG('tablets', 'default.svg'),
  smartwatches: IMG('smartwatches', 'default.svg'),
  headphones: IMG('headphones', 'default.svg'),
  earbuds: IMG('earbuds', 'default.svg'),
  speakers: IMG('speakers', 'default.svg'),
  monitors: IMG('monitors', 'default.svg'),
  keyboards: IMG('keyboards', 'default.svg'),
  mice: IMG('mice', 'default.svg'),
  printers: IMG('printers', 'default.svg'),
  cameras: IMG('cameras', 'default.svg'),
  networking: IMG('networking', 'default.svg'),
  storage: IMG('storage', 'default.svg'),
  powerbanks: IMG('powerbanks', 'default.svg'),
  chargers: IMG('chargers', 'default.svg'),
  accessories: IMG('accessories', 'default.svg'),
  'gaming-accessories': IMG('gaming-accessories', 'default.svg'),
  default: IMG('smartphones', 'default.svg'),
}

const CATEGORY_KEYWORDS = [
  { key: 'smartphones', keywords: ['smartphone', 'phone', 'mobile', 'téléphone', 'telephone', 'iphone', 'pixel', 'xperia', 'oneplus', 'oppo', 'vivo', 'nothing phone', 'huawei p', 'xiaomi 1', 'galaxy s', 'galaxy a', 'galaxy z'] },
  { key: 'laptops', keywords: ['laptop', 'macbook', 'notebook', 'ultrabook', 'spectre', 'thinkpad', 'vivobook', 'swift', 'gram', 'magicbook', 'book prime', 'lapbook', 'ezbook'] },
  { key: 'desktops', keywords: ['desktop', 'imac', 'mac studio', 'mac mini', 'optiplex', 'thinkcentre', 'tower', 'all-in-one'] },
  { key: 'gaming-pcs', keywords: ['gaming pc', 'gaming rig', 'rog gaming', 'aurora', 'aegis', 'cyberpowerpc', 'skytech', 'ibuypower', 'alienware aurora'] },
  { key: 'tablets', keywords: ['tablet', 'tablette', 'ipad', 'tab s', 'tab a', 'matepad', 'surface pro', 'pad 6', 'pad 7'] },
  { key: 'smartwatches', keywords: ['watch', 'montre', 'fitbit', 'garmin', 'amazfit', 'ticwatch'] },
  { key: 'earbuds', keywords: ['earbud', 'airpods', 'buds', 'linkbuds', 'freebuds', 'encox', 'wf-', 'galaxy buds'] },
  { key: 'headphones', keywords: ['headphone', 'casque', 'wh-1000', 'quietcomfort', 'momentum', 'studio pro', 'soundcore space q', 'opus'] },
  { key: 'speakers', keywords: ['speaker', 'homepod', 'nest audio', 'echo', 'partybox', 'soundlink', 'sonos', 'soundbar'] },
  { key: 'monitors', keywords: ['monitor', 'écran', 'ecran', 'display', 'odyssey', 'pro display', 'ultrafine', 'proart pa'] },
  { key: 'keyboards', keywords: ['keyboard', 'clavier', 'keychron', 'ducky', 'deathstalker', 'apex pro', 'magic keyboard'] },
  { key: 'mice', keywords: ['mouse', 'souris', 'mx master', 'rival', 'basilisk', 'superlight', 'intellimouse'] },
  { key: 'printers', keywords: ['printer', 'imprimante', 'laserjet', 'imageprograf', 'pixma', 'workforce'] },
  { key: 'cameras', keywords: ['camera', 'caméra', 'eos r', 'mirrorless', 'gopro', 'hero', 'osmo', 'rx100', 'a7', 'z9', 'z8'] },
  { key: 'networking', keywords: ['router', 'wifi', 'mesh', 'airport', 'nighthawk', 'eero', 'unifi', 'modem'] },
  { key: 'storage', keywords: ['ssd', 'hdd', 'nvme', 'storage', 'hard drive', 'external ssd', 'barracuda', 'elements'] },
  { key: 'powerbanks', keywords: ['power bank', 'portable charger', 'wireless charger', 'boost charge pad'] },
  { key: 'chargers', keywords: ['charger', 'chargeur', 'gan charger', 'power adapter', 'hypercharge', 'warp charge'] },
  { key: 'gaming-accessories', keywords: ['controller', 'headset', 'webcam', 'microphone', 'stream deck', 'mousepad', 'mouse pad', 'xbox', 'dualsense', 'nintendo pro'] },
  { key: 'accessories', keywords: ['hub', 'dock', 'stand', 'tripod', 'desk', 'chair', 'mouse pad', 'accessoire'] },
]

const BRAND_PATTERNS = [
  { brand: 'apple', keywords: ['apple', 'iphone', 'ipad', 'macbook', 'imac', 'mac mini', 'mac studio', 'airpods', 'homepod', 'watch ultra', 'watch series', 'watch se', 'magic keyboard', 'magic mouse', 'pro display'], image: IMG('brands', 'apple.jpg') },
  { brand: 'samsung', keywords: ['samsung', 'galaxy'], image: IMG('brands', 'samsung.jpg') },
  { brand: 'dell', keywords: ['dell', 'alienware', 'xps', 'optiplex', 'inspiron'], image: IMG('brands', 'dell.jpg') },
  { brand: 'hp', keywords: ['hp ', 'hewlett', 'spectre', 'envy', 'laserjet', 'officejet'], image: IMG('brands', 'hp.jpg') },
  { brand: 'logitech', keywords: ['logitech'], image: IMG('brands', 'logitech.jpg') },
  { brand: 'razer', keywords: ['razer'], image: IMG('brands', 'razer.jpg') },
  { brand: 'sony', keywords: ['sony', 'playstation', 'wh-1000', 'wf-', 'linkbuds', 'xperia'], image: IMG('brands', 'sony.jpg') },
  { brand: 'lenovo', keywords: ['lenovo', 'thinkpad', 'thinkcentre', 'legion'], image: IMG('brands', 'lenovo.jpg') },
  { brand: 'asus', keywords: ['asus', 'rog '], image: IMG('brands', 'asus.jpg') },
  { brand: 'msi', keywords: ['msi '], image: IMG('brands', 'msi.jpg') },
  { brand: 'canon', keywords: ['canon'], image: IMG('brands', 'canon.jpg') },
  { brand: 'nintendo', keywords: ['nintendo', 'switch'], image: IMG('brands', 'nintendo.jpg') },
  { brand: 'microsoft', keywords: ['microsoft', 'surface', 'xbox'], image: IMG('brands', 'microsoft.jpg') },
  { brand: 'xiaomi', keywords: ['xiaomi', 'redmi'], image: IMG('brands', 'xiaomi.jpg') },
  { brand: 'google', keywords: ['google', 'pixel', 'nest '], image: IMG('brands', 'google.jpg') },
  { brand: 'bose', keywords: ['bose'], image: IMG('brands', 'bose.jpg') },
  { brand: 'jbl', keywords: ['jbl'], image: IMG('brands', 'jbl.jpg') },
  { brand: 'anker', keywords: ['anker'], image: IMG('brands', 'anker.jpg') },
  { brand: 'corsair', keywords: ['corsair'], image: IMG('brands', 'corsair.jpg') },
  { brand: 'steelseries', keywords: ['steelseries'], image: IMG('brands', 'steelseries.jpg') },
]

const MODEL_PATTERNS = [
  { patterns: ['iphone 15 pro max'], image: IMG('smartphones', 'iphone15promax.jpg') },
  { patterns: ['iphone 15 pro'], image: IMG('smartphones', 'iphone-15-pro.jpg') },
  { patterns: ['iphone 15'], image: IMG('smartphones', 'iphone-15.jpg') },
  { patterns: ['galaxy s24 ultra', 'galaxy s25 ultra'], image: IMG('smartphones', 'galaxy-s25-ultra.jpg') },
  { patterns: ['galaxy s24 pro', 'galaxy s24'], image: IMG('smartphones', 'galaxy-s24.jpg') },
  { patterns: ['galaxy a55'], image: IMG('smartphones', 'galaxy-a55.jpg') },
  { patterns: ['macbook pro'], image: IMG('laptops', 'macbook-pro.jpg') },
  { patterns: ['macbook air'], image: IMG('laptops', 'macbook-air.jpg') },
  { patterns: ['dell xps'], image: IMG('laptops', 'dell-xps.jpg') },
  { patterns: ['sony wh-1000xm5', 'wh-1000xm5'], image: IMG('headphones', 'sony-wh-1000xm5.jpg') },
  { patterns: ['airpods pro'], image: IMG('earbuds', 'airpods-pro.jpg') },
  { patterns: ['airpods max'], image: IMG('headphones', 'airpods-max.jpg') },
  { patterns: ['airpods'], image: IMG('earbuds', 'airpods.jpg') },
  { patterns: ['ipad pro'], image: IMG('tablets', 'ipad-pro.jpg') },
  { patterns: ['ipad air', 'ipad mini', 'ipad '], image: IMG('tablets', 'ipad-air.jpg') },
  { patterns: ['watch ultra'], image: IMG('smartwatches', 'watch-ultra.jpg') },
  { patterns: ['watch series', 'galaxy watch'], image: IMG('smartwatches', 'galaxy-watch.jpg') },
  { patterns: ['pixel 8 pro', 'pixel 8'], image: IMG('smartphones', 'pixel-8-pro.jpg') },
  { patterns: ['xperia'], image: IMG('smartphones', 'xperia.jpg') },
  { patterns: ['rog zephyrus', 'rog swift', 'rog '], image: IMG('laptops', 'asus-rog.jpg') },
  { patterns: ['thinkpad'], image: IMG('laptops', 'lenovo-thinkpad.jpg') },
  { patterns: ['spectre x360'], image: IMG('laptops', 'hp-spectre-x360.jpg') },
  { patterns: ['razer blade'], image: IMG('laptops', 'razer-blade.jpg') },
  { patterns: ['alienware'], image: IMG('desktops', 'alienware.jpg') },
  { patterns: ['imac', 'mac studio', 'mac mini'], image: IMG('desktops', 'imac.jpg') },
  { patterns: ['pro display xdr'], image: IMG('monitors', 'pro-display-xdr.jpg') },
  { patterns: ['odyssey g9'], image: IMG('monitors', 'samsung-odyssey-g9.jpg') },
  { patterns: ['mx master'], image: IMG('mice', 'logitech-mx-master.jpg') },
  { patterns: ['mx keys'], image: IMG('keyboards', 'logitech-mx-keys.jpg') },
  { patterns: ['quietcomfort ultra', 'quietcomfort 45', 'quietcomfort'], image: IMG('headphones', 'bose-quietcomfort.jpg') },
  { patterns: ['momentum 4'], image: IMG('headphones', 'sennheiser-momentum.jpg') },
  { patterns: ['galaxy buds'], image: IMG('earbuds', 'galaxy-buds.jpg') },
  { patterns: ['homepod'], image: IMG('speakers', 'homepod.jpg') },
  { patterns: ['gopro hero', 'hero12'], image: IMG('cameras', 'gopro-hero.jpg') },
  { patterns: ['eos r5', 'eos r6', 'eos r8', 'canon eos'], image: IMG('cameras', 'canon-eos.jpg') },
  { patterns: ['a7r', 'a6700', 'sony a1'], image: IMG('cameras', 'sony-a7r.jpg') },
  { patterns: ['nikon z9', 'nikon z8', 'nikon z'], image: IMG('cameras', 'nikon-z9.jpg') },
  { patterns: ['990 pro', '870 evo', 't5 '], image: IMG('storage', 'samsung-ssd.jpg') },
  { patterns: ['dualsense', 'playstation'], image: IMG('gaming-accessories', 'dualsense-controller.jpg') },
  { patterns: ['xbox wireless controller'], image: IMG('gaming-accessories', 'xbox-controller.jpg') },
  { patterns: ['stream deck'], image: IMG('gaming-accessories', 'stream-deck.jpg') },
  { patterns: ['deathstalker', 'k95 platinum'], image: IMG('keyboards', 'mechanical-keyboard.jpg') },
  { patterns: ['g pro x superlight'], image: IMG('mice', 'logitech-g-pro.jpg') },
  { patterns: ['surface pro'], image: IMG('tablets', 'surface-pro.jpg') },
  { patterns: ['tab s10', 'galaxy tab'], image: IMG('tablets', 'galaxy-tab.jpg') },
]

function normalize(text) {
  return (text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
}

function matchesAny(name, patterns) {
  const n = normalize(name)
  return patterns.some((p) => n.includes(normalize(p)))
}

function isDefaultImage(url) {
  if (!url) return true
  return url.includes('default-product') || url.includes('placeholder')
}

function buildStorageUrl(imagePath) {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  return `${STORAGE_BASE_URL}/${imagePath.replace(/^\//, '')}`
}

export function getProductModelImage(productName) {
  if (!productName) return null
  for (const { patterns, image } of MODEL_PATTERNS) {
    if (matchesAny(productName, patterns)) return image
  }
  return null
}

export function getBrandImage(productName) {
  if (!productName) return null
  for (const { keywords, image } of BRAND_PATTERNS) {
    if (matchesAny(productName, keywords)) return image
  }
  return null
}

export function getCategoryFallbackImage(categoryName) {
  const normalized = normalize(categoryName)

  for (const { key, keywords } of CATEGORY_KEYWORDS) {
    if (keywords.some((keyword) => normalized.includes(normalize(keyword)))) {
      return CATEGORY_FALLBACKS[key]
    }
  }

  return CATEGORY_FALLBACKS.default
}

export function getProductImageFallbacks(product) {
  const fallbacks = []
  const add = (url) => {
    if (url && !fallbacks.includes(url)) fallbacks.push(url)
  }

  add(getProductModelImage(product?.name))
  add(getBrandImage(product?.name))
  add(getCategoryFallbackImage(product?.category?.name))
  add(CATEGORY_FALLBACKS.default)

  return fallbacks
}

export function getProductImageUrl(product) {
  if (!product) return CATEGORY_FALLBACKS.default

  // ✓ PRIORITÉ 1: Image retournée par l'API (URL complète)
  if (product.image && typeof product.image === 'string') {
    // Si c'est une URL complète (commence par http)
    if (product.image.startsWith('http')) {
      return product.image
    }
    // Si ce n'est pas une image par défaut
    if (!isDefaultImage(product.image)) {
      return product.image
    }
  }

  // ✓ PRIORITÉ 2: image_url personnalisée
  if (product.image_url && !isDefaultImage(product.image_url)) {
    return product.image_url
  }

  // ✓ PRIORITÉ 3: Service de détection automatique
  const storageImageUrl = getStorageImageUrl(product)
  if (storageImageUrl) {
    return storageImageUrl
  }

  // ✓ PRIORITÉ 4: Image de modèle
  const modelImage = getProductModelImage(product.name)
  if (modelImage) return modelImage

  // ✓ PRIORITÉ 5: Image de marque
  const brandImage = getBrandImage(product.name)
  if (brandImage) return brandImage

  // ✓ PRIORITÉ 6: Fallback final - catégorie
  return getCategoryDefaultImage(product.category?.name)
}

export { STORAGE_BASE_URL }
