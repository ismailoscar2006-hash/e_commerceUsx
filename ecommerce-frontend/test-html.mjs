import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Loading Products Page...');
    await page.goto('http://127.0.0.1:3003/products', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const content = await page.content();
    
    // Look for product cards and their content
    const productCardMatch = content.match(/<div[^>]*class="[^"]*product-card[^"]*"[^>]*>[\s\S]{0,2000}?<\/div>/gi);
    
    if (productCardMatch && productCardMatch.length > 0) {
      console.log(`Found ${productCardMatch.length} product card matches`);
      console.log('\nFirst product card HTML (first 1000 chars):');
      console.log(productCardMatch[0].substring(0, 1000));
    } else {
      console.log('No product cards found');
      
      // Try different selectors
      console.log('\nLooking for other product elements...');
      
      // Check for article tags, sections, etc
      const articles = (content.match(/<article[^>]*>/gi) || []).length;
      const sections = (content.match(/<section[^>]*>/gi) || []).length;
      const divs = (content.match(/<div[^>]*>/gi) || []).length;
      
      console.log(`  Articles: ${articles}`);
      console.log(`  Sections: ${sections}`);
      console.log(`  Divs: ${divs}`);
    }
    
    // Check for images in the entire page
    const imgTags = content.match(/<img[^>]*>/gi) || [];
    console.log(`\nTotal img tags in page: ${imgTags.length}`);
    
    if (imgTags.length > 0) {
      console.log('First 5 img tags:');
      imgTags.slice(0, 5).forEach((tag, i) => {
        console.log(`  ${i+1}. ${tag.substring(0, 100)}...`);
      });
    }
    
    // Look for Skeleton loaders (loading placeholders)
    const hasSkeleton = content.includes('Skeleton') || content.includes('skeleton');
    console.log(`\nPage has Skeleton loaders: ${hasSkeleton}`);
    
    // Save part of HTML for inspection
    fs.writeFileSync('C:/temp/products-page.html', content.substring(0, 10000), 'utf8');
    console.log('\nSaved first 10K chars to C:/temp/products-page.html');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
