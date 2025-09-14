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
    this.pendingClaimsList = page.locator('[data-testid="pending-claims-list"]');
    this.claimDetails = page.locator('[data-testid="claim-details"]');
    this.approveButton = page.locator('[data-testid="approve-button"]');
    this.rejectButton = page.locator('[data-testid="reject-button"]');
    this.requestMoreInfoButton = page.locator('[data-testid="request-info-button"]');
    this.assignWorkshopButton = page.locator('[data-testid="assign-workshop-button"]');
    this.approvalNotes = page.locator('[data-testid="approval-notes"]');
    this.rejectionReason = page.locator('[data-testid="rejection-reason"]');
    this.estimatedCostAdjustment = page.locator('[data-testid="cost-adjustment"]');
    this.priorityLevel = page.locator('[data-testid="priority-level"]');
  }

  async selectClaimForReview(claimId: string): Promise<void> {
    await this.pendingClaimsList.locator(`[data-claim-id="${claimId}"]`).click();
    await this.waitForPageLoad();
  }

  async approveClaim(notes?: string, costAdjustment?: number): Promise<void> {
    if (notes) {
      await this.approvalNotes.fill(notes);
    }
    
    if (costAdjustment) {
      await this.estimatedCostAdjustment.fill(costAdjustment.toString());
    }
    
    await this.approveButton.click();
    await this.handleConfirmationModal(true);
    await this.waitForToast('Claim approved successfully');
  }

  async rejectClaim(reason: string): Promise<void> {
    await this.rejectionReason.fill(reason);
    await this.rejectButton.click();
    await this.handleConfirmationModal(true);
    await this.waitForToast('Claim rejected');
  }

  async requestMoreInformation(message: string): Promise<void> {
    await this.requestMoreInfoButton.click();
    await this.page.locator('[data-testid="info-request-message"]').fill(message);
    await this.page.locator('[data-testid="send-request"]').click();
    await this.waitForToast('Information request sent');
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
      claimNumber: await this.claimDetails.locator('[data-testid="claim-number"]').textContent() || '',
      status: await this.claimDetails.locator('[data-testid="claim-status"]').textContent() || ''
    } as any;
  }
}
