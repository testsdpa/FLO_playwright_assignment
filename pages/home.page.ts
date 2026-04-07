import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  // ===== Locators =====
  readonly welcomeHeader = this.page.getByRole('heading', {
    name: 'Welcome to your assignment! 👋'
  });

  readonly contextHeader = this.page.getByRole('heading', {
    name: 'Context and Task'
  });

  readonly dashboardLink = this.page.getByRole('link', {
    name: 'Dashboard'
  });

  readonly usageFormLink = this.page.getByRole('link', {
    name: 'Usage form'
  });

  readonly logoutButton = this.page.getByRole('button', {
    name: 'Logout'
  });

  // ===== Assertions =====
  async assertLoaded() {
    await expect(this.welcomeHeader).toBeVisible();
    await expect(this.contextHeader).toBeVisible();
  }

  // ===== Actions =====
  async clickDashboard() {
    await this.dashboardLink.click();
  }

  async clickUsageForm() {
    await this.usageFormLink.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}