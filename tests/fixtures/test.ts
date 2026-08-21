import {test as base} from '@playwright/test';
import { DashboardPage } from '../../pages/Dashboardpage';
import { LoginPage } from '../../pages/LoginPage';

type TestFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
};

export const test = base.extend<TestFixtures>({

    loginPage : async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    dashboardPage : async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    }
})
export { expect } from '@playwright/test';
