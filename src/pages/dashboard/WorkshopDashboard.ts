import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class WorkshopDashboard extends BasePage {
  private readonly workshopInfo: Locator;
  private readonly capacityOverview: Locator;
  private readonly activeClaims: Locator;
  private readonly pendingAssignments: Locator;
  private readonly completedToday: Locator;
  private readonly performanceMetrics: Locator;
  private readonly calendarView: Locator;
  private readonly teamStatus: Locator;
  private readonly updateCapacityButton: Locator;

  constructor(page: Page) {
    super(page, '/dashboard/workshop');
    this.workshopInfo = page.locator('[data-testid="workshop-info"]');
    this.capacityOverview = page.locator('[data-testid="capacity-overview"]');
    this.activeClaims = page.locator('[data-testid="active-claims"]');
    this.pendingAssignments = page.locator('[data-testid="pending-assignments"]');
    this.completedToday = page.locator('[data-testid="completed-today"]');
    this.performanceMetrics = page.locator('[data-testid="performance-metrics"]');
    this.calendarView = page.locator('[data-testid="calendar-view"]');
    this.teamStatus = page.locator('[data-testid="team-status"]');
    this.updateCapacityButton = page.locator('[data-testid="update-capacity-button"]');
  }

  async getWorkshopOverview(): Promise<{
    name: string;
    capacity: number;
    currentLoad: number;
    utilizationRate: number;
  }> {
    return {
      name: await this.workshopInfo.locator('[data-testid="workshop-name"]').textContent() || '',
      utilizationRate: parseFloat(await this.capacityOverview.locator('[data-testid="utilization-rate"]').textContent() || '0')
    } as any;
  }

  async getActiveClaims(): Promise<Array<{
    claimNumber: string;
    customerName: string;
    vehicleInfo: string;
    status: string;
    assignedTechnician: string;
    estimatedCompletion: string;
  }>> {
    const claims: any[] = [];
    const claimItems = this.activeClaims.locator('[data-testid="active-claim-item"]');
    const count = await claimItems.count();

    for (let i = 0; i < count; i++) {
      const item = claimItems.nth(i);
      // ...existing code...
    }

    return claims;
  }

  async getPendingAssignments(): Promise<number> {
    return parseInt(await this.pendingAssignments.locator('[data-testid="pending-count"]').textContent() || '0');
  }

  async getCompletedToday(): Promise<number> {
    return parseInt(await this.completedToday.locator('[data-testid="completed-count"]').textContent() || '0');
  }

  async getPerformanceMetrics(): Promise<{
    averageRepairTime: string;
    customerSatisfaction: number;
    onTimeCompletion: number;
    qualityScore: number;
  }> {
    return {
      averageRepairTime: await this.performanceMetrics.locator('[data-testid="avg-repair-time"]').textContent() || '',
      qualityScore: parseFloat(await this.performanceMetrics.locator('[data-testid="quality-score"]').textContent() || '0')
    } as any;
  }

  async updateWorkshopCapacity(newCapacity: number): Promise<void> {
    await this.updateCapacityButton.click();
    await this.page.locator('[data-testid="capacity-input"]').fill(newCapacity.toString());
    await this.page.locator('[data-testid="save-capacity"]').click();
    await this.waitForToast('Capacity updated successfully');
  }

  async acceptPendingAssignment(claimId: string): Promise<void> {
    await this.pendingAssignments.locator(`[data-claim-id="${claimId}"] [data-testid="accept-assignment"]`).click();
    await this.handleConfirmationModal(true);
  }

  async declinePendingAssignment(claimId: string, reason: string): Promise<void> {
    await this.pendingAssignments.locator(`[data-claim-id="${claimId}"] [data-testid="decline-assignment"]`).click();
    await this.page.locator('[data-testid="decline-reason"]').fill(reason);
    await this.page.locator('[data-testid="confirm-decline"]').click();
  }

  async startRepairWork(claimId: string, technicianId: string): Promise<void> {
    await this.activeClaims.locator(`[data-claim-id="${claimId}"] [data-testid="start-repair"]`).click();
    await this.page.locator('[data-testid="technician-select"]').selectOption(technicianId);
    await this.page.locator('[data-testid="confirm-start"]').click();
    await this.waitForToast('Repair work started');
  }

  async completeRepair(claimId: string, actualCost: number, notes: string): Promise<void> {
    await this.activeClaims.locator(`[data-claim-id="${claimId}"] [data-testid="complete-repair"]`).click();
    await this.waitForToast('Repair completed successfully');
  }

  async viewCalendar(): Promise<void> {
    await this.calendarView.click();
  }

  async getTeamStatus(): Promise<Array<{
    technicianName: string;
    workload: number;
  }>> {
    const team: any[] = [];
    return team;
  }
}
