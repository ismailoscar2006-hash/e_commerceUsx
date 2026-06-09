import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Loading Home Page...\n');
    await page.goto('http://127.0.0.1:3003/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Get all images
    const allImages = await page.locator('img').evaluateAll(imgs => 
      imgs.map(img => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt'),
        width: img.naturalWidth,
        height: img.naturalHeight
      })).slice(0, 20)
    );
    
    console.log('Images found on home page:');
    allImages.forEach((img, i) => {
      console.log(`\n${i+1}. ${img.alt || 'No alt text'}`);
      console.log(`   URL: ${img.src}`);
      console.log(`   Loaded: ${img.width > 0 ? 'Yes' : 'No'} (${img.width}x${img.height})`);
    });
    
    // Check for specific product text
    const content = await page.textContent('body');
    const hasIphone = content.includes('iPhone');
    const hasLaptop = content.includes('MacBook');
    const hasCamera = content.includes('Camera');
    
    console.log(`\n\nProduct mentions:`);
    console.log(`  iPhone: ${hasIphone}`);
    console.log(`  MacBook: ${hasLaptop}`);
    console.log(`  Camera: ${hasCamera}`);
    
    // Take screenshot
    await page.screenshot({ path: 'C:/temp/screenshots/home-page.png' });
    console.log('\n✅ Screenshot saved');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
