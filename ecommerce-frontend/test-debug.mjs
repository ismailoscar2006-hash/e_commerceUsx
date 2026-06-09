import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Capture console logs
  page.on('console', msg => console.log('🔵 Browser:', msg.text()));
  page.on('pageerror', err => console.error('🔴 Browser Error:', err));
  
  try {
    console.log('Navigating to Products Page...\n');
    await page.goto('http://127.0.0.1:3003/products', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Get page content
    const html = await page.content();
    const hasProductImg = html.includes('img') && html.includes('product');
    console.log(`Page contains "img" tags: ${html.includes('<img')}`);
    console.log(`Page content length: ${html.length}`);
    
    // Check for image tags
    const imgCount = (html.match(/<img/g) || []).length;
    console.log(`Found ${imgCount} <img> tags in HTML`);
    
    // Get all img src values
    const srcs = await page.locator('img').evaluateAll(imgs => 
      imgs.map(img => img.getAttribute('src')).slice(0, 10)
    );
    console.log(`\nImage sources found:`, srcs);
    
    // Check for ProductCard components
    const cards = await page.locator('.product-card-root, [class*="product"], [class*="card"]').count();
    console.log(`\nFound ${cards} potential product cards/elements`);
    
    // Take a screenshot to see what's rendered
    await page.screenshot({ path: 'C:/temp/screenshots/products-debug.png' });
    console.log('\nScreenshot saved to C:/temp/screenshots/products-debug.png');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
