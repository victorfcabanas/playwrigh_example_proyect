import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LogoutPage extends BasePage {
  private readonly logoutButton: Locator;
  private readonly confirmLogoutButton: Locator;
  private readonly cancelLogoutButton: Locator;
  private readonly logoutMessage: Locator;

  constructor(page: Page) {
    super(page, '/auth/logout');
    this.logoutButton = this.page.locator('[data-testid="logout-button"]');
    this.confirmLogoutButton = this.page.locator('[data-testid="confirm-logout-button"]');
    this.cancelLogoutButton = this.page.locator('[data-testid="cancel-logout-button"]');
    this.logoutMessage = this.page.locator('[data-testid="logout-message"]');
  }

  async performLogout(): Promise<void> {
    await this.logoutButton.click();
    await this.confirmLogoutButton.click();
    await this.waitForPageLoad();
  }

  async cancelLogout(): Promise<void> {
    await this.logoutButton.click();
    await this.cancelLogoutButton.click();
  }

  async getLogoutMessage(): Promise<string> {
    return (await this.logoutMessage.textContent() || '').trim();
  }

  async waitForReady(): Promise<void> {
    await this.page.locator('[data-testid="logout-page"]').waitFor({ state: 'visible' }).catch(() => {});
  }
}
