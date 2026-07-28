import type { Locator, Page } from "@playwright/test";
export class NewWindowMessagePage {
    readonly lblSampleHeading: Locator;
    constructor(public readonly page: Page) {
        this.lblSampleHeading = page.locator("xpath=//body");
    }
    
    async getSampleHeadingText(): Promise<string> {
        return await this.lblSampleHeading.textContent() ?? "";
    }
}