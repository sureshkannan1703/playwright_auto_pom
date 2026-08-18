import { test, expect } from '@playwright/test';


// Login test
test('verify user can login successfully', async ({ page }) => {

  // Navigate to the login page
  await page.goto('/web/index.php/auth/login');

  // Locate username field
  const usernameInput = page.locator('input[name="username"]');

  // Locate password field
  const passwordInput = page.locator('input[name="password"]');

  // Locate Login button
  const loginButton = page.locator('button[type="submit"]');

  // Verify login page elements are visible
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(loginButton).toBeVisible();

  // Enter username
  await usernameInput.fill('Admin');

  // Enter password
  await passwordInput.fill('admin123');

  // Click Login
  await loginButton.click();

  // Verify successful login
  await expect(page).toHaveURL(/dashboard/);
});