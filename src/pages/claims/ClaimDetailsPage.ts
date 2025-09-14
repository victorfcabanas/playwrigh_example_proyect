import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { ClaimStatus } from '../../utils/enums/ClaimStatus';

export class ClaimDetailsPage extends BasePage {
  private readonly claimNumber: Locator;
  private readonly claimStatus: Locator;
  private readonly customerInfo: Locator;
  private readonly vehicleInfo: Locator;
  private readonly incidentDetails: Locator;
  private readonly imagesGallery: Locator;
  private readonly documentsSection: Locator;
  private readonly timelineSection: Locator;
  private readonly commentsSection: Locator;
  private readonly statusChangeButtons: Locator;
  private readonly assignWorkshopButton: Locator;
  private readonly addCommentButton: Locator;
  private readonly editClaimButton: Locator;

  constructor(page: Page) {
    super(page);
    this.claimNumber = this.page.locator('[data-testid="claim-number"]');
    this.claimStatus = this.page.locator('[data-testid="claim-status"]');
    this.customerInfo = this.page.locator('[data-testid="customer-info"]');
    this.vehicleInfo = this.page.locator('[data-testid="vehicle-info"]');
    this.incidentDetails = this.page.locator('[data-testid="incident-details"]');
    this.imagesGallery = this.page.locator('[data-testid="images-gallery"]');
    this.documentsSection = this.page.locator('[data-testid="documents-section"]');
    this.timelineSection = this.page.locator('[data-testid="timeline-section"]');
    this.commentsSection = this.page.locator('[data-testid="comments-section"]');
    this.statusChangeButtons = this.page.locator('[data-testid*="status-change"]');
    this.assignWorkshopButton = this.page.locator('[data-testid="assign-workshop-button"]');
    this.addCommentButton = this.page.locator('[data-testid="add-comment-button"]');
    this.editClaimButton = this.page.locator('[data-testid="edit-claim-button"]');
  }

  async getClaimDetails(): Promise<{
    number: string;
    status: string;
    customer: string;
    vehicle: string;
    incidentDate: string;
    estimatedCost: string;
  }> {
    return {
      number: (await this.claimNumber.textContent() || '').trim(),
      status: (await this.claimStatus.textContent() || '').trim(),
      customer: (await this.customerInfo.locator('[data-testid="customer-name"]').textContent() || '').trim(),
      vehicle: (await this.vehicleInfo.locator('[data-testid="vehicle-info-text"]').textContent() || '').trim(),
      incidentDate: (await this.incidentDetails.locator('[data-testid="incident-date"]').textContent() || '').trim(),
      estimatedCost: (await this.incidentDetails.locator('[data-testid="estimated-cost"]').textContent() || '').trim()
    };
  }

  async changeStatus(newStatus: ClaimStatus): Promise<void> {
    const statusButton = this.page.locator(`[data-testid="change-status-${newStatus.toLowerCase()}"]`);
    await statusButton.click();
    
    if (newStatus === ClaimStatus.REJECTED) {
      await this.page.locator('[data-testid="rejection-reason-textarea"]')
        .fill('Claim rejected due to policy violation');
    }
    
    await this.page.locator('[data-testid="confirm-status-change"]').click();
    await this.waitForToast('Status updated successfully');
  }

  async assignWorkshop(workshopId: string): Promise<void> {
    await this.assignWorkshopButton.click();
    await this.page.locator('[data-testid="workshop-select"]').selectOption(workshopId);
    await this.page.locator('[data-testid="confirm-assignment"]').click();
    await this.waitForToast('Workshop assigned successfully');
  }

  async addComment(comment: string, isInternal: boolean = false): Promise<void> {
    await this.addCommentButton.click();
    await this.page.locator('[data-testid="comment-textarea"]').fill(comment);
    
    if (isInternal) {
      await this.page.locator('[data-testid="internal-comment-checkbox"]').check();
    }
    
    await this.page.locator('[data-testid="submit-comment"]').click();
    await this.waitForToast('Comment added successfully');
  }

  async getTimelineEvents(): Promise<Array<{
    event: string;
    timestamp: string;
    user: string;
  }>> {
  const events = [];
  const timelineItems = this.timelineSection.locator('[data-testid="timeline-item"]');
  const count = await timelineItems.count();

    for (let i = 0; i < count; i++) {
      const item = timelineItems.nth(i);
      const event = (await item.locator('[data-testid="event-description"]').textContent() || '').trim();
      const timestamp = (await item.locator('[data-testid="event-timestamp"]').textContent() || '').trim();
      const user = (await item.locator('[data-testid="event-user"]').textContent() || '').trim();

      events.push({ event, timestamp, user });
    }

    return events;
  }

  async downloadDocument(documentName: string): Promise<void> {
    const documentLink = this.documentsSection.locator(`[data-document-name="${documentName}"]`);
    await documentLink.click();
    
    // Wait for download to start
    await this.page.waitForTimeout(1000);
  }

  async viewImage(imageIndex: number): Promise<void> {
    const imageThumb = this.imagesGallery.locator('[data-testid="image-thumbnail"]').nth(imageIndex);
    await imageThumb.click();
    
    // Wait for modal to open
    await this.page.locator('[data-testid="image-modal"]').waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
  }

  async waitForReady(): Promise<void> {
    await this.page.locator('[data-testid="claim-details-page"]').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  }
}
