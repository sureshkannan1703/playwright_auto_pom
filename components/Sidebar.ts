import {Page, Locator} from "@playwright/test"


export class Sidebar{

    private readonly dashboardLink: Locator;

    private readonly employeeLink: Locator;

    private readonly leaveLink: Locator;

    constructor(private page: Page) {
        this.dashboardLink = this.page.getByRole('link', { name: 'Dashboard' });
        this.employeeLink = this.page.getByRole('link', { name: 'Employee' });
        this.leaveLink = this.page.getByRole('link', { name: 'Leave' });
    }

    async navigateToDashboard() {
        await this.dashboardLink.click();
    }

    async navigateToEmployee() {
        await this.employeeLink.click();
    }

    async navigateToLeave() {
        await this.leaveLink.click();
    }

}