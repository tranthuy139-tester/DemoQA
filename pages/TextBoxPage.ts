import type { Page, Locator } from "@playwright/test";
export class TextBoxPage {
    readonly page: Page;
    readonly txtFullName: Locator;
    readonly txtEmail: Locator;
    readonly txtCurrentAddress: Locator;
    readonly txtPermanentAddress: Locator;
    readonly btnSubmit: Locator;
    readonly lblName: Locator;
    readonly lblEmail: Locator;
    readonly lblCurrentAddress: Locator;
    readonly lblPermanentAddress: Locator;
    constructor(page: Page) {
        this.page = page;
        this.txtFullName = page.locator("#userName");
        this.txtEmail = page.locator("#userEmail");
        this.txtCurrentAddress = page.locator("#currentAddress");
        this.txtPermanentAddress = page.locator("#permanentAddress");
        this.btnSubmit = page.locator("#submit");
        this.lblName = page.locator("#name");
        this.lblEmail = page.locator("#email");
        this.lblCurrentAddress = page.locator('xpath=//p[@id="currentAddress"]');
        this.lblPermanentAddress = page.locator('xpath=//p[@id="permanentAddress"]');
    }
    async goto() {
        await this.page.goto("/text-box");
    }
    async inputData(fullName: string, email: string, currentAddress: string = '', permanentAddress: string = '') {
        await this.txtFullName.fill(fullName);
        await this.txtEmail.fill(email);
        await this.txtCurrentAddress.fill(currentAddress);
        await this.txtPermanentAddress.fill(permanentAddress);
        await this.btnSubmit.click();
    }
    async submit() {
        await this.btnSubmit.click();
    }
    async getTextByLocator(locator: any) : Promise<string>
    {
        const originalText: string = await locator.textContent();
        const index: number = originalText.indexOf(":");
        return originalText.substring(index + 1, originalText.length).trim();
    }

async getAttribute(locator: any, attributeName: string) : Promise<string> {
    return await locator.getAttribute(attributeName);
    }
}   
