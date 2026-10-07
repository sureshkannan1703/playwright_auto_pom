import { defineConfig } from '@playwright/test';
import { env } from './config/env';
import process from 'process';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: isCI,

  retries: isCI ? 2 : 0,

  workers: isCI ? 2 : 1,

  timeout: 30_000,

  expect: {
    timeout: 8_000,
  },

  reporter: isCI
    ? [['line'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],

  use: {
  baseURL: env.baseUrl,

  headless: isCI,

  locale: 'en-US',

  screenshot: 'only-on-failure',

  video: 'retain-on-failure',

  trace: 'on-first-retry',

  actionTimeout: 10_000,

  navigationTimeout: 30_000,
},
  projects: [
    {
      name: 'setup',

      testMatch: /.*\.setup\.ts/,
    },

    {
      name: 'chromium-unauthenticated',

      testMatch: /ui\/unauthenticated\/.*\.spec\.ts/,

      use: {
        browserName: 'chromium',
      },
    },

    {
      name: 'chromium-authenticated',

      testMatch: /ui\/authenticated\/.*\.spec\.ts/,

      use: {
        browserName: 'chromium',
        storageState: 'auth/user.json',
      },

      dependencies: ['setup'],
    },

    {
      name: 'api',

      testMatch: /api\/.*\.spec\.ts/,
    },
  ],
});