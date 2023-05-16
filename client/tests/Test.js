const { Builder } = require("selenium-webdriver");

async function Test() {
  //launch the browser

  const driver = await new Builder().forBrowser("chrome").build();

  //navigate to application

  await driver.get("https://e-energy.netlify.app/");

  //todo

  //close the browser
  await driver.quit();
}

Test();
