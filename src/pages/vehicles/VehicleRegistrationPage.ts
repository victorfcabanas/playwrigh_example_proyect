import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Vehicle, VehicleType } from '../../utils/types/Vehicle';

export class VehicleRegistrationPage extends BasePage {
  private readonly vinInput: Locator;
  private readonly licensePlateInput: Locator;
  private readonly makeSelect: Locator;
  private readonly modelInput: Locator;
  private readonly yearSelect: Locator;
  private readonly typeSelect: Locator;
  private readonly colorInput: Locator;
  private readonly mileageInput: Locator;
  private readonly insurancePolicyInput: Locator;
  private readonly registerButton: Locator;
  private readonly cancelButton: Locator;
  private readonly vinValidationStatus: Locator;

  constructor(page: Page) {
    super(page, '/vehicles/register');
    this.vinInput = this.page.locator('[data-testid="vin-input"]');
    this.licensePlateInput = this.page.locator('[data-testid="license-plate-input"]');
    this.makeSelect = this.page.locator('[data-testid="make-select"]');
    this.modelInput = this.page.locator('[data-testid="model-input"]');
    this.yearSelect = this.page.locator('[data-testid="year-select"]');
    this.typeSelect = this.page.locator('[data-testid="type-select"]');
    this.colorInput = this.page.locator('[data-testid="color-input"]');
    this.mileageInput = this.page.locator('[data-testid="mileage-input"]');
    this.insurancePolicyInput = this.page.locator('[data-testid="insurance-policy-input"]');
    this.registerButton = this.page.locator('[data-testid="register-button"]');
    this.cancelButton = this.page.locator('[data-testid="cancel-button"]');
    this.vinValidationStatus = this.page.locator('[data-testid="vin-validation-status"]');
  }

  async registerVehicle(vehicleData: Partial<Vehicle>): Promise<void> {
    if (vehicleData.vin) {
      await this.vinInput.fill(vehicleData.vin);
      await this.waitForVinValidation();
    }

    if (vehicleData.licensePlate) {
      await this.licensePlateInput.fill(vehicleData.licensePlate);
    }

    if (vehicleData.make) {
      await this.makeSelect.selectOption(String(vehicleData.make));
    }

    if (vehicleData.model) {
      await this.modelInput.fill(vehicleData.model as string);
    }

    if (vehicleData.year) {
      await this.yearSelect.selectOption(String(vehicleData.year));
    }

    if (vehicleData.type) {
      await this.typeSelect.selectOption(String(vehicleData.type));
    }

    if (vehicleData.color) {
      await this.colorInput.fill(vehicleData.color as string);
    }

    if (vehicleData.insurancePolicyNumber) {
      await this.insurancePolicyInput.fill(vehicleData.insurancePolicyNumber as string);
    }

    await this.registerButton.click();
    await this.waitForToast('Vehicle registered successfully');
  }

  private async waitForVinValidation(): Promise<void> {
    await this.vinValidationStatus.waitFor({ state: 'visible' }).catch(() => {});
    // Poll the element text until non-empty or timeout
    const maxAttempts = 20;
    const delay = 100; // ms
    for (let i = 0; i < maxAttempts; i++) {
      const txt = (await this.vinValidationStatus.textContent()) || '';
      if (txt.trim().length > 0) return;
      await this.page.waitForTimeout(delay);
    }
  }

  async getVinValidationMessage(): Promise<string> {
    return ((await this.vinValidationStatus.textContent()) || '').trim();
  }

  async waitForReady(): Promise<void> {
    await this.page.locator('[data-testid="vehicle-registration-page"]').waitFor({ state: 'visible' }).catch(() => {});
  }
}
