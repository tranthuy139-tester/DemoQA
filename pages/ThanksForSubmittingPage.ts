import type { Page, Locator } from '@playwright/test';
export class ThanksForSubmittingPage {
    readonly lblThanksForSubmitting: Locator;
    lblValue: string = 'xpath=//*[text()="@param"]/following-sibling::td'; 
    constructor(public readonly page: Page) {
        this.lblThanksForSubmitting = page.locator('xpath=//div[@id="example-modal-sizes-title-lg"]');
    }

    async getValueByLabel(originalXpath: string, label: string) : Promise<string> {
        const newXpath = originalXpath.replace('@param', label);
        let result: string = await this.page.locator(newXpath).textContent()||'';
        return result;
    }
}
