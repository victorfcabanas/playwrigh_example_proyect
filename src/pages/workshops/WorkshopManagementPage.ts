import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class WorkshopManagementPage extends BasePage {
  private readonly createWorkshopButton: Locator;
  private readonly workshopList: Locator;
  private readonly importButton: Locator;
  private readonly exportButton: Locator;

  constructor(page: Page) {
    super(page, '/workshops/manage');
    this.createWorkshopButton = page.locator('[data-testid="create-workshop-button"]');
    this.workshopList = page.locator('[data-testid="workshop-list"]');
    this.importButton = page.locator('[data-testid="import-workshops"]');
    this.exportButton = page.locator('[data-testid="export-workshops"]');
  }

  async openCreateWorkshop(): Promise<void> {
    await this.createWorkshopButton.click();
  }

  async importWorkshops(filePath: string): Promise<void> {
    await this.importButton.setInputFiles(filePath);
    await this.waitForToast('Workshops imported');
  }

  async exportWorkshops(format: 'csv' | 'excel'): Promise<void> {
    await this.exportButton.click();
    await this.page.locator(`[data-testid="export-${format}"]`).click();
  }

  async getWorkshopIds(): Promise<string[]> {
    const rows = this.workshopList.locator('[data-testid="workshop-row"]');
    const result: string[] = [];
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const id = await rows.nth(i).getAttribute('data-workshop-id') || '';
      if (id) result.push(id);
    }
    return result;
  }
}
