import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page, '/auth/login');
    this.emailInput = this.page.locator('[data-testid="login-email"]');
    this.passwordInput = this.page.locator('[data-testid="login-password"]');
    this.submitButton = this.page.locator('[data-testid="login-submit"]');
    this.forgotPasswordLink = this.page.locator('[data-testid="forgot-password"]');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.waitForPageLoad();
  }

  async navigateToForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async waitForReady(): Promise<void> {
    await this.page.locator('[data-testid="login-page"]').waitFor({ state: 'visible' }).catch(() => {});
  }
}
