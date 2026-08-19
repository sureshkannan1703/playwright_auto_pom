import {Page, Locator,expect} from "@playwright/test";

export class DashboardPage{

    readonly page : Page;
    readonly dashboardHeader : Locator;

    constructor(page : Page){
        this.page = page;
        this.dashboardHeader = page.getByRole('heading',{name : 'Dashboard'})
    }

    
    async isDashboardPageLoaded(): Promise<boolean>{
        await expect(this.dashboardHeader).toBeVisible();
        return true;
    }

    async waitForPage(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    }

    
}