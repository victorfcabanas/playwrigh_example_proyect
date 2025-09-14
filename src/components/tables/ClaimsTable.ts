import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';

export class ClaimsTable extends BaseComponent {
  private readonly tableRows: Locator;
  private readonly headerCells: Locator;
  private readonly sortButtons: Locator;
  private readonly filterInputs: Locator;
  private readonly paginationInfo: Locator;

  constructor(page: Page, containerSelector: string = '[data-testid="claims-table"]') {
    super(page, containerSelector);
    this.paginationInfo = this.container.locator('[data-testid="pagination-info"]');
  }

  async getRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  async getCellValue(row: number, column: string): Promise<string> {
    const cell = this.tableRows.nth(row).locator(`[data-column="${column}"]`);
    return await cell.textContent() || '';
  }

  async sortByColumn(columnName: string, direction: 'asc' | 'desc' = 'asc'): Promise<void> {
    const sortButton = this.container.locator(`[data-testid="sort-${columnName}"]`);
    await this.page.waitForTimeout(1000); // Wait for sort to complete
  }

  async filterByColumn(columnName: string, value: string): Promise<void> {
    const filterInput = this.container.locator(`[data-testid="filter-${columnName}"]`);
    await this.page.waitForTimeout(1000); // Wait for filter to apply
  }

  async selectRow(rowIndex: number): Promise<void> {
    const checkbox = this.tableRows.nth(rowIndex).locator('input[type="checkbox"]');
    await checkbox.check();
  }

  async selectAllRows(): Promise<void> {
    const selectAllCheckbox = this.container.locator('thead input[type="checkbox"]');
    await selectAllCheckbox.check();
  }

  async getSelectedRowsCount(): Promise<number> {
    const selectedCheckboxes = this.container.locator('tbody input[type="checkbox"]:checked');
    return await selectedCheckboxes.count();
  }

  async clickRowAction(rowIndex: number, action: string): Promise<void> {
    const actionButton = this.tableRows.nth(rowIndex).locator(`[data-testid="${action}-button"]`);
    await actionButton.click();
  }

  async bulkAction(action: string): Promise<void> {
    const bulkActionButton = this.container.locator(`[data-testid="bulk-${action}"]`);
    await bulkActionButton.click();
  }

  async goToPage(pageNumber: number): Promise<void> {
    const pageButton = this.container.locator(`[data-testid="page-${pageNumber}"]`);
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentPageInfo(): Promise<{ current: number; total: number; showing: string }> {
    const infoText = await this.paginationInfo.textContent() || '';
    };
  }
}
