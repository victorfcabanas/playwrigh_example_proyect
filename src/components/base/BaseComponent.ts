import { Page, Locator } from '@playwright/test';

export abstract class BaseComponent {
  protected page: Page;
  protected container: Locator;

  constructor(page: Page, containerSelector: string) {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  async isVisible(): Promise<boolean> {
    try {
      return await this.container.isVisible();
    } catch (e) {
      return false;
    }
  }

  async waitForVisible(): Promise<void> {
    await this.container.waitFor({ state: 'visible' });
  }

  async waitForHidden(): Promise<void> {
    await this.container.waitFor({ state: 'hidden' });
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.container.screenshot({ path: name });
  }
}
