const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');


describe('Test SAUCEDEMO', function () {
    this.timeout(5000);

    let driver;
    let options = new chrome.Options();
    options.addArguments('--incognito');
    options.addArguments('--log-level=3'); // warning/error logs buat ngilangin eror

    it('ini test case pertama berhasil masuk web nya', async function () {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.manage().window().maximize();
        await driver.get('https://www.saucedemo.com/v1/');

        //assert
        let title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');
    });


    it('ini test kedua login', async function () {
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

    it('ini test ketiga short A to Z', async function () {
        let shortCart = await driver.findElement(By.className("product_sort_container"));
        await shortCart.click();
        let shortfromAz = await driver.findElement(By.xpath("//option[@value='az']"));
        await shortfromAz.click();

        //assert
        let shortAz = await driver.findElement(By.xpath("//option[@value='az']"))
        let textAtoz = await shortAz.getText();
        assert.strictEqual(textAtoz, "Name (A to Z)");

        await driver.sleep(2000);
        await driver.quit();
    });


});