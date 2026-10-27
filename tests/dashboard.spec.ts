import { test, expect } from '../fixtures/auth.fiixture';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('SCRUM-7: View Dashboard', () => {
  let dashboardPage: DashboardPage;

  test('TC-SCRUM-7-01 Successful redirect to Dashboard after login  @TC-SCRUM-7-01 @P1 @smoke', async ({ authenticatedPage }) => {
    dashboardPage = new DashboardPage(authenticatedPage);
    await expect(dashboardPage.dashboardHeading).toBeVisible();
  });

  test('TC-SCRUM-7-02 Dashboard persistence after browser refresh @TC-SCRUM-7-03 @P2 @regression', async ({ authenticatedPage }) => {
    dashboardPage = new DashboardPage(authenticatedPage);
    await authenticatedPage.reload();
    await expect(authenticatedPage).toHaveURL(/.*dashboard/);
    await expect(dashboardPage.dashboardHeading).toBeVisible();
  });

  test('TC-SCRUM-7-03 Browser refresh after session expiration @TC-SCRUM-7-04 @P1 @regression', async ({ authenticatedPage, context }) => {
    dashboardPage = new DashboardPage(authenticatedPage);
    await context.clearCookies();
    await authenticatedPage.reload();
    await expect(authenticatedPage).toHaveURL(/.*login/);
  });

  test('TC-SCRUM-7-04 Unauthenticated access to root URL @TC-SCRUM-7-05 @P1 @smoke', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/');
    await expect(page).toHaveURL(/.*login/);
  });
});