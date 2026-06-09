import { chromium } from 'playwright';

const screenshotDir = 'C:/temp/screenshots';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Testing Home Page...');
    await page.goto('http://127.0.0.1:3003/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${screenshotDir}/01-home.png` });
    
    const homeImages = await page.locator('img[src*="/storage/"]').count();
    console.log(`✓ Home page: Found ${homeImages} product images`);
    
    console.log('\nTesting Products Page...');
    await page.goto('http://127.0.0.1:3003/products', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${screenshotDir}/02-products.png` });
    
    const productsImages = await page.locator('img[src*="/storage/"]').count();
    console.log(`✓ Products page: Found ${productsImages} product images`);
    
    console.log('\nTesting Product Details Page...');
    await page.goto('http://127.0.0.1:3003/products/1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${screenshotDir}/03-product-detail.png` });
    
    const detailImg = await page.locator('img[src*="/storage/products"]').first();
    const detailImgSrc = await detailImg.getAttribute('src');
    console.log(`✓ Product detail: Image URL: ${detailImgSrc}`);
    
    console.log('\nTesting Cart Page...');
    await page.goto('http://127.0.0.1:3003/products/1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const addBtn = await page.locator('button:has-text("Add")').first();
    if (await addBtn.isVisible()) {
      await addBtn.click();
      await page.waitForTimeout(1000);
    }
    await page.goto('http://127.0.0.1:3003/cart', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${screenshotDir}/04-cart.png` });
    
    const cartImages = await page.locator('img[src*="/storage/"]').count();
    console.log(`✓ Cart page: Found ${cartImages} product images`);
    
    console.log('\n✅ All pages rendered successfully');
    console.log(`Screenshots saved to: ${screenshotDir}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
