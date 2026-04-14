const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4321');
  
  // Wait for the h3 and the first item
  const h3 = page.locator('h3:has-text("Die Köpfe dahinter")');
  await h3.waitFor();
  const h3Box = await h3.boundingBox();
  
  const track = page.locator('.carousel-track');
  const firstItem = track.locator('.snap-start').first();
  await firstItem.waitFor();
  const itemBox = await firstItem.boundingBox();
  
  console.log('H3 Box:', h3Box);
  console.log('First Item Box:', itemBox);
  
  await browser.close();
})();
