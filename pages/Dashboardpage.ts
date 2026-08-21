import {Page, Locator,expect} from "@playwright/test";
import { BasePage } from "./BasePage";

//Functions and locators that are specific to the Dashboard page can be defined in this class. 
//All other page classes will extend this class and inherit these functions.
export class DashboardPage extends BasePage{

    readonly dashboardHeader : Locator;

    constructor(page : Page){
        super(page);
        this.dashboardHeader = page.getByRole('heading',{name : 'Dashboard'})
    }
    
    async isDashboardPageLoaded(): Promise<boolean>{
        return await this.dashboardHeader.isVisible();
    }

}