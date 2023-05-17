// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('FUNC_002', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('FUNC_002', async function() {
    await driver.get("https://e-energy.netlify.app/login")
    await driver.findElement(By.id(":r0:")).click()
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.css(".MuiButton-root")).click()
    assert(await driver.findElement(By.id(":r0:-helper-text")).getText() == "Không được để trống!")
  })
})
