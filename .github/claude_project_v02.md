// Project Structure and Implementation for Automotive Claims Management System

/*
Project Structure:
automotive-claims-testing/
├── src/
│   ├── pages/
│   │   ├── base/
│   │   │   └── BasePage.ts
│   │   ├── auth/
│   │   │   ├── LoginPage.ts
│   │   │   └── LogoutPage.ts
│   │   ├── claims/
│   │   │   ├── ClaimsListPage.ts
│   │   │   ├── ClaimDetailsPage.ts
│   │   │   ├── CreateClaimPage.ts
│   │   │   └── ClaimApprovalPage.ts
│   │   ├── workshops/
│   │   │   ├── WorkshopListPage.ts
│   │   │   ├── WorkshopDetailsPage.ts
│   │   │   └── WorkshopManagementPage.ts
│   │   ├── vehicles/
│   │   │   ├── VehicleRegistrationPage.ts
│   │   │   └── VehicleDetailsPage.ts
│   │   └── dashboard/
│   │       ├── CustomerDashboard.ts
│   │       ├── WorkshopDashboard.ts
│   │       └── AdminDashboard.ts
│   ├── components/
│   │   ├── base/
│   │   │   └── BaseComponent.ts
│   │   ├── navigation/
│   │   │   ├── Header.ts
│   │   │   ├── Sidebar.ts
│   │   │   └── Breadcrumb.ts
│   │   ├── forms/
│   │   │   ├── ClaimForm.ts
│   │   │   ├── VehicleForm.ts
│   │   │   └── WorkshopForm.ts
│   │   ├── tables/
│   │   │   ├── ClaimsTable.ts
│   │   │   ├── WorkshopsTable.ts
│   │   │   └── VehiclesTable.ts
│   │   └── modals/
│   │       ├── ConfirmationModal.ts
│   │       ├── ImageUploadModal.ts
│   │       └── DocumentModal.ts
│   ├── services/
│   │   ├── api/
│   │   │   ├── ApiClient.ts
│   │   │   ├── ClaimsService.ts
│   │   │   ├── WorkshopsService.ts
│   │   │   ├── VehiclesService.ts
│   │   │   ├── UsersService.ts
│   │   │   └── AuthService.ts
│   │   ├── database/
│   │   │   ├── DatabaseHelper.ts
│   │   │   └── TestDataSeeder.ts
│   │   └── external/
│   │       ├── InsuranceApiClient.ts
│   │       └── VinValidationService.ts
│   ├── fixtures/
│   │   ├── test-data/
│   │   │   ├── users.json
│   │   │   ├── claims.json
│   │   │   ├── workshops.json
│   │   │   └── vehicles.json
│   │   ├── pages.fixture.ts
│   │   ├── api.fixture.ts
│   │   └── database.fixture.ts
│   ├── factories/
│   │   ├── UserFactory.ts
│   │   ├── ClaimFactory.ts
│   │   ├── WorkshopFactory.ts
│   │   └── VehicleFactory.ts
│   ├── utils/
│   │   ├── helpers/
│   │   │   ├── dateHelper.ts
│   │   │   ├── fileHelper.ts
│   │   │   ├── validationHelper.ts
│   │   │   └── reportHelper.ts
│   │   ├── constants/
│   │   │   ├── urls.ts
│   │   │   ├── messages.ts
│   │   │   ├── testIds.ts
│   │   │   └── claims.constants.ts
│   │   ├── types/
│   │   │   ├── User.ts
│   │   │   ├── Claim.ts
│   │   │   ├── Workshop.ts
│   │   │   └── Vehicle.ts
│   │   └── enums/
│   │       ├── ClaimStatus.ts
│   │       ├── UserRole.ts
│   │       └── VehicleType.ts
│   └── config/
│       ├── environments/
│       │   ├── dev.ts
│       │   ├── staging.ts
│       │   └── production.ts
│       ├── browser.config.ts
│       └── database.config.ts
├── tests/
│   ├── e2e/
│   │   ├── auth/
│   │   │   ├── login.spec.ts
│   │   │   ├── logout.spec.ts
│   │   │   └── password-recovery.spec.ts
│   │   ├── claims/
│   │   │   ├── create-claim.spec.ts
│   │   │   ├── claim-lifecycle.spec.ts
│   │   │   ├── claim-approval.spec.ts
│   │   │   ├── claim-rejection.spec.ts
│   │   │   └── claim-search.spec.ts
│   │   ├── workshops/
│   │   │   ├── workshop-registration.spec.ts
│   │   │   ├── workshop-management.spec.ts
│   │   │   ├── workshop-assignment.spec.ts
│   │   │   └── workshop-reporting.spec.ts
│   │   ├── vehicles/
│   │   │   ├── vehicle-registration.spec.ts
│   │   │   └── vehicle-history.spec.ts
│   │   └── integration/
│   │       ├── claim-workshop-integration.spec.ts
│   │       └── insurance-integration.spec.ts
│   ├── api/
│   │   ├── auth/
│   │   │   ├── authentication.api.spec.ts
│   │   │   └── authorization.api.spec.ts
│   │   ├── claims/
│   │   │   ├── claims-crud.api.spec.ts
│   │   │   ├── claims-validation.api.spec.ts
│   │   │   ├── claims-status-updates.api.spec.ts
│   │   │   └── claims-search.api.spec.ts
│   │   ├── workshops/
│   │   │   ├── workshops-crud.api.spec.ts
│   │   │   ├── workshop-availability.api.spec.ts
│   │   │   └── workshop-assignments.api.spec.ts
│   │   ├── vehicles/
│   │   │   ├── vehicles-crud.api.spec.ts
│   │   │   └── vin-validation.api.spec.ts
│   │   └── external/
│   │       ├── insurance-api.spec.ts
│   │       └── vin-decoder.api.spec.ts
│   └── performance/
│       ├── claims-load.spec.ts
│       └── dashboard-performance.spec.ts
├── reports/
├── screenshots/
├── videos/
├── downloads/
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .github/
│   └── workflows/
│       ├── e2e-tests.yml
│       ├── api-tests.yml
│       └── performance-tests.yml
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
*/

// ============================================================================
// TYPES AND ENUMS
// ============================================================================

// src/utils/enums/ClaimStatus.ts
export enum ClaimStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IN_REPAIR = 'IN_REPAIR',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED'
}

// src/utils/enums/UserRole.ts
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  WORKSHOP_MANAGER = 'WORKSHOP_MANAGER',
  WORKSHOP_TECHNICIAN = 'WORKSHOP_TECHNICIAN',
  INSURANCE_AGENT = 'INSURANCE_AGENT',
  ADMIN = 'ADMIN',
  CLAIMS_ADJUSTER = 'CLAIMS_ADJUSTER'
}

// src/utils/enums/VehicleType.ts
export enum VehicleType {
  CAR = 'CAR',
  TRUCK = 'TRUCK',
  MOTORCYCLE = 'MOTORCYCLE',
  VAN = 'VAN',
  SUV = 'SUV'
}

// src/utils/types/User.ts
export interface User {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phoneNumber: string;
  address?: Address;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// src/utils/types/Claim.ts
export interface Claim {
  id: string;
  claimNumber: string;
  customerId: string;
  vehicleId: string;
  workshopId?: string;
  status: ClaimStatus;
  incidentDate: Date;
  reportedDate: Date;
  description: string;
  estimatedCost: number;
  actualCost?: number;
  images: string[];
  documents: string[];
  assignedAdjusterId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// src/utils/types/Workshop.ts
export interface Workshop {
  id: string;
  name: string;
  registrationNumber: string;
  email: string;
  phoneNumber: string;
  address: Address;
  specializations: VehicleType[];
  capacity: number;
  currentLoad: number;
  rating: number;
  isActive: boolean;
  managerId: string;
  technicians: string[];
  createdAt: Date;
  updatedAt: Date;
}

// src/utils/types/Vehicle.ts
export interface Vehicle {
  id: string;
  vin: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  color: string;
  ownerId: string;
  insurancePolicyNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// FACTORIES
// ============================================================================

// src/factories/UserFactory.ts
import { faker } from '@faker-js/faker';
import { User, UserRole, Address } from '../utils/types/User';

export class UserFactory {
  static create(overrides: Partial<User> = {}): User {
    const address: Address = {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: 'USA'
    };

    return {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      password: 'Test123!',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: UserRole.CUSTOMER,
      phoneNumber: faker.phone.number(),
      address,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides
    };
  }

  static createCustomer(): User {
    return this.create({ role: UserRole.CUSTOMER });
  }

  static createWorkshopManager(): User {
    return this.create({ role: UserRole.WORKSHOP_MANAGER });
  }

  static createAdmin(): User {
    return this.create({ role: UserRole.ADMIN });
  }

  static createClaimsAdjuster(): User {
    return this.create({ role: UserRole.CLAIMS_ADJUSTER });
  }
}

// src/factories/ClaimFactory.ts
import { faker } from '@faker-js/faker';
import { Claim, ClaimStatus } from '../utils/types/Claim';

export class ClaimFactory {
  static create(overrides: Partial<Claim> = {}): Claim {
    const incidentDate = faker.date.recent({ days: 30 });
    const reportedDate = faker.date.between({ 
      from: incidentDate, 
      to: new Date() 
    });

    return {
      id: faker.string.uuid(),
      claimNumber: `CLM-${faker.number.int({ min: 100000, max: 999999 })}`,
      customerId: faker.string.uuid(),
      vehicleId: faker.string.uuid(),
      status: ClaimStatus.SUBMITTED,
      incidentDate,
      reportedDate,
      description: faker.lorem.paragraph(),
      estimatedCost: faker.number.float({ min: 500, max: 15000, precision: 0.01 }),
      images: [faker.image.url(), faker.image.url()],
      documents: [`document-${faker.string.uuid()}.pdf`],
      createdAt: reportedDate,
      updatedAt: reportedDate,
      ...overrides
    };
  }

  static createDraft(): Claim {
    return this.create({ status: ClaimStatus.DRAFT });
  }

  static createApproved(): Claim {
    return this.create({ 
      status: ClaimStatus.APPROVED,
      workshopId: faker.string.uuid(),
      assignedAdjusterId: faker.string.uuid()
    });
  }

  static createInRepair(): Claim {
    return this.create({ 
      status: ClaimStatus.IN_REPAIR,
      workshopId: faker.string.uuid(),
      assignedAdjusterId: faker.string.uuid(),
      actualCost: faker.number.float({ min: 500, max: 15000, precision: 0.01 })
    });
  }
}

// src/factories/WorkshopFactory.ts
import { faker } from '@faker-js/faker';
import { Workshop, VehicleType } from '../utils/types/Workshop';
import { Address } from '../utils/types/User';

export class WorkshopFactory {
  static create(overrides: Partial<Workshop> = {}): Workshop {
    const address: Address = {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: 'USA'
    };

    return {
      id: faker.string.uuid(),
      name: `${faker.company.name()} Auto Repair`,
      registrationNumber: `WS-${faker.number.int({ min: 10000, max: 99999 })}`,
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      address,
      specializations: [VehicleType.CAR, VehicleType.SUV],
      capacity: faker.number.int({ min: 10, max: 50 }),
      currentLoad: faker.number.int({ min: 0, max: 20 }),
      rating: faker.number.float({ min: 3.0, max: 5.0, precision: 0.1 }),
      isActive: true,
      managerId: faker.string.uuid(),
      technicians: [faker.string.uuid(), faker.string.uuid()],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides
    };
  }

  static createSpecialist(vehicleType: VehicleType): Workshop {
    return this.create({ specializations: [vehicleType] });
  }

  static createHighCapacity(): Workshop {
    return this.create({ 
      capacity: 100, 
      currentLoad: faker.number.int({ min: 0, max: 30 }) 
    });
  }
}

// src/factories/VehicleFactory.ts
import { faker } from '@faker-js/faker';
import { Vehicle, VehicleType } from '../utils/types/Vehicle';

export class VehicleFactory {
  static create(overrides: Partial<Vehicle> = {}): Vehicle {
    const makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi'];
    const make = faker.helpers.arrayElement(makes);
    
    return {
      id: faker.string.uuid(),
      vin: this.generateVIN(),
      licensePlate: faker.vehicle.vrm(),
      make,
      model: faker.vehicle.model(),
      year: faker.number.int({ min: 2010, max: 2024 }),
      type: VehicleType.CAR,
      color: faker.vehicle.color(),
      ownerId: faker.string.uuid(),
      insurancePolicyNumber: `POL-${faker.number.int({ min: 1000000, max: 9999999 })}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides
    };
  }

  private static generateVIN(): string {
    const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ1234567890';
    let vin = '';
    for (let i = 0; i < 17; i++) {
      vin += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return vin;
  }

  static createCar(): Vehicle {
    return this.create({ type: VehicleType.CAR });
  }

  static createTruck(): Vehicle {
    return this.create({ type: VehicleType.TRUCK });
  }
}

// ============================================================================
// BASE CLASSES
// ============================================================================

// src/pages/base/BasePage.ts
import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  protected url: string;

  constructor(page: Page, url: string = '') {
    this.page = page;
    this.url = url;
  }

  async navigate(): Promise<void> {
    if (this.url) {
      await this.page.goto(this.url);
    }
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async waitForToast(message?: string): Promise<void> {
    const toast = this.page.locator('[data-testid="toast"]');
    await toast.waitFor({ state: 'visible' });
    
    if (message) {
      await expect(toast).toContainText(message);
    }
    
    await toast.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async handleConfirmationModal(confirm: boolean = true): Promise<void> {
    const modal = this.page.locator('[data-testid="confirmation-modal"]');
    await modal.waitFor({ state: 'visible' });
    
    if (confirm) {
      await this.page.locator('[data-testid="confirm-button"]').click();
    } else {
      await this.page.locator('[data-testid="cancel-button"]').click();
    }
    
    await modal.waitFor({ state: 'hidden' });
  }
}

// src/services/api/ApiClient.ts
import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;
  private baseURL: string;
  private authToken?: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  async get(endpoint: string, params?: Record<string, string>): Promise<APIResponse> {
    let url = `${this.baseURL}${endpoint}`;
    
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    return await this.request.get(url, {
      headers: this.getHeaders(),
    });
  }

  async post(endpoint: string, data?: any): Promise<APIResponse> {
    return await this.request.post(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(),
      data: data ? JSON.stringify(data) : undefined,
    });
  }

  async put(endpoint: string, data?: any): Promise<APIResponse> {
    return await this.request.put(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(),
      data: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return await this.request.delete(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(),
    });
  }

  async uploadFile(endpoint: string, filePath: string, fieldName: string = 'file'): Promise<APIResponse> {
    return await this.request.post(`${this.baseURL}${endpoint}`, {
      headers: {
        'Authorization': this.authToken ? `Bearer ${this.authToken}` : undefined,
      },
      multipart: {
        [fieldName]: {
          name: filePath.split('/').pop() || 'file',
          mimeType: 'application/octet-stream',
          buffer: Buffer.from('fake file content'), // In real scenario, read actual file
        },
      },
    });
  }
}

// ============================================================================
// PAGE OBJECTS
// ============================================================================

// src/pages/auth/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly errorMessage: Locator;
  private readonly rememberMeCheckbox: Locator;

  constructor(page: Page) {
    super(page, '/auth/login');
    this.emailInput = page.locator('[data-testid="email-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.forgotPasswordLink = page.locator('[data-testid="forgot-password-link"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.rememberMeCheckbox = page.locator('[data-testid="remember-me-checkbox"]');
  }

  async login(email: string, password: string, rememberMe: boolean = false): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    
    await this.loginButton.click();
    await this.waitForPageLoad();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled();
  }
}

// src/pages/claims/CreateClaimPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Claim, ClaimStatus } from '../../utils/types/Claim';

export class CreateClaimPage extends BasePage {
  private readonly vehicleSelect: Locator;
  private readonly incidentDateInput: Locator;
  private readonly descriptionTextarea: Locator;
  private readonly imageUploadInput: Locator;
  private readonly documentUploadInput: Locator;
  private readonly estimatedCostInput: Locator;
  private readonly saveDraftButton: Locator;
  private readonly submitClaimButton: Locator;
  private readonly cancelButton: Locator;
  private readonly uploadedImagesList: Locator;
  private readonly uploadedDocumentsList: Locator;

  constructor(page: Page) {
    super(page, '/claims/create');
    this.vehicleSelect = page.locator('[data-testid="vehicle-select"]');
    this.incidentDateInput = page.locator('[data-testid="incident-date-input"]');
    this.descriptionTextarea = page.locator('[data-testid="description-textarea"]');
    this.imageUploadInput = page.locator('[data-testid="image-upload-input"]');
    this.documentUploadInput = page.locator('[data-testid="document-upload-input"]');
    this.estimatedCostInput = page.locator('[data-testid="estimated-cost-input"]');
    this.saveDraftButton = page.locator('[data-testid="save-draft-button"]');
    this.submitClaimButton = page.locator('[data-testid="submit-claim-button"]');
    this.cancelButton = page.locator('[data-testid="cancel-button"]');
    this.uploadedImagesList = page.locator('[data-testid="uploaded-images-list"]');
    this.uploadedDocumentsList = page.locator('[data-testid="uploaded-documents-list"]');
  }

  async selectVehicle(vehicleId: string): Promise<void> {
    await this.vehicleSelect.selectOption(vehicleId);
  }

  async fillIncidentDate(date: string): Promise<void> {
    await this.incidentDateInput.fill(date);
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionTextarea.fill(description);
  }

  async uploadImages(imagePaths: string[]): Promise<void> {
    for (const imagePath of imagePaths) {
      await this.imageUploadInput.setInputFiles(imagePath);
      await this.page.waitForTimeout(1000); // Wait for upload
    }
  }

  async uploadDocuments(documentPaths: string[]): Promise<void> {
    for (const documentPath of documentPaths) {
      await this.documentUploadInput.setInputFiles(documentPath);
      await this.page.waitForTimeout(1000); // Wait for upload
    }
  }

  async fillEstimatedCost(cost: number): Promise<void> {
    await this.estimatedCostInput.fill(cost.toString());
  }

  async saveDraft(): Promise<void> {
    await this.saveDraftButton.click();
    await this.waitForToast('Claim saved as draft');
  }

  async submitClaim(): Promise<void> {
    await this.submitClaimButton.click();
    await this.waitForToast('Claim submitted successfully');
  }

  async createCompleteClaim(claimData: Partial<Claim>): Promise<void> {
    if (claimData.vehicleId) {
      await this.selectVehicle(claimData.vehicleId);
    }
    
    if (claimData.incidentDate) {
      await this.fillIncidentDate(claimData.incidentDate.toISOString().split('T')[0]);
    }
    
    if (claimData.description) {
      await this.fillDescription(claimData.description);
    }
    
    if (claimData.estimatedCost) {
      await this.fillEstimatedCost(claimData.estimatedCost);
    }

    if (claimData.status === ClaimStatus.DRAFT) {
      await this.saveDraft();
    } else {
      await this.submitClaim();
    }
  }

  async getUploadedImagesCount(): Promise<number> {
    return await this.uploadedImagesList.locator('li').count();
  }

  async getUploadedDocumentsCount(): Promise<number> {
    return await this.uploadedDocumentsList.locator('li').count();
  }
}

// src/pages/workshops/WorkshopListPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class WorkshopListPage extends BasePage {
  private readonly searchInput: Locator;
  private readonly filterByLocation: Locator;
  private readonly filterBySpecialization: Locator;
  private readonly sortBySelect: Locator;
  private readonly workshopCards: Locator;
  private readonly paginationNext: Locator;
  private readonly paginationPrevious: Locator;
  private readonly resultsCount: Locator;

  constructor(page: Page) {
    super(page, '/workshops');
    this.searchInput = page.locator('[data-testid="workshop-search-input"]');
    this.filterByLocation = page.locator('[data-testid="filter-location"]');
    this.filterBySpecialization = page.locator('[data-testid="filter-specialization"]');
    this.sortBySelect = page.locator('[data-testid="sort-by-select"]');
    this.workshopCards = page.locator('[data-testid="workshop-card"]');
    this.paginationNext = page.locator('[data-testid="pagination-next"]');
    this.paginationPrevious = page.locator('[data-testid="pagination-previous"]');
    this.resultsCount = page.locator('[data-testid="results-count"]');
  }

  async searchWorkshops(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.waitForPageLoad();
  }

  async filterByLocation(location: string): Promise<void> {
    await this.filterByLocation.selectOption(location);
    await this.waitForPageLoad();
  }

  async filterBySpecialization(specialization: string): Promise<void> {
    await this.filterBySpecialization.selectOption(specialization);
    await this.waitForPageLoad();
  }

  async sortBy(sortOption: string): Promise<void> {
    await this.sortBySelect.selectOption(sortOption);
    await this.waitForPageLoad();
  }

  async getWorkshopCards(): Promise<Locator[]> {
    const count = await this.workshopCards.count();
    const cards: Locator[] = [];
    
    for (let i = 0; i < count; i++) {
      cards.push(this.workshopCards.nth(i));
    }
    
    return cards;
  }

  async selectWorkshop(workshopName: string): Promise<void> {
    const workshopCard = this.page.locator(`[data-testid="workshop-card"]:has-text("${workshopName}")`);
    await workshopCard.click();
  }

  async getResultsCount(): Promise<number> {
    const text = await this.resultsCount.textContent();
    const match = text?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  async goToNextPage(): Promise<void> {
    if (await this.paginationNext.isEnabled()) {
      await this.paginationNext.click();
      await this.waitForPageLoad();
    }
  }
}

// ============================================================================
// API SERVICES
// ============================================================================

// src/services/api/ClaimsService.ts
import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { Claim, ClaimStatus } from '../../utils/types/Claim';

export class ClaimsService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request, baseURL);
  }

  setAuthToken(token: string): void {
    this.apiClient.setAuthToken(token);
  }

  async createClaim(claimData: Partial<Claim>): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/claims', claimData);
  }

  async getClaim(claimId: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/claims/${claimId}`);
  }

  async updateClaim(claimId: string, updateData: Partial<Claim>): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/claims/${claimId}`, updateData);
  }

  async deleteClaim(claimId: string): Promise<APIResponse> {
    return await this.apiClient.delete(`/api/v1/claims/${claimId}`);
  }

  async updateClaimStatus(claimId: string, status: ClaimStatus): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/claims/${claimId}/status`, { status });
  }

  async assignWorkshop(claimId: string, workshopId: string): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/claims/${claimId}/workshop`, { workshopId });
  }

  async assignAdjuster(claimId: string, adjusterId: string): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/claims/${claimId}/adjuster`, { adjusterId });
  }

  async getClaims(filters?: {
    status?: ClaimStatus;
    customerId?: string;
    workshopId?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse> {
    const params: Record<string, string> = {};
    
    if (filters) {
      if (filters.status) params.status = filters.status;
      if (filters.customerId) params.customerId = filters.customerId;
      if (filters.workshopId) params.workshopId = filters.workshopId;
      if (filters.page) params.page = filters.page.toString();
      if (filters.limit) params.limit = filters.limit.toString();
    }

    return await this.apiClient.get('/api/v1/claims', params);
  }

  async uploadClaimImage(claimId: string, imagePath: string): Promise<APIResponse> {
    return await this.apiClient.uploadFile(`/api/v1/claims/${claimId}/images`, imagePath);
  }

  async uploadClaimDocument(claimId: string, documentPath: string): Promise<APIResponse> {
    return await this.apiClient.uploadFile(`/api/v1/claims/${claimId}/documents`, documentPath);
  }

  async searchClaims(query: string, filters?: Record<string, string>): Promise<APIResponse> {
    const params = { q: query, ...filters };
    return await this.apiClient.get('/api/v1/claims/search', params);
  }
}

// src/services/api/WorkshopsService.ts
import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { Workshop, VehicleType } from '../../utils/types/Workshop';

export class WorkshopsService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request, baseURL);
  }

  setAuthToken(token: string): void {
    this.apiClient.setAuthToken(token);
  }

  async createWorkshop(workshopData: Partial<Workshop>): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/workshops', workshopData);
  }

  async getWorkshop(workshopId: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/workshops/${workshopId}`);
  }

  async updateWorkshop(workshopId: string, updateData: Partial<Workshop>): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/workshops/${workshopId}`, updateData);
  }

  async deleteWorkshop(workshopId: string): Promise<APIResponse> {
    return await this.apiClient.delete(`/api/v1/workshops/${workshopId}`);
  }

  async getWorkshops(filters?: {
    city?: string;
    state?: string;
    specialization?: VehicleType;
    minRating?: number;
    availableCapacity?: boolean;
    page?: number;
    limit?: number;
  }): Promise<APIResponse> {
    const params: Record<string, string> = {};
    
    if (filters) {
      if (filters.city) params.city = filters.city;
      if (filters.state) params.state = filters.state;
      if (filters.specialization) params.specialization = filters.specialization;
      if (filters.minRating) params.minRating = filters.minRating.toString();
      if (filters.availableCapacity) params.availableCapacity = filters.availableCapacity.toString();
      if (filters.page) params.page = filters.page.toString();
      if (filters.limit) params.limit = filters.limit.toString();
    }

    return await this.apiClient.get('/api/v1/workshops', params);
  }

  async checkAvailability(workshopId: string, date: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/workshops/${workshopId}/availability?date=${date}`);
  }

  async getWorkshopClaims(workshopId: string): Promise<APIResponse> {
    return await this.apiClient.get(`/api/v1/workshops/${workshopId}/claims`);
  }

  async updateCapacity(workshopId: string, capacity: number): Promise<APIResponse> {
    return await this.apiClient.put(`/api/v1/workshops/${workshopId}/capacity`, { capacity });
  }
}

// src/services/api/AuthService.ts
import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { User, UserRole } from '../../utils/types/User';

export class AuthService {
  private apiClient: ApiClient;

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request, baseURL);
  }

  async login(email: string, password: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/login', { email, password });
  }

  async register(userData: Partial<User>): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/register', userData);
  }

  async logout(): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/logout');
  }

  async refreshToken(refreshToken: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/refresh', { refreshToken });
  }

  async forgotPassword(email: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/reset-password', { token, newPassword });
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<APIResponse> {
    return await this.apiClient.post('/api/v1/auth/change-password', { oldPassword, newPassword });
  }

  async getCurrentUser(): Promise<APIResponse> {
    return await this.apiClient.get('/api/v1/auth/me');
  }
}

// ============================================================================
// FIXTURES
// ============================================================================

// src/fixtures/pages.fixture.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';
import { CreateClaimPage } from '../pages/claims/CreateClaimPage';
import { WorkshopListPage } from '../pages/workshops/WorkshopListPage';

type PageFixtures = {
  loginPage: LoginPage;
  createClaimPage: CreateClaimPage;
  workshopListPage: WorkshopListPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  createClaimPage: async ({ page }, use) => {
    const createClaimPage = new CreateClaimPage(page);
    await use(createClaimPage);
  },

  workshopListPage: async ({ page }, use) => {
    const workshopListPage = new WorkshopListPage(page);
    await use(workshopListPage);
  },
});

export { expect } from '@playwright/test';

// src/fixtures/api.fixture.ts
import { test as base } from '@playwright/test';
import { ClaimsService } from '../services/api/ClaimsService';
import { WorkshopsService } from '../services/api/WorkshopsService';
import { AuthService } from '../services/api/AuthService';

type ApiFixtures = {
  claimsService: ClaimsService;
  workshopsService: WorkshopsService;
  authService: AuthService;
};

export const apiTest = base.extend<ApiFixtures>({
  claimsService: async ({ request }, use) => {
    const baseURL = process.env.API_BASE_URL || 'https://api.example.com';
    const claimsService = new ClaimsService(request, baseURL);
    await use(claimsService);
  },

  workshopsService: async ({ request }, use) => {
    const baseURL = process.env.API_BASE_URL || 'https://api.example.com';
    const workshopsService = new WorkshopsService(request, baseURL);
    await use(workshopsService);
  },

  authService: async ({ request }, use) => {
    const baseURL = process.env.API_BASE_URL || 'https://api.example.com';
    const authService = new AuthService(request, baseURL);
    await use(authService);
  },
});

export { expect } from '@playwright/test';

// ============================================================================
// E2E TESTS
// ============================================================================

// tests/e2e/claims/create-claim.spec.ts
import { test, expect } from '../../../src/fixtures/pages.fixture';
import { ClaimFactory } from '../../../src/factories/ClaimFactory';
import { VehicleFactory } from '../../../src/factories/VehicleFactory';
import { UserFactory } from '../../../src/factories/UserFactory';

test.describe('Create Claim', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    // Setup: Login as customer
    const customer = UserFactory.createCustomer();
    await loginPage.navigate();
    await loginPage.login(customer.email, 'Test123!');
  });

  test('should create a new claim successfully', async ({ createClaimPage }) => {
    const claimData = ClaimFactory.create();
    const vehicle = VehicleFactory.createCar();

    await createClaimPage.navigate();
    await createClaimPage.createCompleteClaim({
      vehicleId: vehicle.id,
      incidentDate: claimData.incidentDate,
      description: claimData.description,
      estimatedCost: claimData.estimatedCost,
    });

    // Verify success message
    await expect(createClaimPage.page.locator('[data-testid="success-message"]'))
      .toContainText('Claim submitted successfully');
  });

  test('should save claim as draft', async ({ createClaimPage }) => {
    const claimData = ClaimFactory.createDraft();

    await createClaimPage.navigate();
    await createClaimPage.fillDescription(claimData.description);
    await createClaimPage.saveDraft();

    await expect(createClaimPage.page.locator('[data-testid="draft-indicator"]'))
      .toBeVisible();
  });

  test('should validate required fields', async ({ createClaimPage }) => {
    await createClaimPage.navigate();
    await createClaimPage.submitClaim();

    // Should show validation errors
    await expect(createClaimPage.page.locator('[data-testid="vehicle-error"]'))
      .toContainText('Vehicle is required');
    await expect(createClaimPage.page.locator('[data-testid="description-error"]'))
      .toContainText('Description is required');
  });

  test('should upload images and documents', async ({ createClaimPage }) => {
    const claimData = ClaimFactory.create();
    
    await createClaimPage.navigate();
    await createClaimPage.fillDescription(claimData.description);
    
    // Mock file uploads
    await createClaimPage.uploadImages(['test-image1.jpg', 'test-image2.jpg']);
    await createClaimPage.uploadDocuments(['police-report.pdf']);

    expect(await createClaimPage.getUploadedImagesCount()).toBe(2);
    expect(await createClaimPage.getUploadedDocumentsCount()).toBe(1);
  });

  test('should handle large estimated costs correctly', async ({ createClaimPage }) => {
    const claimData = ClaimFactory.create({ estimatedCost: 50000 });

    await createClaimPage.navigate();
    await createClaimPage.fillDescription(claimData.description);
    await createClaimPage.fillEstimatedCost(claimData.estimatedCost);
    await createClaimPage.submitClaim();

    // Should trigger additional approval workflow for high-value claims
    await expect(createClaimPage.page.locator('[data-testid="high-value-notice"]'))
      .toContainText('This claim requires additional approval');
  });
});

// tests/e2e/claims/claim-lifecycle.spec.ts
import { test, expect } from '../../../src/fixtures/pages.fixture';
import { ClaimFactory } from '../../../src/factories/ClaimFactory';
import { UserFactory } from '../../../src/factories/UserFactory';
import { WorkshopFactory } from '../../../src/factories/WorkshopFactory';
import { ClaimStatus } from '../../../src/utils/enums/ClaimStatus';

test.describe('Claim Lifecycle', () => {
  let customer: any;
  let adjuster: any;
  let workshop: any;
  let claim: any;

  test.beforeEach(async () => {
    customer = UserFactory.createCustomer();
    adjuster = UserFactory.createClaimsAdjuster();
    workshop = WorkshopFactory.create();
    claim = ClaimFactory.create({ customerId: customer.id });
  });

  test('complete claim lifecycle from submission to completion', async ({ page, loginPage }) => {
    // Step 1: Customer creates claim
    await loginPage.navigate();
    await loginPage.login(customer.email, 'Test123!');
    
    await page.goto('/claims/create');
    // ... create claim logic ...
    
    // Step 2: Claims adjuster reviews and approves
    await page.goto('/auth/logout');
    await loginPage.login(adjuster.email, 'Test123!');
    
    await page.goto(`/claims/${claim.id}`);
    await page.locator('[data-testid="approve-claim-button"]').click();
    await page.locator('[data-testid="assign-workshop-select"]').selectOption(workshop.id);
    await page.locator('[data-testid="save-assignment-button"]').click();

    // Verify claim status updated
    await expect(page.locator('[data-testid="claim-status"]'))
      .toContainText('Approved');

    // Step 3: Workshop starts repair
    await page.goto('/auth/logout');
    // Login as workshop manager would go here...
    
    // Step 4: Workshop completes repair
    await page.goto(`/claims/${claim.id}/workshop`);
    await page.locator('[data-testid="mark-completed-button"]').click();
    
    // Step 5: Customer confirms completion
    await page.goto('/auth/logout');
    await loginPage.login(customer.email, 'Test123!');
    
    await page.goto(`/claims/${claim.id}`);
    await page.locator('[data-testid="confirm-completion-button"]').click();

    // Verify final status
    await expect(page.locator('[data-testid="claim-status"]'))
      .toContainText('Completed');
  });

  test('claim rejection workflow', async ({ page, loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(adjuster.email, 'Test123!');
    
    await page.goto(`/claims/${claim.id}`);
    await page.locator('[data-testid="reject-claim-button"]').click();
    
    // Fill rejection reason
    await page.locator('[data-testid="rejection-reason-textarea"]')
      .fill('Insufficient documentation provided');
    await page.locator('[data-testid="confirm-rejection-button"]').click();

    await expect(page.locator('[data-testid="claim-status"]'))
      .toContainText('Rejected');
  });
});

// tests/e2e/workshops/workshop-assignment.spec.ts
import { test, expect } from '../../../src/fixtures/pages.fixture';
import { WorkshopFactory } from '../../../src/factories/WorkshopFactory';
import { ClaimFactory } from '../../../src/factories/ClaimFactory';
import { VehicleType } from '../../../src/utils/enums/VehicleType';

test.describe('Workshop Assignment', () => {
  test('should assign workshop based on specialization', async ({ page, loginPage, workshopListPage }) => {
    const carSpecialistWorkshop = WorkshopFactory.createSpecialist(VehicleType.CAR);
    const truckSpecialistWorkshop = WorkshopFactory.createSpecialist(VehicleType.TRUCK);
    const carClaim = ClaimFactory.create();

    // Login as claims adjuster
    await loginPage.navigate();
    await loginPage.login('adjuster@example.com', 'Test123!');

    await page.goto(`/claims/${carClaim.id}/assign-workshop`);
    
    // Filter workshops by car specialization
    await workshopListPage.filterBySpecialization(VehicleType.CAR);
    
    // Should show car specialist workshop
    await expect(page.locator(`[data-workshop-id="${carSpecialistWorkshop.id}"]`))
      .toBeVisible();
    
    // Should not show truck specialist workshop
    await expect(page.locator(`[data-workshop-id="${truckSpecialistWorkshop.id}"]`))
      .not.toBeVisible();

    // Assign the workshop
    await page.locator(`[data-workshop-id="${carSpecialistWorkshop.id}"] [data-testid="assign-button"]`)
      .click();
    
    await expect(page.locator('[data-testid="assignment-success"]'))
      .toContainText('Workshop assigned successfully');
  });

  test('should consider workshop capacity when assigning', async ({ page, loginPage }) => {
    const fullCapacityWorkshop = WorkshopFactory.create({ 
      capacity: 10, 
      currentLoad: 10 
    });
    const availableWorkshop = WorkshopFactory.create({ 
      capacity: 20, 
      currentLoad: 5 
    });

    await loginPage.navigate();
    await loginPage.login('adjuster@example.com', 'Test123!');

    await page.goto('/workshops');
    
    // Full capacity workshop should show as unavailable
    await expect(page.locator(`[data-workshop-id="${fullCapacityWorkshop.id}"] [data-testid="capacity-status"]`))
      .toContainText('Full');
    
    // Available workshop should be selectable
    await expect(page.locator(`[data-workshop-id="${availableWorkshop.id}"] [data-testid="assign-button"]`))
      .toBeEnabled();
  });
});

// ============================================================================
// API TESTS
// ============================================================================

// tests/api/claims/claims-crud.api.spec.ts
import { apiTest, expect } from '../../../src/fixtures/api.fixture';
import { ClaimFactory } from '../../../src/factories/ClaimFactory';
import { UserFactory } from '../../../src/factories/UserFactory';
import { ClaimStatus } from '../../../src/utils/enums/ClaimStatus';

apiTest.describe('Claims API - CRUD Operations', () => {
  let authToken: string;
  let customer: any;

  apiTest.beforeEach(async ({ authService }) => {
    customer = UserFactory.createCustomer();
    
    // Register and login user
    const registerResponse = await authService.register(customer);
    expect(registerResponse.status()).toBe(201);
    
    const loginResponse = await authService.login(customer.email, 'Test123!');
    expect(loginResponse.status()).toBe(200);
    
    const loginData = await loginResponse.json();
    authToken = loginData.accessToken;
  });

  apiTest('should create a new claim', async ({ claimsService }) => {
    claimsService.setAuthToken(authToken);
    
    const claimData = ClaimFactory.create({ customerId: customer.id });
    delete claimData.id; // Remove ID for creation
    
    const response = await claimsService.createClaim(claimData);
    expect(response.status()).toBe(201);
    
    const createdClaim = await response.json();
    expect(createdClaim.customerId).toBe(customer.id);
    expect(createdClaim.status).toBe(ClaimStatus.SUBMITTED);
    expect(createdClaim.claimNumber).toMatch(/^CLM-\d{6}$/);
  });

  apiTest('should get a claim by ID', async ({ claimsService }) => {
    claimsService.setAuthToken(authToken);
    
    // Create claim first
    const claimData = ClaimFactory.create({ customerId: customer.id });
    delete claimData.id;
    const createResponse = await claimsService.createClaim(claimData);
    const createdClaim = await createResponse.json();
    
    // Get the claim
    const getResponse = await claimsService.getClaim(createdClaim.id);
    expect(getResponse.status()).toBe(200);
    
    const retrievedClaim = await getResponse.json();
    expect(retrievedClaim.id).toBe(createdClaim.id);
    expect(retrievedClaim.description).toBe(claimData.description);
  });

  apiTest('should update a claim', async ({ claimsService }) => {
    claimsService.setAuthToken(authToken);
    
    // Create claim first
    const claimData = ClaimFactory.create({ customerId: customer.id });
    delete claimData.id;
    const createResponse = await claimsService.createClaim(claimData);
    const createdClaim = await createResponse.json();
    
    // Update the claim
    const updatedDescription = 'Updated incident description';
    const updateResponse = await claimsService.updateClaim(createdClaim.id, {
      description: updatedDescription
    });
    expect(updateResponse.status()).toBe(200);
    
    const updatedClaim = await updateResponse.json();
    expect(updatedClaim.description).toBe(updatedDescription);
  });

  apiTest('should delete a claim', async ({ claimsService }) => {
    claimsService.setAuthToken(authToken);
    
    // Create claim first
    const claimData = ClaimFactory.create({ customerId: customer.id });
    delete claimData.id;
    const createResponse = await claimsService.createClaim(claimData);
    const createdClaim = await createResponse.json();
    
    // Delete the claim
    const deleteResponse = await claimsService.deleteClaim(createdClaim.id);
    expect(deleteResponse.status()).toBe(204);
    
    // Verify claim is deleted
    const getResponse = await claimsService.getClaim(createdClaim.id);
    expect(getResponse.status()).toBe(404);
  });

  apiTest('should list claims with filters', async ({ claimsService }) => {
    claimsService.setAuthToken(authToken);
    
    // Create multiple claims
    const claim1 = ClaimFactory.create({ 
      customerId: customer.id, 
      status: ClaimStatus.SUBMITTED 
    });
    const claim2 = ClaimFactory.create({ 
      customerId: customer.id, 
      status: ClaimStatus.APPROVED 
    });
    
    delete claim1.id;
    delete claim2.id;
    
    await claimsService.createClaim(claim1);
    await claimsService.createClaim(claim2);
    
    // Get claims with status filter
    const response = await claimsService.getClaims({ 
      customerId: customer.id,
      status: ClaimStatus.SUBMITTED 
    });
    expect(response.status()).toBe(200);
    
    const claims = await response.json();
    expect(claims.data).toHaveLength(1);
    expect(claims.data[0].status).toBe(ClaimStatus.SUBMITTED);
  });
});

// tests/api/claims/claims-validation.api.spec.ts
import { apiTest, expect } from '../../../src/fixtures/api.fixture';
import { ClaimFactory } from '../../../src/factories/ClaimFactory';

apiTest.describe('Claims API - Validation', () => {
  let authToken: string;

  apiTest.beforeEach(async ({ authService }) => {
    const loginResponse = await authService.login('test@example.com', 'Test123!');
    const loginData = await loginResponse.json();
    authToken = loginData.accessToken;
  });

  apiTest('should validate required fields when creating claim', async ({ claimsService }) => {
    claimsService.setAuthToken(authToken);
    
    const response = await claimsService.createClaim({});
    expect(response.status()).toBe(400);
    
    const error = await response.json();
    expect(error.errors).toContain('customerId is required');
    expect(error.errors).toContain('vehicleId is required');
    expect(error.errors).toContain('description is required');
  });

  apiTest('should validate estimated cost range', async ({ claimsService }) => {
    claimsService.setAuthToken(authToken);
    
    const claimData = ClaimFactory.create({ estimatedCost: -100 });
    delete claimData.id;
    
    const response = await claimsService.createClaim(claimData);
    expect(response.status()).toBe(400);
    
    const error = await response.json();
    expect(error.errors).toContain('estimatedCost must be greater than 0');
  });

  apiTest('should validate incident date not in future', async ({ claimsService }) => {
    claimsService.setAuthToken(authToken);
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    
    const claimData = ClaimFactory.create({ incidentDate: futureDate });
    delete claimData.id;
    
    const response = await claimsService.createClaim(claimData);
    expect(response.status()).toBe(400);
    
    const error = await response.json();
    expect(error.errors).toContain('incidentDate cannot be in the future');
  });
});

// tests/api/workshops/workshops-crud.api.spec.ts
import { apiTest, expect } from '../../../src/fixtures/api.fixture';
import { WorkshopFactory } from '../../../src/factories/WorkshopFactory';
import { UserFactory } from '../../../src/factories/UserFactory';
import { VehicleType } from '../../../src/utils/enums/VehicleType';

apiTest.describe('Workshops API - CRUD Operations', () => {
  let authToken: string;
  let admin: any;

  apiTest.beforeEach(async ({ authService }) => {
    admin = UserFactory.createAdmin();
    
    const registerResponse = await authService.register(admin);
    expect(registerResponse.status()).toBe(201);
    
    const loginResponse = await authService.login(admin.email, 'Test123!');
    expect(loginResponse.status()).toBe(200);
    
    const loginData = await loginResponse.json();
    authToken = loginData.accessToken;
  });

  apiTest('should create a new workshop', async ({ workshopsService }) => {
    workshopsService.setAuthToken(authToken);
    
    const workshopData = WorkshopFactory.create();
    delete workshopData.id;
    
    const response = await workshopsService.createWorkshop(workshopData);
    expect(response.status()).toBe(201);
    
    const createdWorkshop = await response.json();
    expect(createdWorkshop.name).toBe(workshopData.name);
    expect(createdWorkshop.registrationNumber).toMatch(/^WS-\d{5}$/);
    expect(createdWorkshop.isActive).toBe(true);
  });

  apiTest('should get workshops with location filter', async ({ workshopsService }) => {
    workshopsService.setAuthToken(authToken);
    
    // Create workshops in different cities
    const nyWorkshop = WorkshopFactory.create();
    nyWorkshop.address.city =