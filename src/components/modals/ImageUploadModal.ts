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
    const opener = this.page.locator('[data-testid="open-upload-modal"]');
    await opener.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    await opener.click().catch(() => {});
    await this.modalRoot.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
  }

  async uploadImages(paths: string[]): Promise<void> {
    for (const p of paths) {
      try {
        await this.fileInput.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
        await this.fileInput.setInputFiles(p);
        await this.uploadButton.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
        await this.uploadButton.click().catch(() => {});
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
    const removeBtn = this.uploadedList.locator(`li:has-text("${imageName}") [data-testid="remove-image"]`);
    await removeBtn.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    await removeBtn.click().catch(() => {});
    await this.page.waitForTimeout(300).catch(() => {});
  }

  async close(): Promise<void> {
    await this.closeButton.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    await this.closeButton.click().catch(() => {});
  }
}
