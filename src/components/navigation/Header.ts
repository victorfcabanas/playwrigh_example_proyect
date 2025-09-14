import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';

export class Header extends BaseComponent {
  private readonly logo: Locator;
  private readonly userMenu: Locator;
  private readonly notifications: Locator;

  constructor(page: Page) {
    super(page, '[data-testid="header"]');
    this.logo = this.container.locator('[data-testid="logo"]');
    this.userMenu = this.container.locator('[data-testid="user-menu"]');
    this.notifications = this.container.locator('[data-testid="notifications"]');
  }

  async openUserMenu(): Promise<void> {
    await this.userMenu.click();
  }

  async getNotificationsCount(): Promise<number> {
    return parseInt(await this.notifications.textContent() || '0');
  }
}
