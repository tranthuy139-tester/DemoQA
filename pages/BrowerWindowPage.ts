import type { Locator, Page, BrowserContext } from "@playwright/test";

export class BrowerWindowPage {
    readonly context: BrowserContext;
    readonly btnNewTab: Locator;
    readonly btnNewWindow: Locator;
    readonly btnNewWindowMessage: Locator;
    constructor(public readonly page: Page, context: BrowserContext) {
        this.context = context;
        this.btnNewTab = page.locator("#tabButton");
        this.btnNewWindow = page.locator("#windowButton");
        this.btnNewWindowMessage = page.locator("#messageWindowButton");
    }

    async gotoBrowserWindowPage() {
        await this.page.goto("/browser-windows");
    }

    async clickNewTab() : Promise <Page>{
        const [newTabPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.btnNewTab.click(),
        ]);
        await newTabPage.waitForLoadState();
        return newTabPage;
    }

    async clickNewWindow() : Promise <Page>{
        const [newWindowPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.btnNewWindow.click(),
        ]); 
        await newWindowPage.waitForLoadState();
        return newWindowPage;
    }

    async clickNewWindowMessage() : Promise <Page>{
        const [newWindowMessagePage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.btnNewWindowMessage.click(),
        ]); 
        await newWindowMessagePage.waitForLoadState();
        return newWindowMessagePage;
    }

}