import { expect, Locator, Page } from '@playwright/test';
import { FooterComponent } from './components/FooterComponent';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;
  readonly leftNavDashboardItem: Locator;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;

    this.dashboardHeading = page.getByRole('heading', {
      name: 'Dashboard',
      exact: true,
    });

    this.leftNavDashboardItem = page.getByRole('link', {
      name: 'Dashboard',
      exact: true,
    });

    this.footer = new FooterComponent(page);
  }

  async expectDashboardUrl(): Promise<void> {
    await expect(this.page).toHaveURL(/\/dashboard/);
  }
}


 