import { test, expect } from "@playwright/test";
import { BrowerWindowPage } from "../pages/BrowerWindowPage.js";
import { NewTabPage } from "../pages/NewTabPage.js";
import { NewWindowPage } from "../pages/NewWindowPage.js";
import { NewWindowMessagePage } from "../pages/NewWindowMessagePage.js";

test.describe("Browser Windows Test", () => {
    let browserWindowPage: BrowerWindowPage;
    test.beforeEach(async ({ context }) => {
        const page = await context.newPage();
        browserWindowPage = new BrowerWindowPage(page, context);
        await browserWindowPage.gotoBrowserWindowPage();
    });

    test("Verify new tab opens with correct URL", async ({ context }) => {
        const newPage = await browserWindowPage.clickNewTab();
        const newTabPage = new NewTabPage(newPage);
        const actualSampleHeading = await newTabPage.getSampleHeadingText();
        expect(actualSampleHeading).toBe("This is a sample page");
    });

    test("Verify new window opens with correct URL", async ({ context }) => {
        const newWindow = await browserWindowPage.clickNewWindow();
        const newWindowPage = new NewWindowPage(newWindow);
        const actualSampleHeading = await newWindowPage.getSampleHeadingText();
        expect(actualSampleHeading).toBe("This is a sample page");
    });

    test("Verify new window message opens with correct message", async ({ context }) => {
        const newWindowMessage = await browserWindowPage.clickNewWindowMessage();
        const newWindowMessagePage = new NewWindowMessagePage(newWindowMessage);
        const actualSampleHeading = await newWindowMessagePage.getSampleHeadingText();
        expect(actualSampleHeading).toBe("Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.");
    });
});



