import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class VehiclesListPage extends BasePage {
  private readonly listContainer: Locator;
  private readonly rows: Locator;
  private readonly searchInput: Locator;

  constructor(page: Page) {
    super(page, '/vehicles');
    this.listContainer = this.page.locator('[data-testid="vehicles-list"]');
    this.rows = this.listContainer.locator('[data-testid="vehicle-row"]');
    this.searchInput = this.page.locator('[data-testid="vehicle-search"]');
  }

  async getRowCount(): Promise<number> {
    return await this.rows.count();
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.page.waitForLoadState('networkidle');
  }

  async getRowData(index: number): Promise<{ vin: string; make: string; model: string }> {
    const row = this.rows.nth(index);
    return {
      vin: (await row.locator('[data-testid="vin"]').textContent() || '').trim(),
      make: (await row.locator('[data-testid="make"]').textContent() || '').trim(),
      model: (await row.locator('[data-testid="model"]').textContent() || '').trim(),
    };
  }

  async waitForReady(): Promise<void> {
    await this.listContainer.waitFor({ state: 'visible' }).catch(() => {});
  }
}
