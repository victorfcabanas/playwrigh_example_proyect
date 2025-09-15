import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { ClaimStatus } from '../../utils/enums/ClaimStatus';
import { safeClick, safeText, parseFirstInt } from '../../utils/fileHelper';

export class ClaimApprovalPage extends BasePage {
  private readonly pendingClaimsList: Locator;
  private readonly claimDetails: Locator;
  private readonly approveButton: Locator;
  private readonly rejectButton: Locator;
  private readonly requestMoreInfoButton: Locator;
  private readonly assignWorkshopButton: Locator;
  private readonly approvalNotes: Locator;
  private readonly rejectionReason: Locator;
  private readonly estimatedCostAdjustment: Locator;
  private readonly priorityLevel: Locator;

  constructor(page: Page) {
    super(page, '/claims/approval');
    this.pendingClaimsList = this.page.locator('[data-testid="pending-claims-list"]');
    this.claimDetails = this.page.locator('[data-testid="claim-details"]');
    this.approveButton = this.page.locator('[data-testid="approve-button"]');
    this.rejectButton = this.page.locator('[data-testid="reject-button"]');
    this.requestMoreInfoButton = this.page.locator('[data-testid="request-info-button"]');
    this.assignWorkshopButton = this.page.locator('[data-testid="assign-workshop-button"]');
    this.approvalNotes = this.page.locator('[data-testid="approval-notes"]');
    this.rejectionReason = this.page.locator('[data-testid="rejection-reason"]');
    this.estimatedCostAdjustment = this.page.locator('[data-testid="cost-adjustment"]');
    this.priorityLevel = this.page.locator('[data-testid="priority-level"]');
  }

  async selectClaimForReview(claimId: string): Promise<void> {
    await safeClick(this.pendingClaimsList.locator(`[data-claim-id="${claimId}"]`), 3000);
    await this.waitForReady();
  }

  async approveClaim(notes?: string, costAdjustment?: number): Promise<void> {
    if (notes) {
      await this.approvalNotes.fill(String(notes).trim()).catch(() => {});
    }

    if (costAdjustment) {
      await this.estimatedCostAdjustment.fill(costAdjustment.toString()).catch(() => {});
    }

    await safeClick(this.approveButton, 3000);
    await this.handleConfirmationModal(true);
    await this.waitForToast('Claim approved successfully', 5000).catch(() => {});
  }

  async rejectClaim(reason: string): Promise<void> {
    await this.rejectionReason.fill(String(reason).trim()).catch(() => {});
    await safeClick(this.rejectButton, 3000);
    await this.handleConfirmationModal(true);
    await this.waitForToast('Claim rejected', 5000).catch(() => {});
  }

  async requestMoreInformation(message: string): Promise<void> {
    await safeClick(this.requestMoreInfoButton, 3000);
    await this.page.locator('[data-testid="info-request-message"]').fill(String(message).trim()).catch(() => {});
    await safeClick(this.page.locator('[data-testid="send-request"]'), 3000);
    await this.waitForToast('Information request sent', 5000).catch(() => {});
  }

  async assignWorkshopDuringApproval(workshopId: string): Promise<void> {
    await safeClick(this.assignWorkshopButton, 3000);
    await this.page.locator('[data-testid="workshop-selector"]').selectOption(workshopId).catch(() => {});
    await safeClick(this.page.locator('[data-testid="confirm-assignment"]'), 3000);
  }

  async setPriority(priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY'): Promise<void> {
    await this.priorityLevel.selectOption(priority);
  }

  async getPendingClaimsCount(): Promise<number> {
    return await this.pendingClaimsList.locator('[data-testid="claim-item"]').count();
  }

  async getClaimDetails(claimId: string): Promise<{
    claimNumber: string;
    customer: string;
    estimatedCost: string;
    incidentDate: string;
    status: string;
  }> {
    await this.selectClaimForReview(claimId);

    return {
      claimNumber: await safeText(this.claimDetails.locator('[data-testid="claim-number"]')),
      customer: await safeText(this.claimDetails.locator('[data-testid="claim-customer"]')),
      estimatedCost: await safeText(this.claimDetails.locator('[data-testid="claim-estimated-cost"]')),
      incidentDate: await safeText(this.claimDetails.locator('[data-testid="claim-incident-date"]')),
      status: await safeText(this.claimDetails.locator('[data-testid="claim-status"]')),
    } as any;
  }

  async waitForReady(): Promise<void> {
    await this.page.locator('[data-testid="claims-approval-page"]').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  }
}
