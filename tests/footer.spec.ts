import { test, expect } from '../fixtures/auth.fiixture';
import { DashboardPage } from '../pages/DashboardPage';
import { FooterPage } from '../pages/FooterPage';
import { NavigationSidebarPage } from '../pages/NavigationSidebarPage';
import { TestData } from '../utils/testData';

const { version: expectedVersion, copyright: expectedCopyright } = TestData.footer;

test.describe('SCRUM-22: Application footer', () => {
  test('TC-SCRUM-22-01 Display the footer on the Dashboard page @SCRUM-22 @TC-SCRUM-22-01 @P1 @smoke', async ({ authenticatedPage }) => {
    const dashboardPage = new DashboardPage(authenticatedPage);
    const footerPage = new FooterPage(authenticatedPage);

    await dashboardPage.expectDashboardUrl();
    await footerPage.expectVisibleOnDashboard();
    await expect(dashboardPage.dashboardHeading).toBeVisible();
  });

  test('TC-SCRUM-22-02 Footer remains accessible at the bottom of a long Dashboard page @SCRUM-22 @TC-SCRUM-22-02 @P1 @regression', async ({ authenticatedPage }) => {
    const footerPage = new FooterPage(authenticatedPage);

    await footerPage.expectPageTallerThanViewport();
    await footerPage.scrollPageToBottom();
    await footerPage.expectFooterAccessible();
  });

  test('TC-SCRUM-22-03 Footer is positioned at the bottom of a short Dashboard page @SCRUM-22 @TC-SCRUM-22-03 @P1 @regression', async ({ authenticatedPage }) => {
    await authenticatedPage.setViewportSize(TestData.footer.shortPageViewport);
    const footerPage = new FooterPage(authenticatedPage);

    await footerPage.scrollToFooter();
    await footerPage.expectFooterAtViewportBottom();
  });

  test('TC-SCRUM-22-04 Display the application version on Dashboard @SCRUM-22 @TC-SCRUM-22-04 @P1 @smoke', async ({ authenticatedPage }) => {
    const footerPage = new FooterPage(authenticatedPage);

    await footerPage.expectText(expectedVersion, expectedCopyright);
  });

  test('TC-SCRUM-22-05 Application version is consistent across shared-layout pages @SCRUM-22 @TC-SCRUM-22-05 @P1 @regression', async ({ authenticatedPage }) => {
    const sidebar = new NavigationSidebarPage(authenticatedPage);
    const footerPage = new FooterPage(authenticatedPage);

    await footerPage.expectText(expectedVersion, expectedCopyright);
    await sidebar.navigateTo(TestData.footer.pimNavigationItem);
    await expect(authenticatedPage).toHaveURL(TestData.footer.pimPathPattern);
    await footerPage.expectText(expectedVersion, expectedCopyright);
  });

  test('TC-SCRUM-22-06 Display the copyright notice on Dashboard @SCRUM-22 @TC-SCRUM-22-06 @P1 @smoke', async ({ authenticatedPage }) => {
    const footerPage = new FooterPage(authenticatedPage);

    await footerPage.expectText(expectedVersion, expectedCopyright);
  });

  test('TC-SCRUM-22-07 Release information is consistent across shared-layout pages @SCRUM-22 @TC-SCRUM-22-07 @P1 @suggestion @regression', async ({ authenticatedPage }) => {
    const sidebar = new NavigationSidebarPage(authenticatedPage);
    const footerPage = new FooterPage(authenticatedPage);

    await footerPage.expectCopyright(expectedCopyright);
    await sidebar.navigateTo(TestData.footer.pimNavigationItem);
    await expect(authenticatedPage).toHaveURL(TestData.footer.pimPathPattern);
    await footerPage.expectCopyright(expectedCopyright);
  });

  test('TC-SCRUM-22-08 Display the footer on the Login page @SCRUM-22 @TC-SCRUM-22-08 @P1 @suggestion @regression', async ({ loginPage }) => {
    const footerPage = new FooterPage(loginPage.page);

    await loginPage.expectLoaded();
    await footerPage.expectText(TestData.footer.version, TestData.footer.copyright);
    await footerPage.expectVersionAndCopyrightVisibleInViewport();
  });
});
