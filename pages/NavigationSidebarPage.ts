import { expect, Locator, Page } from '@playwright/test';

export class NavigationSidebarPage {
  readonly page: Page;
  readonly navigation: Locator;
  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly toggleButton: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.getByRole('navigation', { name: 'Sidepanel', exact: true });
    this.logo = this.navigation.getByAltText(/OrangeHRM|client brand banner|company-brand/i);
    this.searchInput = this.navigation.getByRole('textbox', { name: 'Search', exact: true });
    this.toggleButton = this.navigation.getByRole('button');
    this.mainContent = page.getByRole('heading', { name: 'Dashboard', exact: true });
  }

  navigationItem(name: string): Locator {
    return this.navigation.getByRole('link', { name, exact: true });
  }

  visibleNavigationItems(): Locator {
    return this.navigation.getByRole('list').getByRole('link');
  }

  async expectExpanded(): Promise<void> {
    await expect(this.navigation).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.toggleButton).toBeVisible();
  }

  async expectCollapsed(): Promise<void> {
    await expect(this.navigation).toBeVisible();
    await expect(this.searchInput).toBeHidden();
  }

  async collapse(): Promise<void> {
    await this.toggleButton.click();
  }

  async expand(): Promise<void> {
    await this.toggleButton.click();
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
  }

  async navigateTo(name: string): Promise<void> {
    await this.navigationItem(name).click();
  }

  async expectNavigationOrder(expectedItems: string[]): Promise<void> {
    for (const name of expectedItems) {
      await expect(this.navigationItem(name)).toBeVisible();
    }
  }

  async expectActive(name: string): Promise<void> {
    await expect(this.navigationItem(name)).toHaveClass(/\bactive\b/i);
  }

  async expectMainContentUsable(): Promise<void> {
    await expect(this.mainContent).toBeVisible();
  }

  async expectAvailable(): Promise<void> {
    await expect(this.navigation).toBeVisible();
  }

  async expectLogoVisible(): Promise<void> {
    await expect(this.logo).toBeVisible();
  }

  async expectSearchValue(value: string): Promise<void> {
    await expect(this.searchInput).toHaveValue(value);
  }

  async expectSearchEditable(): Promise<void> {
    await expect(this.searchInput).toBeEditable();
  }

  async expectNoNavigationItems(): Promise<void> {
    await expect(this.visibleNavigationItems()).toHaveCount(0);
    await this.expectSearchEditable();
  }

  async expectUrl(expectedUrl: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async expectNavigationLabels(expectedItems: string[]): Promise<void> {
    await expect.poll(async () => {
      const labels = await this.visibleNavigationItems().allTextContents();
      return labels.map((label) => label.trim()).filter(Boolean);
    }).toEqual(expectedItems);
  }
}
