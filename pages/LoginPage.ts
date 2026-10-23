import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly requiredUsernameMessage: Locator;
  readonly requiredPasswordMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });

    this.errorMessage = page.getByText('Invalid credentials');

    this.requiredUsernameMessage = page
      .locator('.oxd-input-group')
      .filter({ has: this.usernameInput })
      .locator('.oxd-input-field-error-message');

    this.requiredPasswordMessage = page
      .locator('.oxd-input-group')
      .filter({ has: this.passwordInput })
      .locator('.oxd-input-field-error-message');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
  await this.fillUsername(username);
  await this.fillPassword(password);
  await this.clickLogin();

}
}
