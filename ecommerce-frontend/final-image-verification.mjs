import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('🔴 Browser Error:', msg.text());
    }
  });
  
  const results = {};
  
  try {
    // 1. HOME PAGE
    console.log('1️⃣ Testing Home Page...');
    await page.goto('http://127.0.0.1:3003/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const homeImgCount = await page.locator('img').count();
    const homeHeroImg = await page.locator('img[alt="Electronics Hero"]').count();
    
    console.log(`   ✓ Total images: ${homeImgCount}`);
    console.log(`   ✓ Hero image: ${homeHeroImg > 0 ? 'Found' : 'Not found'}`);
    
    await page.screenshot({ path: 'C:/temp/screenshots/final-home.png' });
    results.home = { images: homeImgCount, hero: homeHeroImg };
    
    // 2. PRODUCTS PAGE
    console.log('\n2️⃣ Testing Products Page...');
    await page.goto('http://127.0.0.1:3003/products', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const productPageImgs = await page.locator('img').count();
    console.log(`   ✓ Total images: ${productPageImgs}`);
    
    await page.screenshot({ path: 'C:/temp/screenshots/final-products.png' });
    results.products = { images: productPageImgs };
    
    // 3. PRODUCT DETAILS
    console.log('\n3️⃣ Testing Product Details Page...');
    await page.goto('http://127.0.0.1:3003/products/1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const detailImgs = await page.locator('img').count();
    const productImageExists = await page.locator('img[alt="Apple iPhone 15 Pro Max 256GB"]').count();
    
    console.log(`   ✓ Total images: ${detailImgs}`);
    console.log(`   ✓ Product image: ${productImageExists > 0 ? 'Found' : 'Not found'}`);
    
    await page.screenshot({ path: 'C:/temp/screenshots/final-product-detail.png' });
    results.details = { images: detailImgs, productImg: productImageExists };
    
    // 4. CART PAGE
    console.log('\n4️⃣ Testing Cart Page...');
    await page.goto('http://127.0.0.1:3003/cart', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const cartImgs = await page.locator('img').count();
    console.log(`   ✓ Total images: ${cartImgs}`);
    
    await page.screenshot({ path: 'C:/temp/screenshots/final-cart.png' });
    results.cart = { images: cartImgs };
    
    console.log('\n✅ All page screenshots captured!');
    console.log(`\n📊 Summary:
  Home: ${results.home.images} images, Hero: ${results.home.hero > 0 ? '✓' : '✗'}
  Products: ${results.products.images} images
  Details: ${results.details.images} images, Product img: ${results.details.productImg > 0 ? '✓' : '✗'}
  Cart: ${results.cart.images} images`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
