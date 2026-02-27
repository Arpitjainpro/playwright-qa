const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 31; seed <= 40; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

    await page.goto(url);
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", tds =>
      tds
        .map(td => parseInt(td.innerText))
        .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);

    console.log(`Seed ${seed} sum: ${sum}`);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
