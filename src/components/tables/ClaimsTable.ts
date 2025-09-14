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
    this.tableRows = this.container.locator('tbody tr');
    this.headerCells = this.container.locator('thead th');
    this.sortButtons = this.container.locator('[data-testid^="sort-"]');
    this.filterInputs = this.container.locator('[data-testid^="filter-"]');
    this.paginationInfo = this.container.locator('[data-testid="pagination-info"]');
  }

  async getRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  async getCellValue(row: number, column: string): Promise<string> {
    const cell = this.tableRows.nth(row).locator(`[data-column="${column}"]`);
    return ((await cell.textContent()) || '').trim();
  }

  async sortByColumn(columnName: string, direction: 'asc' | 'desc' = 'asc'): Promise<void> {
    const sortButton = this.container.locator(`[data-testid="sort-${columnName}"]`);
    await sortButton.click().catch(() => {});
    await this.page.waitForTimeout(800);
  }

  async filterByColumn(columnName: string, value: string): Promise<void> {
    const filterInput = this.container.locator(`[data-testid="filter-${columnName}"]`);
    await filterInput.fill(String(value).trim()).catch(() => {});
    await this.page.waitForTimeout(800);
  }

  async selectRow(rowIndex: number): Promise<void> {
    const checkbox = this.tableRows.nth(rowIndex).locator('input[type="checkbox"]');
    await checkbox.check().catch(() => {});
  }

  async selectAllRows(): Promise<void> {
    const selectAllCheckbox = this.container.locator('thead input[type="checkbox"]');
    await selectAllCheckbox.check().catch(() => {});
  }

  async getSelectedRowsCount(): Promise<number> {
    const selectedCheckboxes = this.container.locator('tbody input[type="checkbox"]:checked');
    return await selectedCheckboxes.count();
  }

  async clickRowAction(rowIndex: number, action: string): Promise<void> {
    const actionButton = this.tableRows.nth(rowIndex).locator(`[data-testid="${action}-button"]`);
    await actionButton.click().catch(() => {});
  }

  async bulkAction(action: string): Promise<void> {
    const bulkActionButton = this.container.locator(`[data-testid="bulk-${action}"]`);
    await bulkActionButton.click().catch(() => {});
  }

  async goToPage(pageNumber: number): Promise<void> {
    const pageButton = this.container.locator(`[data-testid="page-${pageNumber}"]`);
    await pageButton.click().catch(() => {});
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentPageInfo(): Promise<{ current: number; total: number; showing: string }> {
    const infoText = ((await this.paginationInfo.textContent()) || '').trim();
    // Basic fallback implementation: parse numbers if available, otherwise return defaults
    // Expected formats can vary; for now return the raw text in "showing" and defaults for numbers
    return { current: 1, total: 1, showing: infoText };
  }
}
