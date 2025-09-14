import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';

export class Breadcrumb extends BaseComponent {
  private readonly items: Locator;

  constructor(page: Page) {
    super(page, '[data-testid="breadcrumb"]');
    this.items = this.container.locator('[data-testid="breadcrumb-item"]');
  }

  async getTrail(): Promise<string[]> {
    const result: string[] = [];
    const count = await this.items.count();
    for (let i = 0; i < count; i++) {
      result.push((await this.items.nth(i).textContent()) || '');
    }
    return result;
  }
}
