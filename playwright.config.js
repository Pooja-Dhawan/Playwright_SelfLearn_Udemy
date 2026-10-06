// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  //general timeout for every step
  timeout : 30 *1000,
  //assertion timeout is under expect
  expect : {
    timeout : 40*1000,
  },
  reporter : 'html',
  use: {
    browserName : 'chromium',
    headless : false
  },
});
module.exports = config;

