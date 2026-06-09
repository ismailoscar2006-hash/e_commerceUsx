import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let apiErrors = [];
  let apiCalls = [];
  
  // Monitor API calls
  page.on('response', response => {
    if (response.url().includes('/api/')) {
      apiCalls.push({
        url: response.url(),
        status: response.status(),
        method: response.request().method()
      });
      if (!response.ok()) {
        apiErrors.push(`${response.status()} ${response.url()}`);
      }
    }
  });
  
  try {
    console.log('Loading Products Page...\n');
    await page.goto('http://127.0.0.1:3003/products', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    console.log('API Calls Made:');
    apiCalls.forEach(call => {
      console.log(`  ${call.method} ${call.url} → ${call.status}`);
    });
    
    if (apiErrors.length > 0) {
      console.log('\nAPI Errors:');
      apiErrors.forEach(err => console.log(`  ❌ ${err}`));
    }
    
    // Check page content for products
    const content = await page.content();
    const hasProductText = content.includes('product');
    const hasCategoryText = content.includes('category');
    
    console.log(`\nPage contains 'product': ${hasProductText}`);
    console.log(`Page contains 'category': ${hasCategoryText}`);
    
    // Check for specific product names from the API
    console.log(`\nSearching for specific products...`);
    const hasIphone = content.includes('iPhone');
    const hasLaptop = content.includes('Laptop');
    console.log(`  iPhone mentioned: ${hasIphone}`);
    console.log(`  Laptop mentioned: ${hasLaptop}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
