import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const results = {
    home: { images: 0, error: null },
    products: { images: 0, error: null },
    productDetail: { images: 0, error: null },
    cart: { images: 0, error: null }
  };
  
  try {
    // Test Home Page
    console.log('1️⃣ Testing Home Page...');
    await page.goto('http://127.0.0.1:3003/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const homeImgs = await page.locator('img').count();
    results.home.images = homeImgs;
    await page.screenshot({ path: 'C:/temp/screenshots/home-page-final.png' });
    console.log(`   Found ${homeImgs} images ✓`);
    
    // Test Products Page
    console.log('\n2️⃣ Testing Products Page...');
    await page.goto('http://127.0.0.1:3003/products', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const prodImgs = await page.locator('img').count();
    results.products.images = prodImgs;
    await page.screenshot({ path: 'C:/temp/screenshots/products-page-final.png' });
    console.log(`   Found ${prodImgs} images ✓`);
    
    // Test Product Details Page
    console.log('\n3️⃣ Testing Product Details Page...');
    await page.goto('http://127.0.0.1:3003/products/1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const detailImgs = await page.locator('img').count();
    results.productDetail.images = detailImgs;
    await page.screenshot({ path: 'C:/temp/screenshots/product-detail-final.png' });
    console.log(`   Found ${detailImgs} images ✓`);
    
    // Test Cart Page
    console.log('\n4️⃣ Testing Cart Page...');
    await page.goto('http://127.0.0.1:3003/cart', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const cartImgs = await page.locator('img').count();
    results.cart.images = cartImgs;
    await page.screenshot({ path: 'C:/temp/screenshots/cart-page-final.png' });
    console.log(`   Found ${cartImgs} images ✓`);
    
    // Summary
    console.log('\n\n📊 Summary:');
    console.log(`Home Page: ${results.home.images} images`);
    console.log(`Products Page: ${results.products.images} images`);
    console.log(`Product Details: ${results.productDetail.images} images`);
    console.log(`Cart Page: ${results.cart.images} images`);
    
    console.log('\n✅ All screenshots saved to C:/temp/screenshots/');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
