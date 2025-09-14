import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';

export class Sidebar extends BaseComponent {
  private readonly menuItems: Locator;

  constructor(page: Page) {
    super(page, '[data-testid="sidebar"]');
    this.menuItems = this.container.locator('[data-testid="menu-item"]');
  }

  async navigateTo(item: string): Promise<void> {
    await this.container.locator(`[data-action="${item}"]`).click();
    await this.page.waitForLoadState('networkidle');
  }
}
