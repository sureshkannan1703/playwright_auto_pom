import { test, expect} from './fixtures/test';

test(
  'verify user can login successfully',
  async ({ page, loginPage, dashboardPage }) => {

    // Navigate to the login page
    await loginPage.navigate();

    // Login with valid credentials
    await loginPage.login('Admin', 'admin123');

    // Verify successful navigation
    await expect(page).toHaveURL(/dashboard/);

    // Verify Dashboard page is loaded
    expect(await dashboardPage.isDashboardPageLoaded()).toBe(true);
  }
);