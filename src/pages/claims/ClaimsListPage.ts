import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { ClaimsTable } from '../../components/tables/ClaimsTable';

export class ClaimsListPage extends BasePage {
  private readonly claimsTable: ClaimsTable;
  private readonly createClaimButton: Locator;
  private readonly searchInput: Locator;
  private readonly statusFilter: Locator;
  private readonly dateFilter: Locator;
  private readonly exportButton: Locator;
  private readonly refreshButton: Locator;
  private readonly bulkActions: Locator;

  constructor(page: Page) {
    super(page, '/claims');
    this.claimsTable = new ClaimsTable(page);
    this.createClaimButton = this.page.locator('[data-testid="create-claim-button"]');
    this.searchInput = this.page.locator('[data-testid="search-claims-input"]');
    this.statusFilter = this.page.locator('[data-testid="status-filter"]');
    this.dateFilter = this.page.locator('[data-testid="date-filter"]');
    this.exportButton = this.page.locator('[data-testid="export-button"]');
    this.refreshButton = this.page.locator('[data-testid="refresh-button"]');
    this.bulkActions = this.page.locator('[data-testid="bulk-actions"]');
  }

  async createNewClaim(): Promise<void> {
    await this.createClaimButton.click();
  }

  async searchClaims(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.waitForPageLoad();
  }

  async filterByStatus(status: string): Promise<void> {
    await this.statusFilter.selectOption(String(status));
    await this.waitForPageLoad();
  }

  async filterByDateRange(startDate: string, endDate: string): Promise<void> {
    await this.dateFilter.click();
    await this.page.locator('[data-testid="start-date"]').fill(startDate);
    await this.page.locator('[data-testid="end-date"]').fill(endDate);
    await this.page.locator('[data-testid="apply-date-filter"]').click();
    await this.waitForPageLoad();
  }

  async exportClaims(format: 'csv' | 'excel' | 'pdf'): Promise<void> {
    await this.exportButton.click();
    await this.page.locator(`[data-testid="export-${format}"]`).click();
  }

  async refreshList(): Promise<void> {
    await this.refreshButton.click();
    await this.waitForPageLoad();
  }

  async selectClaimsForBulkAction(claimIds: string[]): Promise<void> {
    for (const claimId of claimIds) {
      const checkbox = this.page.locator(`[data-claim-id="${claimId}"] input[type="checkbox"]`);
      if ((await checkbox.count()) === 0) continue;
      await checkbox.check();
    }
  }

  async performBulkAction(action: string): Promise<void> {
    await this.bulkActions.selectOption(String(action));
    await this.page.locator('[data-testid="execute-bulk-action"]').click();
    await this.handleConfirmationModal(true);
  }

  getClaimsTable(): ClaimsTable {
    return this.claimsTable;
  }

  async waitForReady(): Promise<void> {
    await this.page.locator('[data-testid="claims-list-page"]').waitFor({ state: 'visible' }).catch(() => {});
  }
}
