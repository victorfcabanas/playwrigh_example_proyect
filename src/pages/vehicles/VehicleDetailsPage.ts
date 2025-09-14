import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class VehicleDetailsPage extends BasePage {
  private readonly vinField: Locator;
  private readonly ownerInfo: Locator;
  private readonly registrationDetails: Locator;
  private readonly insuranceInfo: Locator;
  private readonly serviceHistory: Locator;

  constructor(page: Page) {
    super(page, '/vehicles/details');
    this.vinField = page.locator('[data-testid="vehicle-vin"]');
    this.ownerInfo = page.locator('[data-testid="owner-info"]');
    this.registrationDetails = page.locator('[data-testid="registration-details"]');
    this.insuranceInfo = page.locator('[data-testid="insurance-info"]');
    this.serviceHistory = page.locator('[data-testid="service-history"]');
  }

  async getVin(): Promise<string> {
    return await this.vinField.textContent() || '';
  }

  async getOwnerInfo(): Promise<string> {
    return await this.ownerInfo.textContent() || '';
  }

  async getRegistrationDetails(): Promise<string> {
    return await this.registrationDetails.textContent() || '';
  }

  async getInsuranceInfo(): Promise<string> {
    return await this.insuranceInfo.textContent() || '';
  }

  async getServiceHistory(): Promise<string[]> {
    const items = this.serviceHistory.locator('li');
    const result: string[] = [];
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      result.push((await items.nth(i).textContent()) || '');
    }
    return result;
  }
}
