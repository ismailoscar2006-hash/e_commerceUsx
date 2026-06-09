import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('1️⃣ HOME PAGE');
    await page.goto('http://127.0.0.1:3003/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    const homeAllImages = await page.locator('img').count();
    const homeStorageImages = await page.locator('img[src*="storage"]').count();
    const homeHttpImages = await page.locator('img[src*="http"]').count();
    
    console.log(`  Total images: ${homeAllImages}`);
    console.log(`  Storage images: ${homeStorageImages}`);
    console.log(`  HTTP images: ${homeHttpImages}`);
    
    const sampleSrc = await page.locator('img').first().getAttribute('src');
    console.log(`  Sample image src: ${sampleSrc}`);
    
    console.log('\n2️⃣ PRODUCTS PAGE');
    await page.goto('http://127.0.0.1:3003/products', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    
    const prodAllImages = await page.locator('img').count();
    const prodStorageImages = await page.locator('img[src*="storage"]').count();
    
    console.log(`  Total images: ${prodAllImages}`);
    console.log(`  Storage images: ${prodStorageImages}`);
    
    if (prodStorageImages > 0) {
      const prodImgSrc = await page.locator('img[src*="storage"]').first().getAttribute('src');
      console.log(`  Sample image: ${prodImgSrc}`);
    }
    
    // Check if images have actually loaded
    const loadedImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img[src*="storage"]'));
      return imgs.filter(img => img.naturalWidth > 0).length;
    });
    console.log(`  Loaded images: ${loadedImages}`);
    
    console.log('\n3️⃣ PRODUCT DETAIL PAGE');
    await page.goto('http://127.0.0.1:3003/products/1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    const detailImages = await page.locator('img[src*="storage"]').count();
    console.log(`  Storage images: ${detailImages}`);
    
    if (detailImages > 0) {
      const detailSrc = await page.locator('img[src*="storage"]').first().getAttribute('src');
      console.log(`  Image URL: ${detailSrc}`);
      
      // Verify the image actually loads
      const imgLoaded = await page.evaluate(() => {
        const img = document.querySelector('img[src*="storage"]');
        return img ? img.naturalWidth > 0 : false;
      });
      console.log(`  Image loaded: ${imgLoaded}`);
    }
    
    console.log('\n✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
