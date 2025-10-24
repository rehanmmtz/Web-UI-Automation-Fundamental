const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');


describe('Test SAUCEDEMO', function () {
    this.timeout(5000);

    let driver;
    let options = new chrome.Options();
    options.addArguments('--incognito');
    // options.addArguments('--headless'); 
    options.addArguments('--log-level=3'); // suppress warning/error logs buat ngilangin eror

    before(async function () { //sebelum test dijalankan buka browser.
        console.log('ini before test');
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        await driver.manage().window().maximize();
        await driver.get('https://www.saucedemo.com/v1/');
    });

    after(async function () { //setelah semua test selesai quit browser.
        await driver.sleep(2000);
        await driver.quit();
    });

    it('ini test pertama login', async function () {
        let inputUsername = await driver.findElement(By.id("user-name"))
        await inputUsername.sendKeys("standard_user")
        let inputPassword = await driver.findElement(By.id("password"))
        await inputPassword.sendKeys("secret_sauce")
        let buttonLogin = await driver.findElement(By.id("login-button"));
        await buttonLogin.click();

        //assert
        let produk = await driver.findElement(By.className("product_label"))
        let isDisplayed = await produk.isDisplayed();
        assert.strictEqual(isDisplayed, true);
    });

    it('ini test kedua short', async function () {
        let shortCart = await driver.findElement(By.className("product_sort_container"));
        await shortCart.click();
        let shortfromAz = await driver.findElement(By.xpath("//option[@value='az']"));
        await shortfromAz.click();

        //assert
        let shortAz = await driver.findElement(By.xpath("//option[@value='az']"))
        let textAtoz = await shortAz.getText();
        assert.strictEqual(textAtoz, "Name (A to Z)");
    });

});