const puppeteer = require("puppeteer");

describe("Personal Budget Application", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it("User can login and add an expense", async () => {
    // Navigate to the login page
    await page.goto("http://localhost:3000/");

    // Perform login
    await page.type('input[name="username"]', "ichcha");
    await page.type('input[name="password"]', "ichcha");
    await page.click('button[type="submit"]');

    // Wait for the dashboard page to load
    await page.waitForNavigation();

    // Navigate to the expense page
    await page.click('a[href="/expense"]');

    // Add a new expense
    await page.type('input[name="description"]', "Beans");

    await page.type('input[name="category"]', "Groceries");
    await page.type('input[name="amount"]', "5");
    await page.click('button[type="submit"]');

    // Wait for the success message
    await page.waitForSelector(".success-message");

    // Validate the expense is added
    const totalExpenses = await page.$eval(
      ".total-expenses",
      (el) => el.innerText
    );
    expect(totalExpenses).toContain("$50");
  });
});
