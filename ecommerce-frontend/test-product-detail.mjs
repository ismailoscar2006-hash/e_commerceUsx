import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Testing Product Detail Page...\n');
    await page.goto('http://127.0.0.1:3003/products/1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Get page content
    const content = await page.content();
    const hasProductName = content.includes('iPhone 15 Pro Max') || content.includes('Apple iPhone');
    const hasImage = content.includes('iphone15promax') || content.includes('/storage/products');
    
    console.log(`Product name found: ${hasProductName}`);
    console.log(`Product image path in HTML: ${hasImage}`);
    
    // Get all images on the page
    const images = await page.locator('img').count();
    console.log(`\nTotal images on page: ${images}`);
    
    // Get image sources
    const imageSources = await page.locator('img').evaluateAll(imgs =>
      imgs.map(img => img.getAttribute('src')).filter(src => src && src.includes('storage')).slice(0, 5)
    );
    
    console.log('Image sources:');
    imageSources.forEach((src, i) => {
      console.log(`  ${i+1}. ${src}`);
    });
    
    // Check if images actually loaded
    const loadedImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return {
        total: imgs.length,
        loaded: imgs.filter(img => img.naturalWidth > 0).length,
        details: imgs.map(img => ({
          src: img.src.substring(0, 60),
          width: img.naturalWidth,
          height: img.naturalHeight
        })).slice(0, 5)
      };
    });
    
    console.log(`\nImage loading status:`);
    console.log(`  Total: ${loadedImages.total}`);
    console.log(`  Loaded: ${loadedImages.loaded}`);
    
    if (loadedImages.details.length > 0) {
      console.log('  Details:');
      loadedImages.details.forEach(img => {
        const status = img.width > 0 ? '✅' : '⏳';
        console.log(`    ${status} ${img.src}... (${img.width}x${img.height})`);
      });
    }
    
    // Take screenshot
    await page.screenshot({ path: 'C:/temp/screenshots/product-detail-full.png' });
    console.log('\n✅ Screenshot saved to C:/temp/screenshots/product-detail-full.png');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
