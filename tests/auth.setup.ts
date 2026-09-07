import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

const authFile = 'auth/user.json';

setup('authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    users.validUser.username,
    users.validUser.password
  );

  await page.waitForURL(/dashboard/);

  await page.context().storageState({
    path: authFile,
  });
});