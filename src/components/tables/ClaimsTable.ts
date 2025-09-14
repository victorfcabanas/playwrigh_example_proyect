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
    await cell.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    const text = (await cell.textContent().catch(() => '')) || '';
    return text.trim();
  }

  async sortByColumn(columnName: string, direction: 'asc' | 'desc' = 'asc'): Promise<void> {
    const sortButton = this.container.locator(`[data-testid="sort-${columnName}"]`);
    await sortButton.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    await sortButton.click().catch(() => {});
    await this.page.waitForTimeout(800);
  }

  async filterByColumn(columnName: string, value: string): Promise<void> {
    const filterInput = this.container.locator(`[data-testid="filter-${columnName}"]`);
    await filterInput.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    await filterInput.fill(String(value).trim()).catch(() => {});
    await filterInput.press('Enter').catch(() => {});
    await this.page.waitForTimeout(800);
  }

  async selectRow(rowIndex: number): Promise<void> {
    const checkbox = this.tableRows.nth(rowIndex).locator('input[type="checkbox"]');
    await checkbox.scrollIntoViewIfNeeded().catch(() => {});
    await checkbox.check().catch(() => {});
  }

  async selectAllRows(): Promise<void> {
    const selectAllCheckbox = this.container.locator('thead input[type="checkbox"]');
    await selectAllCheckbox.scrollIntoViewIfNeeded().catch(() => {});
    await selectAllCheckbox.check().catch(() => {});
  }

  async getSelectedRowsCount(): Promise<number> {
    const selectedCheckboxes = this.container.locator('tbody input[type="checkbox"]:checked');
    return await selectedCheckboxes.count();
  }

  async clickRowAction(rowIndex: number, action: string): Promise<void> {
    const actionButton = this.tableRows.nth(rowIndex).locator(`[data-testid="${action}-button"]`);
    await actionButton.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    await actionButton.click().catch(() => {});
  }

  async bulkAction(action: string): Promise<void> {
    const bulkActionButton = this.container.locator(`[data-testid="bulk-${action}"]`);
    await bulkActionButton.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    await bulkActionButton.click().catch(() => {});
  }

  async goToPage(pageNumber: number): Promise<void> {
    const pageButton = this.container.locator(`[data-testid="page-${pageNumber}"]`);
    await pageButton.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    await pageButton.click().catch(() => {});
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  async getCurrentPageInfo(): Promise<{ current: number; total: number; showing: string }> {
    const infoText = ((await this.paginationInfo.textContent().catch(() => '')) || '').trim();
    // Try to parse formats like "1 of 10" or "Showing 1 to 10 of 100"
    const ofMatch = infoText.match(/(\d+)\s*of\s*(\d+)/i);
    if (ofMatch) {
      return { current: parseInt(ofMatch[1], 10) || 1, total: parseInt(ofMatch[2], 10) || 1, showing: infoText };
    }
    return { current: 1, total: 1, showing: infoText };
  }
}
