const puppeteer = require("puppeteer");

async function click(page, selector) {
  await page.click(selector);
}

async function waitForText(page, text) {
  await page.waitForFunction(`document.body.innerText.includes('${text}')`);
}

async function typeText(page, selector, text) {
  await page.type(selector, text);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");

  // await click(page, "a[href='/login']");
  await waitForText(page, "Username:");
  await typeText(page, "input[name='Username']", "ichcha");
  await typeText(page, "input[name='Password']", "ichcha");

  await click(page, "button[type='submit']");
  await waitForText(page, "ichcha");
  await click(page, "a[href='/logout']");
  await waitForText(page, "Login");
  await browser.close();
})();
