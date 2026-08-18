import { Page, Locator } from "@playwright/test";

export class LoginPage{

    readonly page : Page;
    readonly userName : Locator;
    readonly password : Locator;
    readonly loginButton : Locator

    constructor (page : Page){

        this.page = page;
        userName = page.locator("")
    }


}