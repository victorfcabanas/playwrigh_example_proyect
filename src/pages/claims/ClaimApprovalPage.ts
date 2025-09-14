import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { ClaimStatus } from '../../utils/enums/ClaimStatus';

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
    await this.pendingClaimsList.locator(`[data-claim-id="${claimId}"]`).click();
    await this.waitForReady();
  }

  async approveClaim(notes?: string, costAdjustment?: number): Promise<void> {
    if (notes) {
      await this.approvalNotes.fill(String(notes).trim());
    }
    
    if (costAdjustment) {
      await this.estimatedCostAdjustment.fill(costAdjustment.toString());
    }
    
    await this.approveButton.click();
    await this.handleConfirmationModal(true);
    await this.waitForToast('Claim approved successfully').catch(() => {});
  }

  async rejectClaim(reason: string): Promise<void> {
    await this.rejectionReason.fill(String(reason).trim());
    await this.rejectButton.click();
    await this.handleConfirmationModal(true);
    await this.waitForToast('Claim rejected').catch(() => {});
  }

  async requestMoreInformation(message: string): Promise<void> {
    await this.requestMoreInfoButton.click();
    await this.page.locator('[data-testid="info-request-message"]').fill(String(message).trim());
    await this.page.locator('[data-testid="send-request"]').click();
    await this.waitForToast('Information request sent').catch(() => {});
  }

  async assignWorkshopDuringApproval(workshopId: string): Promise<void> {
    await this.assignWorkshopButton.click();
    await this.page.locator('[data-testid="workshop-selector"]').selectOption(workshopId);
    await this.page.locator('[data-testid="confirm-assignment"]').click();
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
      claimNumber: ((await this.claimDetails.locator('[data-testid="claim-number"]').textContent()) || '').trim(),
      customer: ((await this.claimDetails.locator('[data-testid="claim-customer"]').textContent()) || '').trim(),
      estimatedCost: ((await this.claimDetails.locator('[data-testid="claim-estimated-cost"]').textContent()) || '').trim(),
      incidentDate: ((await this.claimDetails.locator('[data-testid="claim-incident-date"]').textContent()) || '').trim(),
      status: ((await this.claimDetails.locator('[data-testid="claim-status"]').textContent()) || '').trim(),
    } as any;
  }

  async waitForReady(): Promise<void> {
    await this.page.locator('[data-testid="claims-approval-page"]').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  }
}
