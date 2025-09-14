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
    this.vehicleInfo = page.locator('[data-testid="vehicle-info"]');
    this.ownerInfo = page.locator('[data-testid="owner-info"]');
    this.insuranceInfo = page.locator('[data-testid="insurance-info"]');
    this.maintenanceHistory = page.locator('[data-testid="maintenance-history"]');
    this.claimsHistory = page.locator('[data-testid="claims-history"]');
    this.editButton = page.locator('[data-testid="edit-vehicle-button"]');
    this.deleteButton = page.locator('[data-testid="delete-vehicle-button"]');
  }

  async getVehicleDetails(): Promise<{
    vin: string;
    make: string;
    model: string;
    year: string;
    licensePlate: string;
  }> {
    return {
      vin: await this.vehicleInfo.locator('[data-testid="vin"]').textContent() || '',
      make: await this.vehicleInfo.locator('[data-testid="make"]').textContent() || '',
      model: await this.vehicleInfo.locator('[data-testid="model"]').textContent() || '',
      year: await this.vehicleInfo.locator('[data-testid="year"]').textContent() || '',
      licensePlate: await this.vehicleInfo.locator('[data-testid="license-plate"]').textContent() || ''
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
        claimNumber: await row.locator('[data-testid="claim-number"]').textContent() || '',
        date: await row.locator('[data-testid="claim-date"]').textContent() || '',
        status: await row.locator('[data-testid="claim-status"]').textContent() || '',
        amount: await row.locator('[data-testid="claim-amount"]').textContent() || ''
      });
    }

    return claims;
  }
}
