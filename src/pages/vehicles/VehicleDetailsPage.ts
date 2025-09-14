import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class VehicleDetailsPage extends BasePage {
  private readonly vehicleInfo: Locator;
  private readonly ownerInfo: Locator;
  private readonly insuranceInfo: Locator;
  private readonly maintenanceHistory: Locator;
  private readonly claimsHistory: Locator;
  private readonly editButton: Locator;
  private readonly deleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.vehicleInfo = this.page.locator('[data-testid="vehicle-info"]');
    this.ownerInfo = this.page.locator('[data-testid="owner-info"]');
    this.insuranceInfo = this.page.locator('[data-testid="insurance-info"]');
    this.maintenanceHistory = this.page.locator('[data-testid="maintenance-history"]');
    this.claimsHistory = this.page.locator('[data-testid="claims-history"]');
    this.editButton = this.page.locator('[data-testid="edit-vehicle-button"]');
    this.deleteButton = this.page.locator('[data-testid="delete-vehicle-button"]');
  }

  async getVehicleDetails(): Promise<{
    vin: string;
    make: string;
    model: string;
    year: string;
    licensePlate: string;
  }> {
    return {
      vin: (await this.vehicleInfo.locator('[data-testid="vin"]').textContent() || '').trim(),
      make: (await this.vehicleInfo.locator('[data-testid="make"]').textContent() || '').trim(),
      model: (await this.vehicleInfo.locator('[data-testid="model"]').textContent() || '').trim(),
      year: (await this.vehicleInfo.locator('[data-testid="year"]').textContent() || '').trim(),
      licensePlate: (await this.vehicleInfo.locator('[data-testid="license-plate"]').textContent() || '').trim()
    };
  }

  async getClaimsHistory(): Promise<Array<{
    claimNumber: string;
    date: string;
    status: string;
    amount: string;
  }>> {
    const claims = [];
    const claimRows = this.claimsHistory.locator('[data-testid="claim-row"]');
    const count = await claimRows.count();

    for (let i = 0; i < count; i++) {
      const row = claimRows.nth(i);
      claims.push({
        claimNumber: (await row.locator('[data-testid="claim-number"]').textContent() || '').trim(),
        date: (await row.locator('[data-testid="claim-date"]').textContent() || '').trim(),
        status: (await row.locator('[data-testid="claim-status"]').textContent() || '').trim(),
        amount: (await row.locator('[data-testid="claim-amount"]').textContent() || '').trim()
      });
    }

    return claims;
  }

  async waitForReady(): Promise<void> {
    await this.page.locator('[data-testid="vehicle-details-page"]').waitFor({ state: 'visible' }).catch(() => {});
  }
}
