import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TestData, ErrorMessages, Urls } from '../utils/testData';

test.describe('SCRUM-2: Admin Authentication @SCRUM-2', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC-SCRUM-2-01: Successful Admin Authentication @P1 @sanity @smoke @regression @story', async ({ page, browserName }) => {
    
    const { username, password } = TestData.validCredentials;

    // TEMPORARY DIAGNOSTICS: capture authentication responses.
      page.on('response', (response) => {
        if (response.url().includes('/auth/validate')) {
          console.log(
            `[${browserName}] Authentication response:`,
            response.status(),
            response.url()
          );
        }
      });

      // TEMPORARY DIAGNOSTICS: capture browser-side JavaScript errors.
      page.on('pageerror', (error) => {
        console.error(
          `[${browserName}] Browser JavaScript error:`,
          error.message
        );
      });

      // TEMPORARY DIAGNOSTICS: capture failed network requests.
      page.on('requestfailed', (request) => {
        console.error(
          `[${browserName}] Request failed:`,
          request.method(),
          request.url(),
          request.failure()?.errorText
        );
      });

    await loginPage.login(username, password);
    await expect(page).toHaveURL(/.*dashboard/);
  });

    const invalidCredentials = TestData.invalidCredentials.map(data => ({
      user: data.username,
      pass: data.password,
      comment: data.description
    }));

  for (const data of invalidCredentials) {
    test(`TC-SCRUM-2-02: Auth Failure - ${data.comment} @P1 @regression @story @sanity`, async ({ page }) => {
      await loginPage.login(data.user, data.pass);
      await expect(page).toHaveURL(/.*login/);
      await expect(loginPage.errorMessage).toContainText('Invalid credentials');
    });
  }

  const mandatoryFields = TestData.mandatoryFields.map (data => ({
    testcase: data.testcase,
    user: data.username,
    pass: data.password,
    field: data.description
  }));

  for (const data of mandatoryFields) {
    test(`TC-SCRUM-2-03: Mandatory Field - ${data.field} - ${data.user || 'empty'}/${data.pass || 'empty'} @P2 @regression @sanity`, async ({ page }) => {
      await loginPage.login(data.user, data.pass);
      await expect(page).toHaveURL(/.*login/);
      // Use .first() to avoid strict mode violation when multiple 'Required' messages appear
      if (data.testcase === 'usernameRequired') {
        await expect(loginPage.requiredUsernameMessage.first()).toBeVisible();
      } else if (data.testcase === 'passwordRequired') {
        await expect(loginPage.requiredPasswordMessage.first()).toBeVisible();
      } else if (data.testcase === 'bothFieldsRequired') {
        await expect(loginPage.requiredUsernameMessage.first()).toBeVisible();
        await expect(loginPage.requiredPasswordMessage.first()).toBeVisible();
      } else if (data.testcase === 'whitespaceUsername') {
        await expect(loginPage.requiredUsernameMessage.first()).toBeVisible();
      } else if (data.testcase === 'whitespacePassword') {
        await expect(loginPage.requiredPasswordMessage.first()).toBeVisible();
      } else if (data.testcase === 'whitespaceBoth') {
        await expect(loginPage.requiredUsernameMessage.first()).toBeVisible();
        await expect(loginPage.requiredPasswordMessage.first()).toBeVisible();
      }
    });
  }

  test('TC-SCRUM-2-04: System Error Handling (API 500) @P2 @regression @story @sanity', async ({ page }) => {
    // Mock the primary authentication endpoint to simulate a 500 server error
    
    await loginPage.page.route('**/index.php/auth/validate', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });
    // Also mock alternative authentication endpoints to ensure comprehensive error handling
    await loginPage.page.route('**/auth/signin', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: ErrorMessages.serviceError })
      });
    });

    await loginPage.page.route('**/api/v1/auth/signin', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: ErrorMessages.serviceError })
      });
    });
    
    // Arrange: Use valid credentials for login attempt
    const { username, password } = TestData.validCredentials;

    // Act: Attempt login with valid credentials (which will trigger mocked service error)
    await loginPage.login(username, password);

    // Assert: Verify service error message is visible on the page
    await expect(loginPage.page.getByText(ErrorMessages.serviceError)).toBeVisible();
    // Assert: Verify user is navigated to error/validate page (no successful login occurred)
    await expect(loginPage.page).toHaveURL(Urls.validatePage);

    // Assert: Verify dashboard elements are not visible (confirming no successful login)
    await expect(loginPage.page.locator('text=Dashboard')).not.toBeVisible();

  });

  test('TC-SCRUM-2-05: Non-standard Format Input @P3 @regression @story @sanity', async ({ page }) => {
    // Testing that special characters don't crash the system
    const specialUser = 'admin_!@#$%^&*()';
    await loginPage.login(specialUser, 'any_password');
    // Expectation is simply that it fails gracefully (invalid credentials) rather than crashing
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
