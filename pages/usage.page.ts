import { Page, Locator, expect } from '@playwright/test';

export class EnterUsagePage {
  constructor(private readonly page: Page) { }

  // ===== Locators =====
  readonly heading = this.page.getByRole('heading', { name: /energy consumption/i });
  readonly nmiPrefixSelect = this.page.locator('select').first();
  readonly nmiSuffixInput = this.page.locator('input[name="nmiSuffix"]');
  readonly nextButton = this.page.getByText('Next');
  readonly suffixHelperText = this.page.getByText(/nmi suffix has to be between 7-8 digits/i);

  readonly logoutButton = this.page.getByRole('button', { name: /logout/i });
  readonly homeNavLink = this.page.getByRole('link', { name: /^home$/i }).first();
  readonly dashboardNavLink = this.page.getByRole('link', { name: /^dashboard$/i }).first();
  readonly usageFormNavLink = this.page.getByRole('link', { name: /usage form/i }).first();


  // ===== Step 2 Locators =====
  readonly consumptionInput = this.page.locator('input[name="consumption"]');
  readonly previousButton = this.page.getByRole('button', { name: /previous/i });
  readonly submitButton = this.page.getByRole('button', { name: /submit/i });

  // ===== Assertions =====
  async assertLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.nmiPrefixSelect).toBeVisible();
    await expect(this.nmiSuffixInput).toBeVisible();
    await expect(this.nextButton).toBeVisible();
  }

  async assertNextButtonDisabled() {
    await expect(this.nextButton).toBeDisabled();
  }

  async assertNextButtonEnabled() {
    await expect(this.nextButton).toBeEnabled();
  }

  async assertSuffixHelperTextVisible() {
    await expect(this.suffixHelperText).toBeVisible();
  }

  // ===== Actions =====
  async selectNmiPrefix(prefix: string) {
    await this.nmiPrefixSelect.selectOption(prefix);
  }

  async enterNmiSuffix(value: string) {
    await this.nmiSuffixInput.fill(value);
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async fillStepOne(prefix: string, suffix: string) {
    await this.selectNmiPrefix(prefix);
    await this.enterNmiSuffix(suffix);
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

  async enterConsumption(value: string) {
    await this.consumptionInput.fill(value);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async clickPrevious() {
    await this.previousButton.click();
  }

  async assertPreviousEnabled() {
    await expect(this.previousButton).toBeEnabled();
  }

  async assertSubmitDisabled() {
    await expect(this.submitButton).toBeDisabled();
  }

  async assertSubmitEnabled() {
    await expect(this.submitButton).toBeEnabled();
  }
}