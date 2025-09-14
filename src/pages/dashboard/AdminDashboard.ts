import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class AdminDashboard extends BasePage {
  private readonly metricsCards: Locator;
  private readonly userManagementSection: Locator;
  private readonly systemHealth: Locator;
  private readonly recentActivity: Locator;
  private readonly reportsSection: Locator;
  private readonly manageUsersButton: Locator;

  constructor(page: Page) {
    super(page, '/dashboard/admin');
    this.metricsCards = page.locator('[data-testid="admin-metrics"]');
    this.userManagementSection = page.locator('[data-testid="user-management"]');
    this.systemHealth = page.locator('[data-testid="system-health"]');
    this.recentActivity = page.locator('[data-testid="recent-activity"]');
    this.reportsSection = page.locator('[data-testid="reports-section"]');
    this.manageUsersButton = page.locator('[data-testid="manage-users"]');
  }

  async getMetrics(): Promise<Record<string, number>> {
    // ...existing code...
    return {} as any;
  }

  async openUserManagement(): Promise<void> {
    await this.manageUsersButton.click();
    await this.waitForPageLoad();
  }

  async runHealthCheck(): Promise<string> {
    await this.systemHealth.locator('[data-testid="run-health-check"]').click();
    return await this.systemHealth.locator('[data-testid="health-status"]').textContent() || '';
  }

  async getRecentActivity(): Promise<string[]> {
    const items = this.recentActivity.locator('[data-testid="activity-item"]');
    const result: string[] = [];
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      result.push((await items.nth(i).textContent()) || '');
    }
    return result;
  }
}
