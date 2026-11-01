import { expect, Locator, Page } from '@playwright/test';
import { TestData } from '../utils/testData';

export class FooterPage {
  readonly page: Page;
  readonly version: Locator;
  readonly copyright: Locator;

  constructor(page: Page) {
    this.page = page;
    this.version = page.getByText(TestData.footer.versionPattern);
    this.copyright = page.getByText(TestData.footer.copyrightPattern);
  }

  async expectVisibleOnDashboard(): Promise<void> {
    await expect(this.version).toBeVisible();
    await expect(this.copyright).toBeVisible();
  }

  async expectText(version: string, copyright: string): Promise<void> {
    await expect(this.page.getByText(version, { exact: false })).toBeVisible();
    await expect(this.page.getByText(copyright, { exact: false })).toBeVisible();
  }

  async expectCopyright(copyright: string): Promise<void> {
    await expect(this.page.getByText(copyright, { exact: false })).toBeVisible();
  }

  async expectNotVisible(): Promise<void> {
    await expect(this.version).toHaveCount(0);
    await expect(this.copyright).toHaveCount(0);
  }

  async scrollToFooter(): Promise<void> {
    await this.copyright.scrollIntoViewIfNeeded();
  }

  async scrollPageToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  }

  async expectPageTallerThanViewport(): Promise<void> {
    await expect.poll(() => this.page.evaluate(() => document.documentElement.scrollHeight > window.innerHeight)).toBe(true);
  }

  async expectFooterAccessible(): Promise<void> {
    await expect(this.version).toBeVisible();
    await expect(this.copyright).toBeVisible();
    await expect(this.version).toBeInViewport();
    await expect(this.copyright).toBeInViewport();
  }

  async expectVersionAndCopyrightVisibleInViewport(): Promise<void> {
    await this.scrollToFooter();
    await this.expectFooterAccessible();
  }

  async expectFooterAtViewportBottom(): Promise<void> {
    await expect.poll(async () => {
      const box = await this.copyright.boundingBox();
      const viewport = this.page.viewportSize();
      if (!box || !viewport) return false;
      return Math.abs(viewport.height - (box.y + box.height)) <= TestData.footer.viewportBottomTolerance;
    }).toBe(true);
  }
}
