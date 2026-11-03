import { expect, test } from '../fixtures/auth.fiixture';
import { TopNavigationPage } from '../pages/TopNavigationPage';
import { formatEmployeeTotal, getAboutData } from '../utils/aboutApi';
import {
  scrum20EmployeeTotalCases,
  scrum20TestData,
  scrum20UnavailableExternalDestinations,
} from '../utils/scrum20TestData';

const topNavigation = scrum20TestData;

test.describe('SCRUM-20: Top navigation', () => {
  test.use({ viewport: { width: 1366, height: 768 } });

  test('TC-SCRUM-20-01 Verify top navigation content when an authenticated administrator views an application page', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-01', '@P1', '@smoke'],
  }, async ({ authenticatedPage }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    await expect(navigation.header).toBeVisible();
    await expect(navigation.pageTitle).toBeVisible();
    await expect(navigation.upgradeLink).toBeVisible();
    await expect(navigation.accountArea).toBeVisible();
  });

  test('TC-SCRUM-20-02 Verify the top navigation remains fixed while the administrator scrolls', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-02', '@P1', '@regression'],
  }, async ({ authenticatedPage }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    await expect(navigation.header).toBeVisible();
    const initialBox = await navigation.header.boundingBox();
    const scrollHeight = await authenticatedPage.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = authenticatedPage.viewportSize()?.height ?? 0;
    expect(scrollHeight).toBeGreaterThan(viewportHeight);
    await authenticatedPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(async () => {
      const box = await navigation.header.boundingBox();
      return box?.y;
    }).toBe(initialBox?.y);
  });

  test('TC-SCRUM-20-04 Verify Upgrade opens the specified destination in a new tab', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-04', '@P1', '@smoke'],
  }, async ({ authenticatedPage }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    const popupPromise = authenticatedPage.waitForEvent('popup');
    await navigation.upgradeLink.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(topNavigation.upgradeUrl);
  });

  test('TC-SCRUM-20-05 Verify the authenticated account area and account menu contents', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-05', '@P1', '@smoke'],
  }, async ({ authenticatedPage }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    await expect(navigation.profilePicture).toBeVisible();
    await expect(navigation.accountArea.getByText(topNavigation.accountName, { exact: true })).toBeVisible();
    await navigation.openAccountMenu();
    await expect(navigation.aboutMenuItem).toBeVisible();
    await expect(navigation.supportMenuItem).toBeVisible();
    await expect(navigation.changePasswordMenuItem).toBeVisible();
    await expect(navigation.logoutMenuItem).toBeVisible();
  });

  test('TC-SCRUM-20-07 Verify About displays authoritative API data', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-07', '@P1', '@regression'],
  }, async ({ authenticatedPage, aboutApi }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    const aboutData = await getAboutData(aboutApi, topNavigation.aboutApi);
    await navigation.mockAboutResponse(aboutData);
    await navigation.openAccountMenu();
    await navigation.openAbout();
    await expect(navigation.aboutDialog.getByRole('heading', { name: 'About', exact: true })).toBeVisible();
    await expect(navigation.aboutDialog).toContainText(aboutData.companyName);
    await expect(navigation.aboutDialog).toContainText(`${aboutData.productName} ${aboutData.version}`);
    await expect(navigation.aboutDialog).toContainText(
      navigation.activeEmployeeValue(formatEmployeeTotal(aboutData.numberOfActiveEmployee)),
    );
    await expect(navigation.aboutDialog).toContainText(
      navigation.employeeValue('Employees Terminated', formatEmployeeTotal(aboutData.numberOfPastEmployee)),
    );
  });

  for (const row of scrum20EmployeeTotalCases) {
    test(`TC-SCRUM-20-08 [${row.case}] Verify employee-total formatting for Active Employees and Employees Terminated`, {
      tag: ['@SCRUM-20', '@TC-SCRUM-20-08', '@P2', '@regression'],
    }, async ({ authenticatedPage }) => {
      const navigation = new TopNavigationPage(authenticatedPage);
      const aboutData = {
        companyName: topNavigation.companyName,
        productName: topNavigation.productName,
        version: topNavigation.version,
        numberOfActiveEmployee: row.field === 'Active Employees' ? row.total : 0,
        numberOfPastEmployee: row.field === 'Employees Terminated' ? row.total : 0,
      };
      await navigation.mockAboutResponse(aboutData);

      await navigation.openAccountMenu();
      await navigation.openAbout();
      const displayedValue = navigation.employeeValueLocator(row.field);
      await expect(displayedValue).toHaveText(row.expected);
    });
  }

  test('TC-SCRUM-20-09 Verify unavailable About data displays the required message', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-09', '@P1', '@regression'],
  }, async ({ authenticatedPage }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    await navigation.mockAboutFailure();
    await navigation.openAccountMenu();
    await navigation.openAbout();
    await expect(navigation.aboutDialog).toContainText('Data is unavailable to view');
  });

  test('TC-SCRUM-20-10 Verify About popup focus trapping and dismissal', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-10', '@P1', '@regression'],
  }, async ({ authenticatedPage }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    await navigation.openAccountMenu();
    await navigation.openAbout();
    await authenticatedPage.keyboard.press('Tab');
    await expect.poll(async () => navigation.aboutDialog.evaluate((dialog) => (
      dialog.contains(document.activeElement)
    ))).toBe(true);
    await navigation.closeAboutWithEscape();
    await navigation.openAccountMenu();
    await navigation.openAbout();
    await navigation.closeAboutWithButton();
  });

  test('TC-SCRUM-20-11 Verify account-menu dismissal by outside click and Escape', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-11', '@P1', '@regression'],
  }, async ({ authenticatedPage }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    await navigation.openAccountMenu();
    await navigation.clickOutsideAccountMenu();
    await navigation.openAccountMenu();
    await navigation.closeAccountMenuWithEscape();
  });

  test('TC-SCRUM-20-12 Verify Support navigates in the current tab', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-12', '@P1', '@smoke'],
  }, async ({ authenticatedPage }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    await navigation.openAccountMenu();
    await navigation.selectSupport();
    await expect(authenticatedPage).toHaveURL(topNavigation.supportUrl);
  });

  test('TC-SCRUM-20-13 Verify Change Password navigates in the current tab', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-13', '@P1', '@smoke'],
  }, async ({ authenticatedPage }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    await navigation.openAccountMenu();
    await navigation.selectChangePassword();
    await expect(authenticatedPage).toHaveURL(topNavigation.changePasswordUrl);
  });

  test('TC-SCRUM-20-14 Verify Logout ends the session and returns to Login', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-14', '@P1', '@smoke'],
  }, async ({ authenticatedPage }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    await navigation.openAccountMenu();
    await navigation.selectLogout();
    await expect(authenticatedPage).toHaveURL(/\/auth\/login/);
  });

  test('TC-SCRUM-20-15 Verify Help opens the specified destination in a new tab', {
    tag: ['@SCRUM-20', '@TC-SCRUM-20-15', '@P1', '@smoke'],
  }, async ({ authenticatedPage }) => {
    const navigation = new TopNavigationPage(authenticatedPage);
    const popupPromise = authenticatedPage.waitForEvent('popup');
    await navigation.helpControl.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(topNavigation.helpUrl);
  });

  for (const row of scrum20UnavailableExternalDestinations) {
    test(`TC-SCRUM-20-16 [${row.case}] Verify an unavailable external destination displays an error toast`, {
      tag: ['@SCRUM-20', '@TC-SCRUM-20-16', '@P1', '@regression'],
    }, async ({ authenticatedPage }) => {
      const navigation = new TopNavigationPage(authenticatedPage);
      await navigation.mockExternalDestinationFailure(row.destinationUrl);

      await navigation.selectExternalControl(row.control);

      await expect(navigation.errorToast).toBeVisible();
    });
  }

});
