
import {
    Page,
    test as base,
    expect as expectPlaywright,
} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { TestData, Urls } from '../utils/testData';
import { DashboardPage } from '../pages/DashboardPage';

type TestFixtures = {
    loginPage: LoginPage;
    authenticatedPage: Page;
    dashboardPage: DashboardPage;
};

const test = base.extend<TestFixtures>({
    // Provides the login page for tests that need an unauthenticated state.
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await use(loginPage);
    },

    // Authenticates before tests that request authenticatedPage.
    authenticatedPage: async ({ page, loginPage }, use) => {
        page.on('response', (response) => {
            if (response.url().includes('/auth/validate')) {
                console.log(
                    'Authentication response:',
                    response.status(),
                    response.url()
                );
            }
        });

        page.on('pageerror', (error) => {
            console.error('Browser error:', error.message);
        });
        await loginPage.login(
            TestData.validCredentials.username,
            TestData.validCredentials.password
        );
        console.log('Expected Dashboard URL:', Urls.dashboardPage);
        console.log('Actual URL after login:', page.url());

        const loginErrorVisible = await loginPage.errorMessage
            .isVisible()
            .catch(() => false);

        if (loginErrorVisible) {
            console.log(
                'Login error:',
                await loginPage.errorMessage.innerText(),
            );
        }

        // Verify successful navigation to the Dashboard.
        await expectPlaywright(page).toHaveURL(Urls.dashboardPage, {
            timeout: 15000,
        });

        await use(page);
    },
});

export { test, expectPlaywright as expect };
