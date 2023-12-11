const { Eyes, Target } = require("@applitools/eyes-webdriverio");
const { remote } = require("webdriverio");
const puppeteer = require("puppeteer");
async function runVisualTest() {
  const eyes = new Eyes();

  // Set your Applitools API key
  eyes.setApiKey("97xiSMsAmVzikUb2wuYzvOkYYcdvJI5lpkE2EpXDqryQ110");

  // Define browsers for cross-browser testing
  const browsers = [{ browserName: "chrome" }, { browserName: "firefox" }];

  for (const browserConfig of browsers) {
    const browser = await remote({
      capabilities: browserConfig,
    });

    try {
      // Start the test for the specific browser
      await eyes.open(
        browser,
        "Personal Budget App",
        `Multi- Browser Testing, Broswer Name - ${browserConfig.browserName}`
      );

      // Navigate to your React app
      await browser.url("http://localhost:3000/");

      // Capture a screenshot
      await eyes.check("Personal Budget", Target.window());

      // End the test for the specific browser
      await eyes.close();
    } finally {
      // Close the browser for the specific browser
      await browser.deleteSession();

      // If there are visual differences, the Applitools dashboard will show them
      await eyes.abortIfNotClosed();
    }
  }
}

runVisualTest();
