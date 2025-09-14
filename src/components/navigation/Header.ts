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
    const badge = this.notifications.locator('[data-testid="notification-badge"]');
    if ((await badge.count()) === 0) return 0;
    const text = (await badge.textContent()) || '0';
    const n = parseInt((text || '').trim() || '0');
    return Number.isNaN(n) ? 0 : n;
  }

  async waitForReady(): Promise<void> {
    await this.container.waitFor({ state: 'visible' }).catch(() => {});
  }
}
