import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class CustomerDashboard extends BasePage {
  private readonly welcomeMessage: Locator;
  private readonly myClaimsSection: Locator;
  private readonly createClaimButton: Locator;
  private readonly recentClaims: Locator;
  private readonly claimStatusCards: Locator;
  private readonly myVehicles: Locator;
  private readonly addVehicleButton: Locator;
  private readonly profileSection: Locator;
  private readonly notificationsPanel: Locator;
  private readonly quickActions: Locator;

  constructor(page: Page) {
    super(page, '/dashboard/customer');
    this.welcomeMessage = page.locator('[data-testid="welcome-message"]');
    this.myClaimsSection = page.locator('[data-testid="my-claims-section"]');
    this.createClaimButton = page.locator('[data-testid="create-claim-button"]');
    this.recentClaims = page.locator('[data-testid="recent-claims"]');
    this.claimStatusCards = page.locator('[data-testid="claim-status-cards"]');
    this.myVehicles = page.locator('[data-testid="my-vehicles"]');
    this.addVehicleButton = page.locator('[data-testid="add-vehicle-button"]');
    this.profileSection = page.locator('[data-testid="profile-section"]');
    this.notificationsPanel = page.locator('[data-testid="notifications-panel"]');
    this.quickActions = page.locator('[data-testid="quick-actions"]');
  }

  async getWelcomeMessage(): Promise<string> {
    return await this.welcomeMessage.textContent() || '';
  }

  async createNewClaim(): Promise<void> {
    await this.createClaimButton.click();
  }

  async getClaimStatusSummary(): Promise<{
    total: number;
    pending: number;
    approved: number;
    inRepair: number;
    completed: number;
  }> {
    return {
      total: parseInt(await this.claimStatusCards.locator('[data-testid="total-claims"]').textContent() || '0'),
      completed: parseInt(await this.claimStatusCards.locator('[data-testid="completed-claims"]').textContent() || '0'),
      pending: 0,
      approved: 0,
      inRepair: 0
    } as any;
  }

  async getRecentClaims(): Promise<Array<{
    claimNumber: string;
    status: string;
    vehicle: string;
    date: string;
  }>> {
    const claims: any[] = [];
    const claimItems = this.recentClaims.locator('[data-testid="claim-item"]');
    const count = await claimItems.count();

    for (let i = 0; i < count; i++) {
      const item = claimItems.nth(i);
      // ...existing code...
    }

    return claims;
  }

  async getMyVehicles(): Promise<Array<{
    make: string;
    model: string;
    year: string;
    licensePlate: string;
  }>> {
    const vehicles: any[] = [];
    const vehicleItems = this.myVehicles.locator('[data-testid="vehicle-item"]');
    const count = await vehicleItems.count();

    for (let i = 0; i < count; i++) {
      const item = vehicleItems.nth(i);
      // ...existing code...
    }

    return vehicles;
  }

  async addNewVehicle(): Promise<void> {
    await this.addVehicleButton.click();
  }

  async getNotificationsCount(): Promise<number> {
    const badge = this.notificationsPanel.locator('[data-testid="notification-badge"]');
    const countText = await badge.textContent();
    return parseInt(countText || '0');
  }

  async performQuickAction(actionName: string): Promise<void> {
    await this.quickActions.locator(`[data-action="${actionName}"]`).click();
  }

  async viewAllClaims(): Promise<void> {
    await this.myClaimsSection.locator('[data-testid="view-all-claims"]').click();
  }

  async trackClaimStatus(claimNumber: string): Promise<void> {
    await this.page.locator('[data-testid="track-claim-input"]').fill(claimNumber);
    await this.page.locator('[data-testid="track-claim-button"]').click();
  }
}
