import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Loading Products Page...');
    await page.goto('http://127.0.0.1:3003/products', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const textContent = await page.textContent('body');
    const lines = textContent.split('\n').filter(line => line.trim()).slice(0, 50);
    
    console.log('First 50 non-empty text lines:');
    lines.forEach((line, i) => {
      console.log(`  ${i+1}. ${line.trim().substring(0, 80)}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
