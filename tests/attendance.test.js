
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

(async () => {
    let driver;

    try {
        driver = await new Builder().forBrowser("chrome").build();

        await driver.get("http://localhost:3000");

        await driver.wait(
            until.elementLocated(By.tagName("h1")),
            10000
        );

        const heading = await driver.findElement(By.tagName("h1")).getText();

        assert.strictEqual(
            heading,
            "Student Attendance Management System"
        );

        const page = await driver.findElement(By.tagName("body")).getText();

        assert(page.includes("Add Student"));
        assert(page.includes("Mark Daily Attendance"));
        assert(page.includes("Monthly Attendance Report"));

        console.log("PASS: Application title verified.");
        console.log("PASS: Student management section verified.");
        console.log("PASS: Attendance section verified.");
        console.log("PASS: Monthly report section verified.");
    } catch (error) {
        console.error("FAIL:", error.message);
        process.exitCode = 1;
    } finally {
        if (driver) await driver.quit();
    }
})();
