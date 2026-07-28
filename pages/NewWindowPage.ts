import type { Locator, Page } from "@playwright/test";
export class NewWindowPage {
    readonly lblSampleHeading: Locator;
    constructor(public readonly page: Page) {
        this.lblSampleHeading = page.locator("#sampleHeading");
    }
    
    async getSampleHeadingText(): Promise<string> {
        return await this.lblSampleHeading.textContent() ?? "";
    }
}