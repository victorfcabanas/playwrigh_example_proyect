import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class WorkshopDetailsPage extends BasePage {
  private readonly nameHeader: Locator;
  private readonly addressBlock: Locator;
  private readonly contactInfo: Locator;
  private readonly specializationsList: Locator;
  private readonly capacityInfo: Locator;
  private readonly performanceMetrics: Locator;
  private readonly assignClaimButton: Locator;
  private readonly editWorkshopButton: Locator;

  constructor(page: Page) {
    super(page, '/workshops/details');
    this.nameHeader = page.locator('[data-testid="workshop-name"]');
    this.addressBlock = page.locator('[data-testid="workshop-address"]');
    this.contactInfo = page.locator('[data-testid="workshop-contact"]');
    this.specializationsList = page.locator('[data-testid="workshop-specializations"]');
    this.capacityInfo = page.locator('[data-testid="workshop-capacity"]');
    this.performanceMetrics = page.locator('[data-testid="workshop-performance"]');
    this.assignClaimButton = page.locator('[data-testid="assign-claim-button"]');
    this.editWorkshopButton = page.locator('[data-testid="edit-workshop-button"]');
  }

  async getWorkshopName(): Promise<string> {
    return await this.nameHeader.textContent() || '';
  }

  async getAddress(): Promise<string> {
    return await this.addressBlock.textContent() || '';
  }

  async getContactInfo(): Promise<string> {
    return await this.contactInfo.textContent() || '';
  }

  async getSpecializations(): Promise<string[]> {
    const items = this.specializationsList.locator('li');
    const result: string[] = [];
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      result.push((await items.nth(i).textContent()) || '');
    }
    return result;
  }

  async assignClaim(claimId: string): Promise<void> {
    await this.assignClaimButton.click();
    await this.page.locator('[data-testid="claim-selector"]').selectOption(claimId);
    await this.page.locator('[data-testid="confirm-assign"]').click();
    await this.waitForToast('Claim assigned to workshop');
  }

  async editWorkshop(): Promise<void> {
    await this.editWorkshopButton.click();
  }
}
