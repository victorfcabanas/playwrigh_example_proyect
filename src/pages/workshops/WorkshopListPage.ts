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
    this.searchInput = page.locator('[data-testid="workshop-search-input"]');
    this.filterByLocation = page.locator('[data-testid="filter-location"]');
    this.filterBySpecialization = page.locator('[data-testid="filter-specialization"]');
    this.sortBySelect = page.locator('[data-testid="sort-by-select"]');
    this.workshopCards = page.locator('[data-testid="workshop-card"]');
    this.paginationNext = page.locator('[data-testid="pagination-next"]');
    this.paginationPrevious = page.locator('[data-testid="pagination-previous"]');
    this.resultsCount = page.locator('[data-testid="results-count"]');
  }

  async searchWorkshops(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.waitForPageLoad();
  }

  async filterByLocation(location: string): Promise<void> {
    await this.filterByLocation.selectOption(location);
    await this.waitForPageLoad();
  }

  async filterBySpecialization(specialization: string): Promise<void> {
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
    await workshopCard.click();
  }

  async getResultsCount(): Promise<number> {
    const text = await this.resultsCount.textContent();
    const match = text?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  async goToNextPage(): Promise<void> {
    if (await this.paginationNext.isEnabled()) {
      await this.paginationNext.click();
      await this.waitForPageLoad();
    }
  }
}
