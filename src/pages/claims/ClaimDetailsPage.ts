import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { ClaimStatus } from '../../utils/enums/ClaimStatus';
import { safeText, safeClick, parseFirstInt } from '../../utils/fileHelper';

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
      number: await safeText(this.claimNumber),
      status: await safeText(this.claimStatus),
      customer: await safeText(this.customerInfo.locator('[data-testid="customer-name"]')),
      vehicle: await safeText(this.vehicleInfo.locator('[data-testid="vehicle-info-text"]')),
      incidentDate: await safeText(this.incidentDetails.locator('[data-testid="incident-date"]')),
      estimatedCost: await safeText(this.incidentDetails.locator('[data-testid="estimated-cost"]'))
    };
  }

  async changeStatus(newStatus: ClaimStatus): Promise<void> {
  const statusButton = this.page.locator(`[data-testid="change-status-${newStatus.toLowerCase()}"]`);
  await safeClick(statusButton, 3000);
    
    if (newStatus === ClaimStatus.REJECTED) {
      await this.page.locator('[data-testid="rejection-reason-textarea"]').fill('Claim rejected due to policy violation').catch(() => {});
    }
    
  await safeClick(this.page.locator('[data-testid="confirm-status-change"]'), 3000);
  await this.waitForToast('Status updated successfully', 5000).catch(() => {});
  }

  async assignWorkshop(workshopId: string): Promise<void> {
  await safeClick(this.assignWorkshopButton, 3000);
  await this.page.locator('[data-testid="workshop-select"]').selectOption(workshopId).catch(() => {});
  await safeClick(this.page.locator('[data-testid="confirm-assignment"]'), 3000);
  await this.waitForToast('Workshop assigned successfully', 5000).catch(() => {});
  }

  async addComment(comment: string, isInternal: boolean = false): Promise<void> {
  await safeClick(this.addCommentButton, 2000);
  await this.page.locator('[data-testid="comment-textarea"]').fill(comment).catch(() => {});
    
    if (isInternal) {
      await this.page.locator('[data-testid="internal-comment-checkbox"]').check();
    }
    
  await safeClick(this.page.locator('[data-testid="submit-comment"]'), 2000);
  await this.waitForToast('Comment added successfully', 5000).catch(() => {});
  }

  async getTimelineEvents(): Promise<Array<{
    event: string;
    timestamp: string;
    user: string;
  }>> {
  const events: Array<{ event: string; timestamp: string; user: string }> = [];
  const timelineItems = this.timelineSection.locator('[data-testid="timeline-item"]');
  const count = await timelineItems.count();

    for (let i = 0; i < count; i++) {
      const item = timelineItems.nth(i);
      const event = await safeText(item.locator('[data-testid="event-description"]'));
      const timestamp = await safeText(item.locator('[data-testid="event-timestamp"]'));
      const user = await safeText(item.locator('[data-testid="event-user"]'));

      events.push({ event, timestamp, user });
    }

    return events;
  }

  async downloadDocument(documentName: string): Promise<void> {
    const documentLink = this.documentsSection.locator(`[data-document-name="${documentName}"]`);
    await safeClick(documentLink, 2000);
    // best-effort wait for download to start
    await this.page.waitForTimeout(1000).catch(() => {});
  }

  async viewImage(imageIndex: number): Promise<void> {
    const imageThumb = this.imagesGallery.locator('[data-testid="image-thumbnail"]').nth(imageIndex);
    await safeClick(imageThumb, 2000);
    // Wait for modal to open
    await this.page.locator('[data-testid="image-modal"]').waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
  }

  async waitForReady(): Promise<void> {
    await this.page.locator('[data-testid="claim-details-page"]').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  }
}
