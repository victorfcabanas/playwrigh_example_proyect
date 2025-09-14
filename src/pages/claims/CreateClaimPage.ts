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
    this.vehicleSelect = page.locator('[data-testid="vehicle-select"]');
    this.incidentDateInput = page.locator('[data-testid="incident-date-input"]');
    this.descriptionTextarea = page.locator('[data-testid="description-textarea"]');
    this.imageUploadInput = page.locator('[data-testid="image-upload-input"]');
    this.documentUploadInput = page.locator('[data-testid="document-upload-input"]');
    this.estimatedCostInput = page.locator('[data-testid="estimated-cost-input"]');
    this.saveDraftButton = page.locator('[data-testid="save-draft-button"]');
    this.submitClaimButton = page.locator('[data-testid="submit-claim-button"]');
    this.cancelButton = page.locator('[data-testid="cancel-button"]');
    this.uploadedImagesList = page.locator('[data-testid="uploaded-images-list"]');
    this.uploadedDocumentsList = page.locator('[data-testid="uploaded-documents-list"]');
  }

  async selectVehicle(vehicleId: string): Promise<void> {
    await this.vehicleSelect.selectOption(vehicleId);
  }

  async fillIncidentDate(date: string): Promise<void> {
    await this.incidentDateInput.fill(date);
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionTextarea.fill(description);
  }

  async uploadImages(imagePaths: string[]): Promise<void> {
    for (const imagePath of imagePaths) {
      await this.imageUploadInput.setInputFiles(imagePath);
      await this.page.waitForTimeout(1000); // Wait for upload
    }
  }

  async uploadDocuments(documentPaths: string[]): Promise<void> {
    for (const documentPath of documentPaths) {
      await this.documentUploadInput.setInputFiles(documentPath);
      await this.page.waitForTimeout(1000); // Wait for upload
    }
  }

  async fillEstimatedCost(cost: number): Promise<void> {
    await this.estimatedCostInput.fill(cost.toString());
  }

  async saveDraft(): Promise<void> {
    await this.saveDraftButton.click();
    await this.waitForToast('Claim saved as draft');
  }

  async submitClaim(): Promise<void> {
    await this.submitClaimButton.click();
    await this.waitForToast('Claim submitted successfully');
  }

  async createCompleteClaim(claimData: Partial<Claim>): Promise<void> {
    if (claimData.vehicleId) {
      await this.selectVehicle(claimData.vehicleId);
    }
    
    if (claimData.incidentDate) {
      await this.fillIncidentDate(claimData.incidentDate.toISOString().split('T')[0]);
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
}
