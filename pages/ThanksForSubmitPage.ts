import type { Locator, Page } from "@playwright/test";
export class ThanksForSubmitPage {
    readonly lblThanksForSubmit: Locator;
    lblValue: string = 'xpath=//*[text()="@param"]/following-sibling::td';
    constructor(public readonly page: Page) {
        this.page = page;
        this.lblThanksForSubmit = page.locator("xpath=//div[@id='example-modal-sizes-title-lg']");
    }

    async getValueByLabel(originalXpath: string, label: string) : Promise<string> {
        const newXpath = originalXpath.replace('@param', label);
        let result: string = await this.page.locator(newXpath).textContent()|| '';
        return result;
    }
}
