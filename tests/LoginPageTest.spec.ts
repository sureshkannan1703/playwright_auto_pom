import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/Dashboardpage';


test('verify user can login successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Navigate to the login page
  await loginPage.navigate();

  // Enter username and password and click login
  await loginPage.login('Admin', 'admin123');
  
  // Verify successful login
  await expect(page).toHaveURL(/dashboard/);

  expect(await dashboardPage.isDashboardPageLoaded()).toBe(true);

})