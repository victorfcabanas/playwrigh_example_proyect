import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page, '/auth/login');
    this.emailInput = page.locator('[data-testid="login-email"]');
    this.passwordInput = page.locator('[data-testid="login-password"]');
    this.submitButton = page.locator('[data-testid="login-submit"]');
    this.forgotPasswordLink = page.locator('[data-testid="forgot-password"]');
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
}
