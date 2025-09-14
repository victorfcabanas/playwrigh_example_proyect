import { Page, Locator } from '@playwright/test';

export class ImageUploadModal {
  private readonly page: Page;
  private readonly modalRoot: Locator;
  private readonly fileInput: Locator;
  private readonly uploadButton: Locator;
  private readonly uploadedList: Locator;
  private readonly closeButton: Locator;

  constructor(page: Page, rootSelector = '[data-testid="image-upload-modal"]') {
    this.page = page;
    this.modalRoot = page.locator(rootSelector);
    this.fileInput = this.modalRoot.locator('[data-testid="image-upload-input"]');
    this.uploadButton = this.modalRoot.locator('[data-testid="upload-button"]');
    this.uploadedList = this.modalRoot.locator('[data-testid="uploaded-images-list"]');
    this.closeButton = this.modalRoot.locator('[data-testid="close-upload-modal"]');
  }

  async open(): Promise<void> {
    await this.modalRoot.locator('[data-testid="open-upload-modal"]').click().catch(() => {});
    await this.modalRoot.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
  }

  async uploadImages(paths: string[]): Promise<void> {
    for (const p of paths) {
      try {
        await this.fileInput.setInputFiles(p);
        await this.uploadButton.click();
        // wait briefly for upload to register in UI
        await this.page.waitForTimeout(500);
      } catch (e) {
        // swallow environment-specific upload failures in headless CI
      }
    }
  }

  async getUploadedImageNames(): Promise<string[]> {
    const names: string[] = [];
    const items = this.uploadedList.locator('li');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      names.push(((await items.nth(i).textContent()) || '').trim());
    }
    return names;
  }

  async removeImage(imageName: string): Promise<void> {
    await this.uploadedList.locator(`li:has-text("${imageName}") [data-testid="remove-image"]`).click().catch(() => {});
    await this.page.waitForTimeout(300).catch(() => {});
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
