import {Page, Locator, expect} from "@playwright/test";
import { BasePage } from "./BasePage";
import { Sidebar } from "../components/Sidebar";

//Functions and locators that are specific to the Dashboard page can be defined in this class. 
//All other page classes will extend this class and inherit these functions.
export class DashboardPage extends BasePage{

    readonly dashboardHeader : Locator;

    readonly sidebar : Sidebar = new Sidebar(this.page);

    constructor(page : Page){
        super(page);
        this.dashboardHeader = page.getByRole('heading',{name : 'Dashboard'})
    }
    
    async isDashboardPageLoaded(): Promise<void>{
       await expect(this.dashboardHeader).toBeVisible();
    }

    async navigateToDashboard() {
        await this.sidebar.navigateToDashboard();
    }

}