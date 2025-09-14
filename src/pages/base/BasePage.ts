import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  protected basePath: string;

  constructor(page: Page, basePath: string = '/') {
    this.page = page;
    this.basePath = basePath;
  }

  async navigate(path: string = ''): Promise<void> {
    const url = `${this.basePath}${path}`;
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForToast(message: string, timeout = 5000): Promise<void> {
    const toast = this.page.locator(`text=${message}`);
    await toast.waitFor({ state: 'visible', timeout });
  }

  async handleConfirmationModal(confirm: boolean): Promise<void> {
    const modal = this.page.locator('[data-testid="confirmation-modal"]');
    if (await modal.count() === 0) return;

    if (confirm) {
      await modal.locator('[data-testid="confirm-yes"]').click();
    } else {
      await modal.locator('[data-testid="confirm-no"]').click();
    }

    await modal.waitFor({ state: 'hidden' });
  }
}
