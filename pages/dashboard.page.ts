import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) { }

  // ===== Locators =====
  readonly heading = this.page.getByRole('heading', { name: 'Dashboard' });
  readonly energyUsageButton = this.page.getByRole('button', { name: /energy usage/i });
  readonly logoutButton = this.page.getByRole('button', { name: /logout/i });

  readonly homeNavLink = this.page.getByRole('link', { name: /^home$/i }).first();
  readonly dashboardNavLink = this.page.getByRole('link', { name: /^dashboard$/i }).first();
  readonly usageFormNavLink = this.page.getByRole('link', { name: /usage form/i }).first();

  readonly table = this.page.locator('table');
  readonly tableHeaders = this.page.locator('thead th');
  readonly tableRows = this.page.locator('tbody tr');
  
  // ===== Assertions =====
  async assertLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.energyUsageButton).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
  }

  // ===== Actions =====
  async clickEnergyUsage() {
    await this.energyUsageButton.click();
  }

  async clickHomeNav() {
    await this.homeNavLink.click();
  }

  async clickDashboardNav() {
    await this.dashboardNavLink.click();
  }

  async clickUsageFormNav() {
    await this.usageFormNavLink.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}