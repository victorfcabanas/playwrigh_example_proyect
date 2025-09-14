import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';

export class WorkshopForm extends BaseComponent {
  private readonly nameInput: Locator;
  private readonly addressInput: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    super(page, '[data-testid="workshop-form"]');
    this.nameInput = this.container.locator('[data-testid="workshop-name"]');
    this.addressInput = this.container.locator('[data-testid="workshop-address"]');
    this.saveButton = this.container.locator('[data-testid="save-workshop"]');
  }

  async fillWorkshopDetails(name: string, address: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.addressInput.fill(address);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async clear(): Promise<void> {
    await this.nameInput.fill('');
    await this.addressInput.fill('');
  }

  async waitForReady(): Promise<void> {
    await this.container.waitFor({ state: 'visible' });
  }
}
