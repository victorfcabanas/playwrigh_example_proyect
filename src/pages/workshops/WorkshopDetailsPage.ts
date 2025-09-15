import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { safeText, safeClick } from '../../utils/fileHelper';

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
    this.nameHeader = this.page.locator('[data-testid="workshop-name"]');
    this.addressBlock = this.page.locator('[data-testid="workshop-address"]');
    this.contactInfo = this.page.locator('[data-testid="workshop-contact"]');
    this.specializationsList = this.page.locator('[data-testid="workshop-specializations"]');
    this.capacityInfo = this.page.locator('[data-testid="workshop-capacity"]');
    this.performanceMetrics = this.page.locator('[data-testid="workshop-performance"]');
    this.assignClaimButton = this.page.locator('[data-testid="assign-claim-button"]');
    this.editWorkshopButton = this.page.locator('[data-testid="edit-workshop-button"]');
  }

  async getWorkshopName(): Promise<string> {
    return await safeText(this.nameHeader);
  }

  async getAddress(): Promise<string> {
    return await safeText(this.addressBlock);
  }

  async getContactInfo(): Promise<string> {
    return await safeText(this.contactInfo);
  }

  async getSpecializations(): Promise<string[]> {
    const items = this.specializationsList.locator('li');
    const result: string[] = [];
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      result.push(await safeText(items.nth(i)));
    }
    return result;
  }

  async assignClaim(claimId: string): Promise<void> {
    await safeClick(this.assignClaimButton, 4000);
    await this.page.locator('[data-testid="claim-selector"]').selectOption(claimId).catch(() => {});
    await safeClick(this.page.locator('[data-testid="confirm-assign"]'), 4000);
    await this.waitForToast('Claim assigned to workshop', 5000).catch(() => {});
  }

  async editWorkshop(): Promise<void> {
    await safeClick(this.editWorkshopButton, 3000);
  }
}
