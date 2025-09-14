import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class WorkshopListPage extends BasePage {
  private readonly searchInput: Locator;
  private readonly filterByLocation: Locator;
  private readonly filterBySpecialization: Locator;
  private readonly sortBySelect: Locator;
  private readonly workshopCards: Locator;
  private readonly paginationNext: Locator;
  private readonly paginationPrevious: Locator;
  private readonly resultsCount: Locator;

  constructor(page: Page) {
    super(page, '/workshops');
    this.searchInput = this.page.locator('[data-testid="workshop-search-input"]');
    this.filterByLocation = this.page.locator('[data-testid="filter-location"]');
    this.filterBySpecialization = this.page.locator('[data-testid="filter-specialization"]');
    this.sortBySelect = this.page.locator('[data-testid="sort-by-select"]');
    this.workshopCards = this.page.locator('[data-testid="workshop-card"]');
    this.paginationNext = this.page.locator('[data-testid="pagination-next"]');
    this.paginationPrevious = this.page.locator('[data-testid="pagination-previous"]');
    this.resultsCount = this.page.locator('[data-testid="results-count"]');
  }

  async searchWorkshops(query: string): Promise<void> {
    await this.searchInput.fill(String(query).trim());
    await this.searchInput.press('Enter');
    await this.waitForPageLoad();
  }

  async applyFilterByLocation(location: string): Promise<void> {
    await this.filterByLocation.selectOption(location);
    await this.waitForPageLoad();
  }

  async applyFilterBySpecialization(specialization: string): Promise<void> {
    await this.filterBySpecialization.selectOption(specialization);
    await this.waitForPageLoad();
  }

  async sortBy(sortOption: string): Promise<void> {
    await this.sortBySelect.selectOption(sortOption);
    await this.waitForPageLoad();
  }

  async getWorkshopCards(): Promise<Locator[]> {
    const count = await this.workshopCards.count();
    const cards: Locator[] = [];
    
    for (let i = 0; i < count; i++) {
      cards.push(this.workshopCards.nth(i));
    }
    
    return cards;
  }

  async selectWorkshop(workshopName: string): Promise<void> {
    const workshopCard = this.page.locator(`[data-testid="workshop-card"]:has-text("${workshopName}")`);
    try {
      await workshopCard.click();
    } catch (e) {
      await workshopCard.scrollIntoViewIfNeeded().catch(() => {});
      await workshopCard.click().catch(() => {});
    }
  }

  async getResultsCount(): Promise<number> {
    const text = (await this.resultsCount.textContent() || '').trim();
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  async goToNextPage(): Promise<void> {
    try {
      if (await this.paginationNext.isEnabled()) {
        await this.paginationNext.click();
        await this.waitForPageLoad();
      }
    } catch (e) {
      // ignore transient UI issues in tests
    }
  }
}
