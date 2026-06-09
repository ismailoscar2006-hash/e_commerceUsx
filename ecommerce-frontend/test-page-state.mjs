import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Loading Product Detail Page...\n');
    await page.goto('http://127.0.0.1:3003/products/1', { waitUntil: 'load' });
    await page.waitForTimeout(3000);
    
    const text = await page.textContent('body');
    const lines = text.split('\n').filter(l => l.trim()).slice(0, 30);
    
    console.log('Page content (first 30 lines):');
    lines.forEach((line, i) => {
      console.log(`${i+1}. ${line.substring(0, 80)}`);
    });
    
    // Check page HTML for any error messages
    const html = await page.content();
    if (html.includes('404') || html.includes('error')) {
      console.log('\n⚠️ Page contains error or 404');
    }
    
    if (html.includes('Loading') || html.includes('loading')) {
      console.log('\n⏳ Page might be in loading state');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
