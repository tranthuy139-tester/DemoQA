import type { Page } from "@playwright/test";

export class CheckBoxPage {
    readonly iconExpandHome;
    readonly chkHome;
    readonly chkDesktop;
    readonly chkDocuments;
    readonly chkDownloads;
    readonly lblResult;
    constructor(public readonly page: Page) {
        this.iconExpandHome = page.locator('xpath=//span[text()="Home"]/../preceding-sibling::span[@role="checkbox"]/preceding-sibling::span[1]');  
        this.chkHome = page.locator('xpath=//span[text()="Home"]/../preceding-sibling::span[@role="checkbox"]');  
        this.chkDesktop = page.locator('xpath=//span[text()="Desktop"]/../preceding-sibling::span[@role="checkbox"]');  
        this.chkDocuments = page.locator('xpath=//span[text()="Documents"]/../preceding-sibling::span[@role="checkbox"]');  
        this.chkDownloads = page.locator('xpath=//span[text()="Downloads"]/../preceding-sibling::span[@role="checkbox"]');  
        this.lblResult = page.locator('xpath=//div[@id="result"]/span');

    }

    async goTo() {
        await this.page.goto("/checkbox");
    }
    async clickHomeCheckBox() {
        await this.chkHome.click();
    } 
    async expandHomeCheckBox() {
        await this.iconExpandHome.click();
    }  

    async getResultText() : Promise<string> {
        let result: string = '';

        for (let i = 0; i < (await this.lblResult.count()); i++) {
            result = result + (await this.lblResult.nth(i).textContent()) + ' ';
        }
        return result;
    }


}