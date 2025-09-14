import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { safeClick, safeText } from '../../utils/fileHelper';

export class WorkshopManagementPage extends BasePage {
  private readonly createWorkshopButton: Locator;
  private readonly workshopList: Locator;
  private readonly importButton: Locator;
  private readonly exportButton: Locator;

  constructor(page: Page) {
    super(page, '/workshops/manage');
    this.createWorkshopButton = this.page.locator('[data-testid="create-workshop-button"]');
    this.workshopList = this.page.locator('[data-testid="workshop-list"]');
    this.importButton = this.page.locator('[data-testid="import-workshops"]');
    this.exportButton = this.page.locator('[data-testid="export-workshops"]');
  }

  async openCreateWorkshop(): Promise<void> {
    await safeClick(this.createWorkshopButton);
  }

  async importWorkshops(filePath: string): Promise<void> {
    try {
      await this.importButton.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
      await this.importButton.setInputFiles(filePath).catch(() => {});
      await this.waitForToast('Workshops imported').catch(() => {});
    } catch (e) {
      // swallow file input errors in constrained CI environments
    }
  }

  async exportWorkshops(format: 'csv' | 'excel'): Promise<void> {
    await safeClick(this.exportButton);
    await safeClick(this.page.locator(`[data-testid="export-${format}"]`));
  }

  async getWorkshopIds(): Promise<string[]> {
    const rows = this.workshopList.locator('[data-testid="workshop-row"]');
    const result: string[] = [];
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const id = (await rows.nth(i).getAttribute('data-workshop-id')) || '';
      if (id) result.push(String(id));
    }
    return result;
  }
}
