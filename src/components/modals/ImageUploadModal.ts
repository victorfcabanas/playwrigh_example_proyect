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
    await this.modalRoot.locator('[data-testid="open-upload-modal"]').click();
    await this.modalRoot.waitFor();
  }

  async uploadImages(paths: string[]): Promise<void> {
    for (const p of paths) {
      await this.fileInput.setInputFiles(p);
      await this.uploadButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  async getUploadedImageNames(): Promise<string[]> {
    const names: string[] = [];
    const items = this.uploadedList.locator('li');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      names.push((await items.nth(i).textContent()) || '');
    }
    return names;
  }

  async removeImage(imageName: string): Promise<void> {
    await this.uploadedList.locator(`li:has-text("${imageName}") [data-testid="remove-image"]`).click();
    await this.page.waitForTimeout(300);
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
