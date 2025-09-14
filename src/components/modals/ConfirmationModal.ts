import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';

export class ConfirmationModal extends BaseComponent {
  private readonly yesButton: Locator;
  private readonly noButton: Locator;
  private readonly message: Locator;

  constructor(page: Page) {
    super(page, '[data-testid="confirmation-modal"]');
    this.yesButton = this.container.locator('[data-testid="confirm-yes"]');
    this.noButton = this.container.locator('[data-testid="confirm-no"]');
    this.message = this.container.locator('[data-testid="confirm-message"]');
  }

  async confirm(): Promise<void> {
    await this.yesButton.click().catch(() => {});
    await this.container.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
  }

  async cancel(): Promise<void> {
    await this.noButton.click().catch(() => {});
    await this.container.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
  }

  async getMessage(): Promise<string> {
    return ((await this.message.textContent()) || '').trim();
  }
}
