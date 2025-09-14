import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';

export class VehicleForm extends BaseComponent {
  private readonly vinInput: Locator;
  private readonly licensePlateInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page, '[data-testid="vehicle-form"]');
    this.vinInput = this.container.locator('[data-testid="vin-input"]');
    this.licensePlateInput = this.container.locator('[data-testid="license-plate-input"]');
    this.submitButton = this.container.locator('[data-testid="submit-vehicle"]');
  }

  async fillVehicleDetails(vin: string, plate: string): Promise<void> {
    await this.vinInput.fill(vin);
    await this.licensePlateInput.fill(plate);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async clear(): Promise<void> {
    await this.vinInput.fill('');
    await this.licensePlateInput.fill('');
  }

  async waitForReady(): Promise<void> {
    await this.container.waitFor({ state: 'visible' });
  }
}
