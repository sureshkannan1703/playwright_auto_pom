import { Page, Locator } from "@playwright/test";

export class LoginPage{

    readonly page : Page;
    readonly usernameField : Locator;
    readonly passwordField : Locator;
    readonly loginButton : Locator

    constructor(page : Page){

        this.page = page;
        this.usernameField = page.locator('input[name="username"]');
        this.passwordField = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }
    
    async navigate(): Promise<void>{
            await this.page.goto('/web/index.php/auth/login');
    }

    async enterUsername(username: String): Promise<void>{
        await this.usernameField.fill(username);
    }

    async enterPassword(password : String): Promise<void>{
        await this.passwordField.fill(password);
    }

    async clickLogin(): Promise<void>{
        await this.loginButton.click();
    }


    async login(username : String, password : String): Promise<void>{
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }   

}