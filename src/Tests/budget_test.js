const puppeteer = require("puppeteer");
const runVisualTest = require("./applitools.test.js");
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
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");

  await click(
    page,
    "#root > div > div > div.ui.center.aligned.middle.aligned.two.column.grid > div:nth-child(2) > div > div > div > div:nth-child(6) > button"
  );
  await runVisualTest.runVisualTest();
  await waitForText(page, "Sign-Up for an Account");
  await typeText(
    page,
    "body > div.ui.page.modals.dimmer.transition.visible.active > div > div.content > div > div > form > div > div:nth-child(1) > div > input[type=text]",
    "ichcha"
  );
  await typeText(
    page,
    "body > div.ui.page.modals.dimmer.transition.visible.active > div > div.content > div > div > form > div > div:nth-child(2) > div > input[type=password]",
    "ichcha"
  );
  await typeText(
    page,
    "body > div.ui.page.modals.dimmer.transition.visible.active > div > div.content > div > div > form > div > div:nth-child(3) > div > input[type=text]",
    "ichcha@gmail.com"
  );
  await typeText(
    page,
    "body > div.ui.page.modals.dimmer.transition.visible.active > div > div.content > div > div > form > div > div:nth-child(4) > div > input[type=date]",
    "14/12/1998"
  );
  await click(
    page,
    "body > div.ui.page.modals.dimmer.transition.visible.active > div > div.content > div > div > form > button"
  );

  await waitForText(page, "Signup successful!");
  await browser.close();
  console.log("Test Passed");
})();
