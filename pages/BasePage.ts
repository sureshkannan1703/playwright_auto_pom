import {expect, Page} from '@playwright/test';

//Functions that are common to all pages can be defined in this class. All other page classes will extend this class and inherit these functions.
export class BasePage{  

    protected readonly page : Page

    constructor(page : Page){
        this.page = page;
    }

    async waitForPage(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getPageTitle(): Promise<string>{
        return await this.page.title();
    }   

    async getPageURL(): Promise<string>{
        return this.page.url();
    }   

    async navigateTo(url : string): Promise<void>{
        await this.page.goto(url);
    }   


}