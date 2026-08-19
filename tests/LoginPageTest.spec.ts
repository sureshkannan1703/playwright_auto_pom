import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/Dashboardpage';


test('verify user can login successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Navigate to the login page
  loginPage.navigate();

  // Enter username and password and click login
  loginPage.login('Admin', 'admin123');
  
  // Verify successful login
  await expect(page).toHaveURL(/dashboard/);

  await dashboardPage.isDashboardPageLoaded();

})