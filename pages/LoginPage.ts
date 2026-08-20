import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

//Functions and locators that are specific to the Login page can be defined in this class.
//All other page classes will extend this class and inherit these functions.
export class LoginPage extends BasePage{

    readonly usernameField : Locator;
    readonly passwordField : Locator;
    readonly loginButton : Locator

    constructor(page : Page){

        super(page);
        this.usernameField = page.locator('input[name="username"]');
        this.passwordField = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }
    
    async navigate(): Promise<void>{
            await this.page.goto('/web/index.php/auth/login');
    }

    async enterUsername(username: string): Promise<void>{
        await this.usernameField.fill(username);
    }

    async enterPassword(password : string): Promise<void>{
        await this.passwordField.fill(password);
    }

    async clickLogin(): Promise<void>{
        await this.loginButton.click();
    }


    async login(username : string, password : string): Promise<void>{
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }   

}