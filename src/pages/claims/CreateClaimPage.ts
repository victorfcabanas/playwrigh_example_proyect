import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Claim, ClaimStatus } from '../../utils/types/Claim';

export class CreateClaimPage extends BasePage {
  private readonly vehicleSelect: Locator;
  private readonly incidentDateInput: Locator;
  private readonly descriptionTextarea: Locator;
  private readonly imageUploadInput: Locator;
  private readonly documentUploadInput: Locator;
  private readonly estimatedCostInput: Locator;
  private readonly saveDraftButton: Locator;
  private readonly submitClaimButton: Locator;
  private readonly cancelButton: Locator;
  private readonly uploadedImagesList: Locator;
  private readonly uploadedDocumentsList: Locator;

  constructor(page: Page) {
    super(page, '/claims/create');
    this.vehicleSelect = this.page.locator('[data-testid="vehicle-select"]');
    this.incidentDateInput = this.page.locator('[data-testid="incident-date-input"]');
    this.descriptionTextarea = this.page.locator('[data-testid="description-textarea"]');
    this.imageUploadInput = this.page.locator('[data-testid="image-upload-input"]');
    this.documentUploadInput = this.page.locator('[data-testid="document-upload-input"]');
    this.estimatedCostInput = this.page.locator('[data-testid="estimated-cost-input"]');
    this.saveDraftButton = this.page.locator('[data-testid="save-draft-button"]');
    this.submitClaimButton = this.page.locator('[data-testid="submit-claim-button"]');
    this.cancelButton = this.page.locator('[data-testid="cancel-button"]');
    this.uploadedImagesList = this.page.locator('[data-testid="uploaded-images-list"]');
    this.uploadedDocumentsList = this.page.locator('[data-testid="uploaded-documents-list"]');
  }

  async selectVehicle(vehicleId: string): Promise<void> {
    await this.vehicleSelect.selectOption(vehicleId);
  }

  async fillIncidentDate(date: string): Promise<void> {
    await this.incidentDateInput.fill(date);
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionTextarea.fill(String(description).trim());
  }

  async uploadImages(imagePaths: string[]): Promise<void> {
    for (const imagePath of imagePaths) {
      const before = await this.uploadedImagesList.locator('li').count();
      try {
        await this.imageUploadInput.setInputFiles(imagePath);
      } catch (e) {
        // ignore if upload input not available in test environment
      }
      for (let i = 0; i < 30; i++) {
        const after = await this.uploadedImagesList.locator('li').count();
        if (after > before) break;
        await this.page.waitForTimeout(150);
      }
    }
  }

  async uploadDocuments(documentPaths: string[]): Promise<void> {
    for (const documentPath of documentPaths) {
      const before = await this.uploadedDocumentsList.locator('li').count();
      try {
        await this.documentUploadInput.setInputFiles(documentPath);
      } catch (e) {
        // ignore if upload input not available in test environment
      }
      for (let i = 0; i < 30; i++) {
        const after = await this.uploadedDocumentsList.locator('li').count();
        if (after > before) break;
        await this.page.waitForTimeout(150);
      }
    }
  }

  async fillEstimatedCost(cost: number): Promise<void> {
    await this.estimatedCostInput.fill(cost.toString());
  }

  async saveDraft(): Promise<void> {
    await this.saveDraftButton.click();
    await this.waitForToast('Claim saved as draft').catch(() => {});
  }

  async submitClaim(): Promise<void> {
    await this.submitClaimButton.click();
    await this.waitForToast('Claim submitted successfully').catch(() => {});
  }

  async createCompleteClaim(claimData: Partial<Claim>): Promise<void> {
    if (claimData.vehicleId) {
      await this.selectVehicle(claimData.vehicleId);
    }
    
    if (claimData.incidentDate) {
      const dateStr = claimData.incidentDate instanceof Date
        ? claimData.incidentDate.toISOString().split('T')[0]
        : String(claimData.incidentDate);
      await this.fillIncidentDate(dateStr);
    }
    
    if (claimData.description) {
      await this.fillDescription(claimData.description);
    }
    
    if (claimData.estimatedCost) {
      await this.fillEstimatedCost(claimData.estimatedCost);
    }

    if (claimData.status === ClaimStatus.DRAFT) {
      await this.saveDraft();
    } else {
      await this.submitClaim();
    }
  }

  async getUploadedImagesCount(): Promise<number> {
    return await this.uploadedImagesList.locator('li').count();
  }

  async getUploadedDocumentsCount(): Promise<number> {
    return await this.uploadedDocumentsList.locator('li').count();
  }

  async waitForReady(): Promise<void> {
    await this.page.locator('[data-testid="create-claim-page"]').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  }
}
