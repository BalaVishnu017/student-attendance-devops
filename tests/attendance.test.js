
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

(async function testAttendanceApp() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get("http://localhost:3000");

        await driver.wait(until.elementLocated(By.tagName("body")), 10000);

        const title = await driver.getTitle();
        console.log("Page title:", title);

        const body = await driver.findElement(By.tagName("body")).getText();
        assert(body.length > 0, "Application page should not be empty");

        console.log("PASS: Attendance application opened successfully.");
    } catch (error) {
        console.error("FAIL:", error.message);
        process.exitCode = 1;
    } finally {
        await driver.quit();
    }
})();
