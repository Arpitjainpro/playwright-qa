const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [31,32,33,34,35,36,37,38,39,40];
  let grandTotal = 0;

  for (let seed of seeds) {
    const url = `https://qa-playground.vercel.app/seed/${seed}`;
    await page.goto(url, { waitUntil: "networkidle" });

    // Get full page text
    const text = await page.locator("body").innerText();

    // Extract all numbers from page
    const numbers = text
      .match(/\d+(\.\d+)?/g)
      ?.map(Number) || [];

    const pageSum = numbers.reduce((a,b)=>a+b,0);

    console.log(`Seed ${seed} sum:`, pageSum);
    grandTotal += pageSum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();