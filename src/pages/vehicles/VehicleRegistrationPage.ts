import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class VehicleRegistrationPage extends BasePage {
  private readonly vinInput: Locator;
  private readonly licensePlateInput: Locator;
  private readonly makeInput: Locator;
  private readonly modelInput: Locator;
  private readonly yearInput: Locator;
  private readonly colorInput: Locator;
  private readonly submitButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page, '/vehicles/register');
    this.vinInput = page.locator('[data-testid="vin-input"]');
    this.licensePlateInput = page.locator('[data-testid="license-input"]');
    this.makeInput = page.locator('[data-testid="make-input"]');
    this.modelInput = page.locator('[data-testid="model-input"]');
    this.yearInput = page.locator('[data-testid="year-input"]');
    this.colorInput = page.locator('[data-testid="color-input"]');
    this.submitButton = page.locator('[data-testid="submit-vehicle"]');
    this.cancelButton = page.locator('[data-testid="cancel-vehicle"]');
  }

  async fillVehicleForm(data: { vin?: string; licensePlate?: string; make?: string; model?: string; year?: number; color?: string }): Promise<void> {
    if (data.vin) await this.vinInput.fill(data.vin);
    if (data.licensePlate) await this.licensePlateInput.fill(data.licensePlate);
    if (data.make) await this.makeInput.fill(data.make);
    if (data.model) await this.modelInput.fill(data.model);
    if (data.year) await this.yearInput.fill(String(data.year));
    if (data.color) await this.colorInput.fill(data.color);
  }

  async submitRegistration(): Promise<void> {
    await this.submitButton.click();
    await this.waitForToast('Vehicle registered successfully');
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
