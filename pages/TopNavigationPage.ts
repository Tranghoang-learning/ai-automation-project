import { expect, Locator, Page } from '@playwright/test';

export class TopNavigationPage {
  readonly page: Page;
  readonly header: Locator;
  readonly pageTitle: Locator;
  readonly mainContent: Locator;
  readonly upgradeLink: Locator;
  readonly accountArea: Locator;
  readonly profilePicture: Locator;
  readonly accountMenu: Locator;
  readonly aboutMenuItem: Locator;
  readonly supportMenuItem: Locator;
  readonly changePasswordMenuItem: Locator;
  readonly logoutMenuItem: Locator;
  readonly helpControl: Locator;
  readonly errorToast: Locator;
  readonly aboutDialog: Locator;
  readonly aboutCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('banner');
    this.pageTitle = this.header.getByRole('heading', { name: 'Dashboard', exact: true });
    this.mainContent = page.getByRole('main');
    this.upgradeLink = this.header.getByRole('link', { name: 'Upgrade', exact: true });
    this.profilePicture = this.page.getByAltText('profile picture').first();
    this.accountArea = this.header.getByRole('listitem').first();
    this.accountMenu = this.accountArea.getByRole('menu');
    this.aboutMenuItem = this.accountMenu.getByRole('menuitem', { name: 'About', exact: true });
    this.supportMenuItem = this.accountMenu.getByRole('menuitem', { name: 'Support', exact: true });
    this.changePasswordMenuItem = this.accountMenu.getByRole('menuitem', {
      name: 'Change Password',
      exact: true,
    });
    this.logoutMenuItem = this.accountMenu.getByRole('menuitem', { name: 'Logout', exact: true });
    this.helpControl = page.getByRole('navigation', { name: 'Topbar Menu', exact: true }).getByRole('button');
    this.errorToast = page.getByText('Failed to load', { exact: true });
    this.aboutDialog = page.getByRole('dialog');
    this.aboutCloseButton = this.aboutDialog.getByRole('button', { name: '×', exact: true });
  }

  async openAccountMenu(): Promise<void> {
    await this.accountArea.click();
    await expect(this.accountMenu).toBeVisible();
  }

  async closeAccountMenuWithEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await expect(this.accountMenu).toBeHidden();
  }

  async clickOutsideAccountMenu(): Promise<void> {
    await this.pageTitle.click();
    await expect(this.accountMenu).toBeHidden();
  }

  async openAbout(): Promise<void> {
    await this.aboutMenuItem.click();
    await expect(this.aboutDialog).toBeVisible();
  }

  async selectSupport(): Promise<void> {
    await this.supportMenuItem.click();
  }

  async selectChangePassword(): Promise<void> {
    await this.changePasswordMenuItem.click();
  }

  async selectLogout(): Promise<void> {
    await this.logoutMenuItem.click();
  }

  async selectExternalControl(control: 'Upgrade' | 'Help'): Promise<void> {
    if (control === 'Upgrade') {
      await this.upgradeLink.click();
      return;
    }

    await this.helpControl.click();
  }

  async closeAboutWithEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await expect(this.aboutDialog).toBeHidden();
  }

  async closeAboutWithButton(): Promise<void> {
    await this.aboutCloseButton.click();
    await expect(this.aboutDialog).toBeHidden();
  }

  async mockAboutResponse(response: {
    companyName: string;
    productName: string;
    version: string;
    numberOfActiveEmployee: number;
    numberOfPastEmployee: number;
  }): Promise<void> {
    await this.page.route('**/api/v2/core/about**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: response, meta: [], rels: [] }),
      });
    });
  }

  async mockAboutFailure(): Promise<void> {
    await this.page.route('**/api/v2/core/about**', (route) => route.abort());
  }

  async mockExternalDestinationFailure(destinationUrl: string): Promise<void> {
    await this.page.context().route(`${destinationUrl}**`, (route) => route.abort());
  }

  async aboutValue(label: string): Promise<Locator> {
    return this.aboutDialog.getByText(label, { exact: true }).first();
  }

  employeeValue(label: string, expected: string): RegExp {
    const escapedValue = expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`${escapedLabel}:\\s*${escapedValue}`);
  }

  employeeValueLocator(label: string): Locator {
    const valueIndex = label === 'Active Employees' ? 5 : 7;
    return this.aboutDialog.getByRole('paragraph').nth(valueIndex);
  }

  activeEmployeeValue(expected: string): RegExp {
    return this.employeeValue('Active Employees', expected);
  }
}
