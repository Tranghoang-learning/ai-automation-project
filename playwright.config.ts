import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Load .env before reading environment variables
const targetEnv = process.env.TARGET_ENV;

const baseURLByEnvironment: Record<string, string | undefined> = {
  'QA': process.env.QA_BASE_URL,
  'Staging': process.env.STAGING_BASE_URL,
  'UAT': process.env.UAT_BASE_URL,
};
if (!targetEnv || !(targetEnv in baseURLByEnvironment)) {
  throw new Error(
    'TARGET_ENV must be QA, Staging, or UAT.'
  );
}
const baseURL = baseURLByEnvironment[targetEnv];

if (!baseURL) {
  throw new Error(`Missing URL configuration for ${targetEnv}.`);
}

let parsedURL: URL;

try {
  parsedURL = new URL(baseURL);
} catch {
  throw new Error(`Invalid URL configured for ${targetEnv}.`);
}

if (parsedURL.protocol !== 'https:') {
  throw new Error(`${targetEnv} must use an HTTPS URL.`);
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { outputFile: 'test-results/results.html' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL ||
    'https://opensource-demo.orangehrmlive.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // Capture evidence for debugging failed tests.
    screenshot: 'only-on-failure',
    video: 'on',
  },
  outputDir: 'test-results/',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
