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
    nyWorkshop.address.city = 'New York';
    delete nyWorkshop.id;
    
    const laWorkshop = WorkshopFactory.create();
    laWorkshop.address.city = 'Los Angeles';
    delete laWorkshop.id;
    
    await workshopsService.createWorkshop(nyWorkshop);
    await workshopsService.createWorkshop(laWorkshop);
    
    // Filter by city
    const response = await workshopsService.getWorkshops({ city: 'New York' });
    expect(response.status()).toBe(200);
    
    const workshops = await response.json();
    expect(workshops.data).toHaveLength(1);
    expect(workshops.data[0].address.city).toBe('New York');
  });

  apiTest('should check workshop availability', async ({ workshopsService }) => {
    workshopsService.setAuthToken(authToken);
    
    const workshopData = WorkshopFactory.create({ capacity: 20, currentLoad: 15 });
    delete workshopData.id;
    const createResponse = await workshopsService.createWorkshop(workshopData);
    const workshop = await createResponse.json();
    
    const availabilityResponse = await workshopsService.checkAvailability(
      workshop.id, 
      '2024-12-01'
    );
    expect(availabilityResponse.status()).toBe(200);
    
    const availability = await availabilityResponse.json();
    expect(availability.available).toBe(true);
    expect(availability.availableSlots).toBe(5);
  });

  apiTest('should update workshop capacity', async ({ workshopsService }) => {
    workshopsService.setAuthToken(authToken);
    
    const workshopData = WorkshopFactory.create();
    delete workshopData.id;
    const createResponse = await workshopsService.createWorkshop(workshopData);
    const workshop = await createResponse.json();
    
    const newCapacity = 50;
    const updateResponse = await workshopsService.updateCapacity(workshop.id, newCapacity);
    expect(updateResponse.status()).toBe(200);
    
    const updatedWorkshop = await updateResponse.json();
    expect(updatedWorkshop.capacity).toBe(newCapacity);
  });
});

// ============================================================================
// PERFORMANCE TESTS
// ============================================================================

// tests/performance/claims-load.spec.ts
import { test, expect } from '@playwright/test';
import { ClaimsService } from '../../src/services/api/ClaimsService';
import { ClaimFactory } from '../../src/factories/ClaimFactory';

test.describe('Claims Performance Tests', () => {
  test('should handle concurrent claim creation', async ({ request }) => {
    const claimsService = new ClaimsService(request, process.env.API_BASE_URL!);
    
    // Mock authentication
    claimsService.setAuthToken('mock-auth-token');
    
    const claimPromises = [];
    const numberOfClaims = 50;
    
    // Create multiple claims concurrently
    for (let i = 0; i < numberOfClaims; i++) {
      const claimData = ClaimFactory.create();
      delete claimData.id;
      claimPromises.push(claimsService.createClaim(claimData));
    }
    
    const startTime = Date.now();
    const responses = await Promise.all(claimPromises);
    const endTime = Date.now();
    
    // Verify all claims were created successfully
    responses.forEach(response => {
      expect(response.status()).toBe(201);
    });
    
    // Performance assertion: should complete within 10 seconds
    const totalTime = endTime - startTime;
    expect(totalTime).toBeLessThan(10000);
    
    console.log(`Created ${numberOfClaims} claims in ${totalTime}ms`);
    console.log(`Average time per claim: ${totalTime / numberOfClaims}ms`);
  });

  test('should handle large claims list efficiently', async ({ request }) => {
    const claimsService = new ClaimsService(request, process.env.API_BASE_URL!);
    claimsService.setAuthToken('mock-auth-token');
    
    const startTime = Date.now();
    
    // Fetch large number of claims with pagination
    const response = await claimsService.getClaims({ 
      page: 1, 
      limit: 1000 
    });
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(3000); // Should respond within 3 seconds
    
    const claims = await response.json();
    console.log(`Fetched ${claims.data.length} claims in ${responseTime}ms`);
  });
});

// tests/performance/dashboard-performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Dashboard Performance', () => {
  test('should load dashboard within acceptable time', async ({ page }) => {
    // Mock authentication
    await page.goto('/auth/login');
    await page.fill('[data-testid="email-input"]', 'admin@example.com');
    await page.fill('[data-testid="password-input"]', 'Test123!');
    await page.click('[data-testid="login-button"]');
    
    // Measure dashboard load time
    const startTime = Date.now();
    
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // Dashboard should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    // Verify critical elements are loaded
    await expect(page.locator('[data-testid="claims-summary"]')).toBeVisible();
    await expect(page.locator('[data-testid="workshops-summary"]')).toBeVisible();
    await expect(page.locator('[data-testid="recent-activities"]')).toBeVisible();
    
    console.log(`Dashboard loaded in ${loadTime}ms`);
  });

  test('should handle dashboard with large datasets', async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('[data-testid="email-input"]', 'admin@example.com');
    await page.fill('[data-testid="password-input"]', 'Test123!');
    await page.click('[data-testid="login-button"]');
    
    // Navigate to dashboard with query parameter to load large dataset
    await page.goto('/dashboard?loadTestData=true');
    
    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const endTime = Date.now();
    
    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(8000); // Allow more time for large dataset
    
    // Verify pagination or virtual scrolling is working
    const claimsTable = page.locator('[data-testid="claims-table"]');
    await expect(claimsTable).toBeVisible();
    
    // Should show pagination controls for large datasets
    const pagination = page.locator('[data-testid="pagination"]');
    await expect(pagination).toBeVisible();
  });
});

// ============================================================================
// CONFIGURATION FILES
// ============================================================================

// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'https://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    // API Tests
    {
      name: 'api-tests',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        baseURL: process.env.API_BASE_URL || 'https://api.localhost:3000',
      },
    },
    
    // E2E Tests - Desktop
    {
      name: 'e2e-chromium',
      testMatch: '**/e2e/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['api-tests'], // Run API tests first
    },
    {
      name: 'e2e-firefox',
      testMatch: '**/e2e/**/*.spec.ts',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['api-tests'],
    },
    {
      name: 'e2e-webkit',
      testMatch: '**/e2e/**/*.spec.ts',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['api-tests'],
    },
    
    // Mobile E2E Tests
    {
      name: 'mobile-chrome',
      testMatch: '**/e2e/**/*.spec.ts',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      testMatch: '**/e2e/**/*.spec.ts',
      use: { ...devices['iPhone 12'] },
    },
    
    // Performance Tests
    {
      name: 'performance',
      testMatch: '**/performance/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
      timeout: 60000, // Longer timeout for performance tests
    },
  ],

  webServer: [
    {
      command: 'npm run start:test-server',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
    {
      command: 'npm run start:api-server',
      url: 'http://localhost:3001/health',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    }
  ],
});

// package.json scripts section
/*
{
  "scripts": {
    "test": "playwright test",
    "test:e2e": "playwright test --grep=e2e",
    "test:api": "playwright test --grep=api",
    "test:performance": "playwright test --grep=performance",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "test:codegen": "playwright codegen",
    "test:report": "playwright show-report",
    "test:allure": "allure generate allure-results --clean && allure open",
    "test:parallel": "playwright test --workers=8",
    "test:shard": "playwright test --shard=",
    "start:test-server": "NODE_ENV=test npm run build && npm run start",
    "start:api-server": "NODE_ENV=test npm run api:start"
  }
}
*/

// .github/workflows/e2e-tests.yml
/*
name: E2E Tests
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      matrix:
        project: [e2e-chromium, e2e-firefox, e2e-webkit]
        shard: [1/4, 2/4, 3/4, 4/4]
        
    steps:
    - uses: actions/checkout@v4
    
    - uses: actions/setup-node@v4
      with:
        node-version: 18
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
      
    - name: Setup test database
      run: |
        docker run -d --name test-db \
          -e POSTGRES_DB=claims_test \
          -e POSTGRES_USER=test \
          -e POSTGRES_PASSWORD=test \
          -p 5432:5432 postgres:14
          
    - name: Wait for database
      run: npx wait-on tcp:5432
      
    - name: Run database migrations
      run: npm run db:migrate:test
      
    - name: Seed test data
      run: npm run db:seed:test
      
    - name: Run Playwright tests
      run: npx playwright test --project=${{ matrix.project }} --shard=${{ matrix.shard }}
      env:
        BASE_URL: http://localhost:3000
        API_BASE_URL: http://localhost:3001
        DATABASE_URL: postgresql://test:test@localhost:5432/claims_test
        
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report-${{ matrix.project }}-${{ matrix.shard }}
        path: playwright-report/
        retention-days: 30
        
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: test-results-${{ matrix.project }}-${{ matrix.shard }}
        path: test-results/
        retention-days: 30

  api-tests:
    timeout-minutes: 30
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 18
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Setup test database
      run: |
        docker run -d --name test-db \
          -e POSTGRES_DB=claims_test \
          -e POSTGRES_USER=test \
          -e POSTGRES_PASSWORD=test \
          -p 5432:5432 postgres:14
          
    - name: Run API tests
      run: npx playwright test --project=api-tests
      env:
        API_BASE_URL: http://localhost:3001
        DATABASE_URL: postgresql://test:test@localhost:5432/claims_test

  performance-tests:
    timeout-minutes: 45
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 18
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Install Playwright Browsers
      run: npx playwright install chromium
      
    - name: Run performance tests
      run: npx playwright test --project=performance
      env:
        BASE_URL: http://localhost:3000
        API_BASE_URL: http://localhost:3001
        
    - name: Upload performance results
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: performance-report
        path: performance-report/
        retention-days: 30
*/

// ============================================================================
// UTILITIES AND HELPERS
// ============================================================================

// src/utils/helpers/dateHelper.ts
export class DateHelper {
  static formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day);
  }
  
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  static isBusinessDay(date: Date): boolean {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Not Sunday (0) or Saturday (6)
  }
  
  static getNextBusinessDay(date: Date): Date {
    let nextDay = this.addDays(date, 1);
    while (!this.isBusinessDay(nextDay)) {
      nextDay = this.addDays(nextDay, 1);
    }
    return nextDay;
  }
}

// src/utils/helpers/validationHelper.ts
export class ValidationHelper {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static isValidVIN(vin: string): boolean {
    // VIN should be 17 characters, excluding I, O, Q
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    return vinRegex.test(vin);
  }
  
  static isValidPhoneNumber(phone: string): boolean {
    // Simple US phone number validation
    const phoneRegex = /^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  }
  
  static isValidLicensePlate(plate: string): boolean {
    // Generic license plate validation (3-8 alphanumeric characters)
    const plateRegex = /^[A-Z0-9]{3,8}$/;
    return plateRegex.test(plate.toUpperCase());
  }
  
  static validateCurrency(amount: number, min: number = 0, max: number = 1000000): boolean {
    return amount >= min && amount <= max && Number.isFinite(amount);
  }
}

// src/utils/helpers/reportHelper.ts
export class ReportHelper {
  static generateClaimReport(claims: any[]): any {
    const totalClaims = claims.length;
    const statusDistribution = claims.reduce((acc, claim) => {
      acc[claim.status] = (acc[claim.status] || 0) + 1;
      return acc;
    }, {});
    
    const totalEstimatedCost = claims.reduce((sum, claim) => sum + claim.estimatedCost, 0);
    const averageCost = totalClaims > 0 ? totalEstimatedCost / totalClaims : 0;
    
    const highValueClaims = claims.filter(claim => claim.estimatedCost > 10000);
    
    return {
      totalClaims,
      statusDistribution,
      totalEstimatedCost,
      averageCost,
      highValueClaimsCount: highValueClaims.length,
      highValueClaimsPercentage: totalClaims > 0 ? (highValueClaims.length / totalClaims) * 100 : 0
    };
  }
  
  static generateWorkshopPerformanceReport(workshops: any[]): any {
    const totalWorkshops = workshops.length;
    const activeWorkshops = workshops.filter(w => w.isActive).length;
    
    const capacityUtilization = workshops.map(w => ({
      workshopId: w.id,
      name: w.name,
      utilization: w.capacity > 0 ? (w.currentLoad / w.capacity) * 100 : 0
    }));
    
    const averageUtilization = capacityUtilization.reduce((sum, w) => sum + w.utilization, 0) / totalWorkshops;
    
    const topPerformers = capacityUtilization
      .filter(w => w.utilization <= 100) // Exclude over-capacity
      .sort((a, b) => b.utilization - a.utilization)
      .slice(0, 5);
    
    return {
      totalWorkshops,
      activeWorkshops,
      averageUtilization,
      topPerformers,
      overCapacityCount: capacityUtilization.filter(w => w.utilization > 100).length
    };
  }
}

// ============================================================================
// ADVANCED COMPONENTS AND PAGES
// ============================================================================

// src/components/tables/ClaimsTable.ts
import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';

export class ClaimsTable extends BaseComponent {
  private readonly tableRows: Locator;
  private readonly headerCells: Locator;
  private readonly sortButtons: Locator;
  private readonly filterInputs: Locator;
  private readonly paginationInfo: Locator;

  constructor(page: Page, containerSelector: string = '[data-testid="claims-table"]') {
    super(page, containerSelector);
    this.tableRows = this.container.locator('tbody tr');
    this.headerCells = this.container.locator('thead th');
    this.sortButtons = this.container.locator('[data-testid*="sort-button"]');
    this.filterInputs = this.container.locator('[data-testid*="filter-input"]');
    this.paginationInfo = this.container.locator('[data-testid="pagination-info"]');
  }

  async getRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  async getCellValue(row: number, column: string): Promise<string> {
    const cell = this.tableRows.nth(row).locator(`[data-column="${column}"]`);
    return await cell.textContent() || '';
  }

  async sortByColumn(columnName: string, direction: 'asc' | 'desc' = 'asc'): Promise<void> {
    const sortButton = this.container.locator(`[data-testid="sort-${columnName}"]`);
    
    // Click to sort ascending first
    await sortButton.click();
    
    // If we want descending, click again
    if (direction === 'desc') {
      await sortButton.click();
    }
    
    await this.page.waitForTimeout(1000); // Wait for sort to complete
  }

  async filterByColumn(columnName: string, value: string): Promise<void> {
    const filterInput = this.container.locator(`[data-testid="filter-${columnName}"]`);
    await filterInput.fill(value);
    await filterInput.press('Enter');
    await this.page.waitForTimeout(1000); // Wait for filter to apply
  }

  async selectRow(rowIndex: number): Promise<void> {
    const checkbox = this.tableRows.nth(rowIndex).locator('input[type="checkbox"]');
    await checkbox.check();
  }

  async selectAllRows(): Promise<void> {
    const selectAllCheckbox = this.container.locator('thead input[type="checkbox"]');
    await selectAllCheckbox.check();
  }

  async getSelectedRowsCount(): Promise<number> {
    const selectedCheckboxes = this.container.locator('tbody input[type="checkbox"]:checked');
    return await selectedCheckboxes.count();
  }

  async clickRowAction(rowIndex: number, action: string): Promise<void> {
    const actionButton = this.tableRows.nth(rowIndex).locator(`[data-testid="${action}-button"]`);
    await actionButton.click();
  }

  async bulkAction(action: string): Promise<void> {
    const bulkActionButton = this.container.locator(`[data-testid="bulk-${action}"]`);
    await bulkActionButton.click();
  }

  async goToPage(pageNumber: number): Promise<void> {
    const pageButton = this.container.locator(`[data-testid="page-${pageNumber}"]`);
    await pageButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentPageInfo(): Promise<{ current: number; total: number; showing: string }> {
    const infoText = await this.paginationInfo.textContent() || '';
    const match = infoText.match(/Showing (\d+-\d+) of (\d+) \| Page (\d+) of (\d+)/);
    
    return {
      current: match ? parseInt(match[3]) : 1,
      total: match ? parseInt(match[4]) : 1,
      showing: match ? match[1] : '0-0'
    };
  }
}

// src/components/base/BaseComponent.ts
import { Page, Locator } from '@playwright/test';

export abstract class BaseComponent {
  protected page: Page;
  protected container: Locator;

  constructor(page: Page, containerSelector: string) {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  async isVisible(): Promise<boolean> {
    try {
      await this.container.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async waitForVisible(): Promise<void> {
    await this.container.waitFor({ state: 'visible' });
  }

  async waitForHidden(): Promise<void> {
    await this.container.waitFor({ state: 'hidden' });
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.container.screenshot({ 
      path: `screenshots/components/${name}-${Date.now()}.png` 
    });
  }
}

// src/pages/dashboard/AdminDashboard.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { ClaimsTable } from '../../components/tables/ClaimsTable';

export class AdminDashboard extends BasePage {
  private readonly claimsTable: ClaimsTable;
  private readonly claimsSummaryCard: Locator;
  private readonly workshopsSummaryCard: Locator;
  private readonly revenueCard: Locator;
  private readonly recentActivities: Locator;
  private readonly performanceChart: Locator;
  private readonly dateRangePicker: Locator;
  private readonly exportButton: Locator;
  private readonly refreshButton: Locator;

  constructor(page: Page) {
    super(page, '/admin/dashboard');
    this.claimsTable = new ClaimsTable(page);
    this.claimsSummaryCard = page.locator('[data-testid="claims-summary-card"]');
    this.workshopsSummaryCard = page.locator('[data-testid="workshops-summary-card"]');
    this.revenueCard = page.locator('[data-testid="revenue-card"]');
    this.recentActivities = page.locator('[data-testid="recent-activities"]');
    this.performanceChart = page.locator('[data-testid="performance-chart"]');
    this.dateRangePicker = page.locator('[data-testid="date-range-picker"]');
    this.exportButton = page.locator('[data-testid="export-button"]');
    this.refreshButton = page.locator('[data-testid="refresh-button"]');
  }

  async getDashboardMetrics(): Promise<{
    totalClaims: number;
    pendingClaims: number;
    totalWorkshops: number;
    activeWorkshops: number;
    monthlyRevenue: number;
  }> {
    await this.waitForPageLoad();
    
    const claimsText = await this.claimsSummaryCard.locator('[data-testid="total-claims"]').textContent();
    const pendingText = await this.claimsSummaryCard.locator('[data-testid="pending-claims"]').textContent();
    const workshopsText = await this.workshopsSummaryCard.locator('[data-testid="total-workshops"]').textContent();
    const activeText = await this.workshopsSummaryCard.locator('[data-testid="active-workshops"]').textContent();
    const revenueText = await this.revenueCard.locator('[data-testid="monthly-revenue"]').textContent();

    return {
      totalClaims: parseInt(claimsText?.replace(/,/g, '') || '0'),
      pendingClaims: parseInt(pendingText?.replace(/,/g, '') || '0'),
      totalWorkshops: parseInt(workshopsText?.replace(/,/g, '') || '0'),
      activeWorkshops: parseInt(activeText?.replace(/,/g, '') || '0'),
      monthlyRevenue: parseFloat(revenueText?.replace(/[$,]/g, '') || '0')
    };
  }

  async setDateRange(startDate: string, endDate: string): Promise<void> {
    await this.dateRangePicker.click();
    await this.page.locator('[data-testid="start-date-input"]').fill(startDate);
    await this.page.locator('[data-testid="end-date-input"]').fill(endDate);
    await this.page.locator('[data-testid="apply-date-range"]').click();
    await this.waitForPageLoad();
  }

  async exportReport(format: 'pdf' | 'excel' | 'csv'): Promise<void> {
    await this.exportButton.click();
    await this.page.locator(`[data-testid="export-${format}"]`).click();
    
    // Wait for download to start
    await this.page.waitForTimeout(2000);
  }

  async refreshDashboard(): Promise<void> {
    await this.refreshButton.click();
    await this.waitForPageLoad();
  }

  async getRecentActivities(): Promise<Array<{
    activity: string;
    user: string;
    timestamp: string;
  }>> {
    const activities = [];
    const activityItems = this.recentActivities.locator('[data-testid="activity-item"]');
    const count = await activityItems.count();

    for (let i = 0; i < count; i++) {
      const item = activityItems.nth(i);
      const activity = await item.locator('[data-testid="activity-text"]').textContent();
      const user = await item.locator('[data-testid="activity-user"]').textContent();
      const timestamp = await item.locator('[data-testid="activity-timestamp"]').textContent();

      activities.push({
        activity: activity || '',
        user: user || '',
        timestamp: timestamp || ''
      });
    }

    return activities;
  }

  getClaimsTable(): ClaimsTable {
    return this.claimsTable;
  }
}

// src/pages/claims/ClaimDetailsPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { ClaimStatus } from '../../utils/enums/ClaimStatus';

export class ClaimDetailsPage extends BasePage {
  private readonly claimNumber: Locator;
  private readonly claimStatus: Locator;
  private readonly customerInfo: Locator;
  private readonly vehicleInfo: Locator;
  private readonly incidentDetails: Locator;
  private readonly imagesGallery: Locator;
  private readonly documentsSection: Locator;
  private readonly timelineSection: Locator;
  private readonly commentsSection: Locator;
  private readonly statusChangeButtons: Locator;
  private readonly assignWorkshopButton: Locator;
  private readonly addCommentButton: Locator;
  private readonly editClaimButton: Locator;

  constructor(page: Page) {
    super(page);
    this.claimNumber = page.locator('[data-testid="claim-number"]');
    this.claimStatus = page.locator('[data-testid="claim-status"]');
    this.customerInfo = page.locator('[data-testid="customer-info"]');
    this.vehicleInfo = page.locator('[data-testid="vehicle-info"]');
    this.incidentDetails = page.locator('[data-testid="incident-details"]');
    this.imagesGallery = page.locator('[data-testid="images-gallery"]');
    this.documentsSection = page.locator('[data-testid="documents-section"]');
    this.timelineSection = page.locator('[data-testid="timeline-section"]');
    this.commentsSection = page.locator('[data-testid="comments-section"]');
    this.statusChangeButtons = page.locator('[data-testid*="status-change"]');
    this.assignWorkshopButton = page.locator('[data-testid="assign-workshop-button"]');
    this.addCommentButton = page.locator('[data-testid="add-comment-button"]');
    this.editClaimButton = page.locator('[data-testid="edit-claim-button"]');
  }

  async getClaimDetails(): Promise<{
    number: string;
    status: string;
    customer: string;
    vehicle: string;
    incidentDate: string;
    estimatedCost: string;
  }> {
    return {
      number: await this.claimNumber.textContent() || '',
      status: await this.claimStatus.textContent() || '',
      customer: await this.customerInfo.locator('[data-testid="customer-name"]').textContent() || '',
      vehicle: await this.vehicleInfo.locator('[data-testid="vehicle-info-text"]').textContent() || '',
      incidentDate: await this.incidentDetails.locator('[data-testid="incident-date"]').textContent() || '',
      estimatedCost: await this.incidentDetails.locator('[data-testid="estimated-cost"]').textContent() || ''
    };
  }

  async changeStatus(newStatus: ClaimStatus): Promise<void> {
    const statusButton = this.page.locator(`[data-testid="change-status-${newStatus.toLowerCase()}"]`);
    await statusButton.click();
    
    if (newStatus === ClaimStatus.REJECTED) {
      await this.page.locator('[data-testid="rejection-reason-textarea"]')
        .fill('Claim rejected due to policy violation');
    }
    
    await this.page.locator('[data-testid="confirm-status-change"]').click();
    await this.waitForToast('Status updated successfully');
  }

  async assignWorkshop(workshopId: string): Promise<void> {
    await this.assignWorkshopButton.click();
    await this.page.locator('[data-testid="workshop-select"]').selectOption(workshopId);
    await this.page.locator('[data-testid="confirm-assignment"]').click();
    await this.waitForToast('Workshop assigned successfully');
  }

  async addComment(comment: string, isInternal: boolean = false): Promise<void> {
    await this.addCommentButton.click();
    await this.page.locator('[data-testid="comment-textarea"]').fill(comment);
    
    if (isInternal) {
      await this.page.locator('[data-testid="internal-comment-checkbox"]').check();
    }
    
    await this.page.locator('[data-testid="submit-comment"]').click();
    await this.waitForToast('Comment added successfully');
  }

  async getTimelineEvents(): Promise<Array<{
    event: string;
    timestamp: string;
    user: string;
  }>> {
    const events = [];
    const timelineItems = this.timelineSection.locator('[data-testid="timeline-item"]');
    const count = await timelineItems.count();

    for (let i = 0; i < count; i++) {
      const item = timelineItems.nth(i);
      const event = await item.locator('[data-testid="event-description"]').textContent();
      const timestamp = await item.locator('[data-testid="event-timestamp"]').textContent();
      const user = await item.locator('[data-testid="event-user"]').textContent();

      events.push({
        event: event || '',
        timestamp: timestamp || '',
        user: user || ''
      });
    }

    return events;
  }

  async downloadDocument(documentName: string): Promise<void> {
    const documentLink = this.documentsSection.locator(`[data-document-name="${documentName}"]`);
    await documentLink.click();
    
    // Wait for download to start
    await this.page.waitForTimeout(2000);
  }

  async viewImage(imageIndex: number): Promise<void> {
    const imageThumb = this.imagesGallery.locator('[data-testid="image-thumbnail"]').nth(imageIndex);
    await imageThumb.click();
    
    // Wait for modal to open
    await this.page.locator('[data-testid="image-modal"]').waitFor({ state: 'visible' });
  }
}

// ============================================================================
// ADVANCED INTEGRATION TESTS
// ============================================================================

// tests/e2e/integration/claim-workshop-integration.spec.ts
import { test, expect } from '../../../src/fixtures/pages.fixture';
import { ClaimFactory } from '../../../src/factories/ClaimFactory';
import { WorkshopFactory } from '../../../src/factories/WorkshopFactory';
import { VehicleFactory } from '../../../src/factories/VehicleFactory';
import { UserFactory } from '../../../src/factories/UserFactory';
import { ClaimStatus } from '../../../src/utils/enums/ClaimStatus';
import { VehicleType } from '../../../src/utils/enums/VehicleType';

test.describe('Claim-Workshop Integration', () => {
  let customer: any;
  let adjuster: any;
  let workshopManager: any;
  let vehicle: any;
  let workshops: any[];

  test.beforeEach(async () => {
    customer = UserFactory.createCustomer();
    adjuster = UserFactory.createClaimsAdjuster();
    workshopManager = UserFactory.createWorkshopManager();
    vehicle = VehicleFactory.createCar();
    
    workshops = [
      WorkshopFactory.createSpecialist(VehicleType.CAR),
      WorkshopFactory.createSpecialist(VehicleType.TRUCK),
      WorkshopFactory.createHighCapacity()
    ];
  });

  test('end-to-end claim processing with automatic workshop assignment', async ({ 
    page, 
    loginPage, 
    createClaimPage 
  }) => {
    // Step 1: Customer creates claim
    await loginPage.navigate();
    await loginPage.login(customer.email, 'Test123!');
    
    const claimData = ClaimFactory.create({
      customerId: customer.id,
      vehicleId: vehicle.id
    });

    await createClaimPage.navigate();
    await createClaimPage.createCompleteClaim(claimData);
    
    // Get claim number from success message or URL
    const claimUrl = page.url();
    const claimId = claimUrl.split('/').pop();

    // Step 2: System automatically suggests workshops based on vehicle type and location
    await page.goto('/auth/logout');
    await loginPage.login(adjuster.email, 'Test123!');
    
    await page.goto(`/claims/${claimId}/assign-workshop`);
    
    // Verify only car specialists are shown for car claim
    const carSpecialistWorkshop = workshops.find(w => 
      w.specializations.includes(VehicleType.CAR)
    );
    
    await expect(page.locator(`[data-workshop-id="${carSpecialistWorkshop.id}"]`))
      .toBeVisible();
    
    // Truck specialist should not be shown
    const truckSpecialistWorkshop = workshops.find(w => 
      w.specializations.includes(VehicleType.TRUCK) && 
      !w.specializations.includes(VehicleType.CAR)
    );
    
    await expect(page.locator(`[data-workshop-id="${truckSpecialistWorkshop.id}"]`))
      .not.toBeVisible();

    // Step 3: Adjuster assigns workshop
    await page.locator(`[data-workshop-id="${carSpecialistWorkshop.id}"] [data-testid="assign-button"]`)
      .click();
    
    await expect(page.locator('[data-testid="assignment-success"]'))
      .toContainText('Workshop assigned successfully');

    // Step 4: Workshop receives notification and accepts
    await page.goto('/auth/logout');
    await loginPage.login(workshopManager.email, 'Test123!');
    
    await page.goto('/workshop/dashboard');
    
    // Should see new claim assignment
    await expect(page.locator(`[data-claim-id="${claimId}"]`))
      .toBeVisible();
    
    await page.locator(`[data-claim-id="${claimId}"] [data-testid="accept-claim"]`)
      .click();

    // Step 5: Workshop updates repair progress
    await page.goto(`/claims/${claimId}/workshop`);
    
    await page.locator('[data-testid="start-repair-button"]').click();
    await expect(page.locator('[data-testid="claim-status"]'))
      .toContainText('In Repair');
    
    // Add repair notes
    await page.locator('[data-testid="repair-notes-textarea"]')
      .fill('Started repair work on front bumper and headlight');
    await page.locator('[data-testid="save-notes-button"]').click();

    // Step 6: Workshop completes repair
    await page.locator('[data-testid="complete-repair-button"]').click();
    
    // Fill completion form
    await page.locator('[data-testid="actual-cost-input"]').fill('2500');
    await page.locator('[data-testid="completion-notes-textarea"]')
      .fill('Repair completed successfully. All parts replaced and tested.');
    await page.locator('[data-testid="confirm-completion"]').click();

    await expect(page.locator('[data-testid="claim-status"]'))
      .toContainText('Completed');

    // Step 7: Customer receives notification and confirms
    await page.goto('/auth/logout');
    await loginPage.login(customer.email, 'Test123!');
    
    await page.goto(`/claims/${claimId}`);
    
    // Customer should see completion notification
    await expect(page.locator('[data-testid="completion-notification"]'))
      .toBeVisible();
    
    await page.locator('[data-testid="confirm-satisfaction"]').click();
    
    // Final status should be closed
    await expect(page.locator('[data-testid="claim-status"]'))
      .toContainText('Closed');
  });

  test('workshop capacity management during peak times', async ({ page, loginPage }) => {
    // Create multiple claims for the same workshop
    const claims = [
      ClaimFactory.create({ customerId: customer.id }),
      ClaimFactory.create({ customerId: customer.id }),
      ClaimFactory.create({ customerId: customer.id })
    ];

    const targetWorkshop = workshops[0]; // Assuming this has limited capacity

    await loginPage.navigate();
    await loginPage.login(adjuster.email, 'Test123!');

    // Assign multiple claims to same workshop
    for (const claim of claims) {
      await page.goto(`/claims/${claim.id}/assign-workshop`);
      
      const workshopCard = page.locator(`[data-workshop-id="${targetWorkshop.id}"]`);
      
      // Check if workshop has capacity
      const capacityInfo = await workshopCard.locator('[data-testid="capacity-info"]')
        .textContent();
      
      if (capacityInfo?.includes('Available')) {
        await workshopCard.locator('[data-testid="assign-button"]').click();
        await expect(page.locator('[data-testid="assignment-success"]'))
          .toBeVisible();
      } else {
        // Should show capacity warning
        await expect(workshopCard.locator('[data-testid="capacity-warning"]'))
          .toContainText('Workshop at full capacity');
        
        // Suggest alternative workshops
        await expect(page.locator('[data-testid="alternative-workshops"]'))
          .toBeVisible();
      }
    }
  });

  test('emergency claim prioritization', async ({ page, loginPage }) => {
    const emergencyClaim = ClaimFactory.create({
      customerId: customer.id,
      description: 'EMERGENCY: Severe accident, vehicle totaled',
      estimatedCost: 25000 // High value emergency
    });

    await loginPage.navigate();
    await loginPage.login(adjuster.email, 'Test123!');

    await page.goto(`/claims/${emergencyClaim.id}`);
    
    // Mark as emergency
    await page.locator('[data-testid="emergency-flag-button"]').click();
    await page.locator('[data-testid="confirm-emergency"]').click();

    // Should show emergency indicators
    await expect(page.locator('[data-testid="emergency-badge"]'))
      .toBeVisible();
    
    // Emergency claims should appear at top of assignment queue
    await page.goto('/claims/assign-workshop');
    
    const firstClaim = page.locator('[data-testid="claim-row"]').first();
    await expect(firstClaim.locator('[data-testid="emergency-indicator"]'))
      .toBeVisible();
  });
});

// tests/e2e/integration/insurance-integration.spec.ts
import { test, expect } from '../../../src/fixtures/pages.fixture';

test.describe('Insurance API Integration', () => {
  test('validate insurance policy during claim creation', async ({ 
    page, 
    loginPage, 
    createClaimPage 
  }) => {
    const customer = UserFactory.createCustomer();
    const vehicle = VehicleFactory.createCar();

    await loginPage.navigate();
    await loginPage.login(customer.email, 'Test123!');

    await createClaimPage.navigate();
    await createClaimPage.selectVehicle(vehicle.id);
    
    // Should automatically validate insurance policy
    await expect(page.locator('[data-testid="insurance-validation"]'))
      .toContainText('Policy validated');
    
    // Should show policy details
    await expect(page.locator('[data-testid="policy-details"]'))
      .toContainText(vehicle.insurancePolicyNumber);
    
    // Should show coverage limits
    const coverageInfo = page.locator('[data-testid="coverage-info"]');
    await expect(coverageInfo).toBeVisible();
    
    const deductible = await coverageInfo.locator('[data-testid="deductible"]')
      .textContent();
    expect(deductible).toMatch(/\$\d+/);
  });

  test('handle insurance policy expiration', async ({ page, loginPage }) => {
    const expiredVehicle = VehicleFactory.create({
      insurancePolicyNumber: 'EXPIRED-POLICY-123'
    });

    await loginPage.navigate();
    await loginPage.login('customer@example.com', 'Test123!');

    await page.goto('/claims/create');
    await page.locator('[data-testid="vehicle-select"]').selectOption(expiredVehicle.id);
    
    // Should show policy expiration warning
    await expect(page.locator('[data-testid="policy-expired-warning"]'))
      .toContainText('Insurance policy has expired');
    
    // Should prevent claim submission
    await expect(page.locator('[data-testid="submit-claim-button"]'))
      .toBeDisabled();
    
    // Should suggest contacting insurance provider
    await expect(page.locator('[data-testid="insurance-contact-info"]'))
      .toBeVisible();
  });

  test('fraud detection integration', async ({ page }) => {
    // Mock a claim that triggers fraud detection
    const suspiciousClaim = ClaimFactory.create({
      estimatedCost: 50000,
      description: 'Multiple incidents in short timeframe'
    });

    await page.request.post('/api/v1/claims', {
      data: suspiciousClaim
    });

    // System should flag for manual review
    await page.goto(`/claims/${suspiciousClaim.id}`);
    
    await expect(page.locator('[data-testid="fraud-alert"]'))
      .toContainText('Flagged for manual review');
    
    await expect(page.locator('[data-testid="fraud-score"]'))
      .toBeVisible();
    
    // Should require additional documentation
    await expect(page.locator('[data-testid="additional-docs-required"]'))
      .toBeVisible();
  });
});

// ============================================================================
// ADVANCED API TESTS
// ============================================================================

// tests/api/external/insurance-api.spec.ts
import { apiTest, expect } from '../../../src/fixtures/api.fixture';

apiTest.describe('External Insurance API Integration', () => {
  apiTest('should validate insurance policy', async ({ request }) => {
    const policyNumber = 'POL-1234567';
    const vin = 'JH4TB2H26CC000000';
    
    const response = await request.get('/api/v1/external/insurance/validate', {
      params: {
        policyNumber,
        vin
      }
    });
    
    expect(response.status()).toBe(200);
    
    const validation = await response.json();
    expect(validation.isValid).toBe(true);
    expect(validation.policyDetails).toBeDefined();
    expect(validation.coverage).toBeDefined();
    expect(validation.deductible).toBeGreaterThan(0);
  });

  apiTest('should handle invalid policy numbers', async ({ request }) => {
    const invalidPolicyNumber = 'INVALID-POLICY';
    const vin = 'JH4TB2H26CC000000';
    
    const response = await request.get('/api/v1/external/insurance/validate', {
      params: {
        policyNumber: invalidPolicyNumber,
        vin
      }
    });
    
    expect(response.status()).toBe(200);
    
    const validation = await response.json();
    expect(validation.isValid).toBe(false);
    expect(validation.error).toContain('Policy not found');
  });

  apiTest('should check coverage limits', async ({ request }) => {
    const policyNumber = 'POL-1234567';
    const claimAmount = 15000;
    
    const response = await request.post('/api/v1/external/insurance/coverage-check', {
      data: {
        policyNumber,
        claimAmount
      }
    });
    
    expect(response.status()).toBe(200);
    
    const coverage = await response.json();
    expect(coverage.isCovered).toBe(true);
    expect(coverage.approvedAmount).toBeGreaterThan(0);
    expect(coverage.customerResponsible).toBeDefined();
  });

  apiTest('should detect potential fraud patterns', async ({ request }) => {
    const suspiciousData = {
      customerId: 'customer-123',
      claimsInLast30Days: 3,
      totalClaimValue: 75000,
      incidentPatterns: ['rear-end collision', 'rear-end collision', 'rear-end collision']
    };
    
    const response = await request.post('/api/v1/external/insurance/fraud-check', {
      data: suspiciousData
    });
    
    expect(response.status()).toBe(200);
    
    const fraudCheck = await response.json();
    expect(fraudCheck.riskLevel).toBe('HIGH');
    expect(fraudCheck.flaggedReasons).toContain('Multiple similar incidents');
    expect(fraudCheck.requiresInvestigation).toBe(true);
  });
});

// tests/api/vehicles/vin-validation.api.spec.ts
import { apiTest, expect } from '../../../src/fixtures/api.fixture';

apiTest.describe('VIN Validation API', () => {
  apiTest('should validate correct VIN format', async ({ request }) => {
    const validVin = 'JH4TB2H26CC000000';
    
    const response = await request.get(`/api/v1/vehicles/validate-vin/${validVin}`);
    expect(response.status()).toBe(200);
    
    const validation = await response.json();
    expect(validation.isValid).toBe(true);
    expect(validation.vehicleInfo.make).toBeDefined();
    expect(validation.vehicleInfo.model).toBeDefined();
    expect(validation.vehicleInfo.year).toBeGreaterThan(1980);
  });

  apiTest('should reject invalid VIN format', async ({ request }) => {
    const invalidVin = 'INVALID123';
    
    const response = await request.get(`/api/v1/vehicles/validate-vin/${invalidVin}`);
    expect(response.status()).toBe(400);
    
    const validation = await response.json();
    expect(validation.isValid).toBe(false);
    expect(validation.errors).toContain('Invalid VIN format');
  });

  apiTest('should decode VIN and return vehicle specifications', async ({ request }) => {
    const vinWithSpecs = 'JH4TB2H26CC000000';
    
    const response = await request.get(`/api/v1/vehicles/decode-vin/${vinWithSpecs}`);
    expect(response.status()).toBe(200);
    
    const decoded = await response.json();
    expect(decoded.make).toBe('Acura');
    expect(decoded.model).toBeTruthy();
    expect(decoded.year).toBeGreaterThan(2000);
    expect(decoded.engineSize).toBeDefined();
    expect(decoded.fuelType).toBeDefined();
    expect(decoded.safetyRating).toBeDefined();
  });

  apiTest('should check for VIN recalls', async ({ request }) => {
    const vinToCheck = 'JH4TB2H26CC000000';
    
    const response = await request.get(`/api/v1/vehicles/recalls/${vinToCheck}`);
    expect(response.status()).toBe(200);
    
    const recalls = await response.json();
    expect(recalls.hasActiveRecalls).toBeDefined();
    expect(Array.isArray(recalls.recallList)).toBe(true);
    
    if (recalls.hasActiveRecalls) {
      expect(recalls.recallList.length).toBeGreaterThan(0);
      expect(recalls.recallList[0]).toHaveProperty('recallNumber');
      expect(recalls.recallList[0]).toHaveProperty('description');
      expect(recalls.recallList[0]).toHaveProperty('severity');
    }
  });
});

// ============================================================================
// MOBILE SPECIFIC TESTS
// ============================================================================

// tests/e2e/mobile/mobile-claims.spec.ts
import { test, expect, devices } from '@playwright/test';

test.use(devices['iPhone 12']);

test.describe('Mobile Claims Management', () => {
  test('should create claim on mobile device', async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('[data-testid="email-input"]', 'customer@example.com');
    await page.fill('[data-testid="password-input"]', 'Test123!');
    await page.tap('[data-testid="login-button"]');
    
    await page.goto('/claims/create');
    
    // Mobile-specific interactions
    await page.tap('[data-testid="vehicle-select"]');
    await page.selectOption('[data-testid="vehicle-select"]', 'vehicle-123');
    
    // Use mobile-friendly date picker
    await page.tap('[data-testid="incident-date-input"]');
    await page.tap('[data-testid="date-picker-today"]');
    
    // Fill description using mobile keyboard
    await page.fill('[data-testid="description-textarea"]', 'Fender bender in parking lot');
    
    // Test image upload from mobile camera
    await page.tap('[data-testid="camera-button"]');
    
    // Mock camera capture
    await page.setInputFiles('[data-testid="image-input"]', 'test-files/mobile-photo.jpg');
    
    await page.tap('[data-testid="submit-claim-button"]');
    
    await expect(page.locator('[data-testid="success-message"]'))
      .toBeVisible();
  });

  test('should handle mobile navigation gestures', async ({ page }) => {
    await page.goto('/claims/list');
    
    // Test swipe gestures on claim cards
    const claimCard = page.locator('[data-testid="claim-card"]').first();
    
    // Swipe left to reveal actions
    await claimCard.hover();
    await page.mouse.down();
    await page.mouse.move(-100, 0);
    await page.mouse.up();
    
    // Action buttons should be visible
    await expect(claimCard.locator('[data-testid="quick-actions"]'))
      .toBeVisible();
    
    // Test pull-to-refresh
    await page.mouse.move(200, 100);
    await page.mouse.down();
    await page.mouse.move(200, 200);
    await page.mouse.up();
    
    // Should show refresh indicator
    await expect(page.locator('[data-testid="refresh-indicator"]'))
      .toBeVisible();
  });

  test('should work offline with cached data', async ({ page, context }) => {
    // Enable offline mode
    await context.setOffline(true);
    
    await page.goto('/claims/list');
    
    // Should show cached claims
    await expect(page.locator('[data-testid="offline-indicator"]'))
      .toBeVisible();
    
    await expect(page.locator('[data-testid="claim-card"]'))
      .toHaveCount(3); // Assuming 3 cached claims
    
    // Should show offline message for new actions
    await page.tap('[data-testid="create-claim-button"]');
    
    await expect(page.locator('[data-testid="offline-message"]'))
      .toContainText('This action requires internet connection');
    
    // Re-enable online mode
    await context.setOffline(false);
    
    // Should sync pending changes
    await page.reload();
    await expect(page.locator('[data-testid="sync-indicator"]'))
      .toBeVisible();
  });
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

// tests/e2e/accessibility/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('should be accessible on login page', async ({ page }) => {
    await page.goto('/auth/login');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should be accessible on claims creation page', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.fill('[data-testid="email-input"]', 'customer@example.com');
    await page.fill('[data-testid="password-input"]', 'Test123!');
    await page.click('[data-testid="login-button"]');
    
    await page.goto('/claims/create');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('[data-testid="third-party-widget"]') // Exclude third-party components
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Test tab order
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="email-input"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="password-input"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="login-button"]')).toBeFocused();
    
    // Test Enter key on button
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'Test123!');
    await page.keyboard.press('Enter');
    
    // Should submit form
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    await page.goto('/claims/create');
    
    // Check form accessibility
    const form = page.locator('[data-testid="create-claim-form"]');
    await expect(form).toHaveAttribute('role', 'form');
    await expect(form).toHaveAttribute('aria-labelledby');
    
    // Check required fields have proper indicators
    const emailInput = page.locator('[data-testid="email-input"]');
    await expect(emailInput).toHaveAttribute('aria-required', 'true');
    await expect(emailInput).toHaveAttribute('aria-describedby');
    
    // Check error messages are properly associated
    await page.fill('[data-testid="email-input"]', 'invalid-email');
    await page.blur('[data-testid="email-input"]');
    
    const errorMessage = page.locator('[data-testid="email-error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveAttribute('role', 'alert');
  });

  test('should support screen reader users', async ({ page }) => {
    await page.goto('/claims/list');
    
    // Check that dynamic content changes are announced
    await page.click('[data-testid="filter-status-select"]');
    await page.selectOption('[data-testid="filter-status-select"]', 'approved');
    
    // Should have live region for status updates
    const liveRegion = page.locator('[aria-live="polite"]');
    await expect(liveRegion).toContainText('Filtered by: Approved claims');
    
    // Check table accessibility
    const table = page.locator('[data-testid="claims-table"]');
    await expect(table).toHaveAttribute('role', 'table');
    
    const headers = table.locator('th');
    const headerCount = await headers.count();
    
    for (let i = 0; i < headerCount; i++) {
      await expect(headers.nth(i)).toHaveAttribute('scope', 'col');
    }
  });
});

// ============================================================================
// VISUAL REGRESSION TESTS
// ============================================================================

// tests/visual/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('login page visual comparison', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');
    
    // Hide dynamic elements
    await page.addStyleTag({
      content: `
        .timestamp, .version-info { visibility: hidden !important; }
        .loading-animation { animation-play-state: paused !important; }
      `
    });
    
    await expect(page).toHaveScreenshot('login-page.png');
  });

  test('claims list visual comparison', async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('[data-testid="email-input"]', 'customer@example.com');
    await page.fill('[data-testid="password-input"]', 'Test123!');
    await page.click('[data-testid="login-button"]');
    
    await page.goto('/claims/list');
    await page.waitForLoadState('networkidle');
    
    // Wait for all images to load
    await page.waitForFunction(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.every(img => img.complete);
    });
    
    await expect(page).toHaveScreenshot('claims-list.png');
  });

  test('responsive design visual tests', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 812, name: 'mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot(`dashboard-${viewport.name}.png`);
    }
  });

  test('dark mode visual comparison', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Enable dark mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('login-page-dark.png');
  });

  test('component visual regression', async ({ page }) => {
    await page.goto('/components/storybook'); // Assuming a component showcase page
    
    // Test individual components
    const components = [
      'claim-card',
      'workshop-card', 
      'status-badge',
      'data-table',
      'modal'
    ];
    
    for (const component of components) {
      const element = page.locator(`[data-component="${component}"]`);
      await expect(element).toHaveScreenshot(`${component}.png`);
    }
  });
});

// ============================================================================
// SECURITY TESTS
// ============================================================================

// tests/security/security.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Security Tests', () => {
  test('should prevent SQL injection attempts', async ({ request }) => {
    const maliciousInputs = [
      "'; DROP TABLE claims; --",
      "1' OR '1'='1",
      "'; UPDATE users SET role='admin' WHERE id=1; --"
    ];
    
    for (const maliciousInput of maliciousInputs) {
      const response = await request.get('/api/v1/claims/search', {
        params: { q: maliciousInput }
      });
      
      // Should not return 500 error or expose database errors
      expect(response.status()).toBeLessThan(500);
      
      const responseText = await response.text();
      expect(responseText).not.toContain('SQL');
      expect(responseText).not.toContain('database');
      expect(responseText).not.toContain('MySQL');
      expect(responseText).not.toContain('PostgreSQL');
    }
  });

  test('should prevent XSS attacks', async ({ page }) => {
    const xssPayloads = [
      '<script>alert("XSS")</script>',
      '<img src=x onerror=alert("XSS")>',
      'javascript:alert("XSS")'
    ];
    
    await page.goto('/claims/create');
    
    for (const payload of xssPayloads) {
      await page.fill('[data-testid="description-textarea"]', payload);
      await page.click('[data-testid="submit-claim-button"]');
      
      // Should not execute the script
      const alertPromise = page.waitForEvent('dialog', { timeout: 1000 }).catch(() => null);
      const alert = await alertPromise;
      
      expect(alert).toBeNull();
      
      // Should sanitize the input
      const displayedText = await page.locator('[data-testid="description-display"]').textContent();
      expect(displayedText).not.toContain('<script>');
      expect(displayedText).not.toContain('javascript:');
    }
  });

  test('should enforce proper authentication', async ({ request }) => {
    // Test endpoints without authentication
    const protectedEndpoints = [
      '/api/v1/claims',
      '/api/v1/workshops',
      '/api/v1/users',
      '/api/v1/admin/reports'
    ];
    
    for (const endpoint of protectedEndpoints) {
      const response = await request.get(endpoint);
      expect(response.status()).toBe(401);
      
      const body = await response.json();
      expect(body.error).toContain('authentication');
    }
  });

  test('should enforce proper authorization', async ({ request }) => {
    // Login as regular customer
    const loginResponse = await request.post('/api/v1/auth/login', {
      data: { email: 'customer@example.com', password: 'Test123!' }
    });
    
    const { accessToken } = await loginResponse.json();
    
    // Try to access admin endpoints
    const adminEndpoints = [
      '/api/v1/admin/users',
      '/api/v1/admin/system-settings',
      '/api/v1/admin/audit-logs'
    ];
    
    for (const endpoint of adminEndpoints) {
      const response = await request.get(endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      
      expect(response.status()).toBe(403);
      
      const body = await response.json();
      expect(body.error).toContain('authorization');
    }
  });

  test('should handle CSRF protection', async ({ page, request }) => {
    await page.goto('/auth/login');
    
    // Get CSRF token from page
    const csrfToken = await page.locator('[name="csrf-token"]').getAttribute('content');
    expect(csrfToken).toBeTruthy();
    
    // Try request without CSRF token
    const responseWithoutToken = await request.post('/api/v1/claims', {
      data: { description: 'Test claim' }
    });
    
    expect(responseWithoutToken.status()).toBe(403);
    
    // Try with incorrect CSRF token
    const responseWithBadToken = await request.post('/api/v1/claims', {
      headers: { 'X-CSRF-Token': 'invalid-token' },
      data: { description: 'Test claim' }
    });
    
    expect(responseWithBadToken.status()).toBe(403);
  });

  test('should prevent information disclosure', async ({ request }) => {
    // Test 404 pages don't leak information
    const response = await request.get('/api/v1/claims/non-existent-id');
    expect(response.status()).toBe(404);
    
    const body = await response.json();
    expect(body.error).toBe('Not found');
    expect(body).not.toHaveProperty('stack');
    expect(body).not.toHaveProperty('sql');
  });

  test('should implement rate limiting', async ({ request }) => {
    // Make rapid requests to login endpoint
    const requests = Array.from({ length: 10 }, () => 
      request.post('/api/v1/auth/login', {
        data: { email: 'test@example.com', password: 'wrong' }
      })
    );
    
    const responses = await Promise.all(requests);
    
    // Should eventually return 429 (Too Many Requests)
    const rateLimitedResponses = responses.filter(r => r.status() === 429);
    expect(rateLimitedResponses.length).toBeGreaterThan(0);
  });
});

// ============================================================================
// LOAD AND STRESS TESTS
// ============================================================================

// tests/performance/load-tests.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Load Tests', () => {
  test('concurrent user simulation', async ({ browser }) => {
    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
      browser.newContext()
    ]);
    
    const userActions = contexts.map(async (context, index) => {
      const page = await context.newPage();
      
      // Login
      await page.goto('/auth/login');
      await page.fill('[data-testid="email-input"]', `user${index}@example.com`);
      await page.fill('[data-testid="password-input"]', 'Test123!');
      await page.click('[data-testid="login-button"]');
      
      // Create claim
      await page.goto('/claims/create');
      await page.fill('[data-testid="description-textarea"]', `Claim from user ${index}`);
      await page.click('[data-testid="submit-claim-button"]');
      
      // Browse claims
      await page.goto('/claims/list');
      await page.waitForLoadState('networkidle');
      
      return { userId: index, success: true };
    });
    
    const results = await Promise.all(userActions);
    
    // All users should complete successfully
    results.forEach(result => {
      expect(result.success).toBe(true);
    });
    
    // Cleanup
    await Promise.all(contexts.map(context => context.close()));
  });

  test('database connection pool stress test', async ({ request }) => {
    const requests = Array.from({ length: 100 }, (_, i) => 
      request.get('/api/v1/claims', {
        params: { page: i % 10 + 1 }
      })
    );
    
    const startTime = Date.now();
    const responses = await Promise.all(requests);
    const endTime = Date.now();
    
    // All requests should succeed
    responses.forEach((response, index) => {
      expect(response.status()).toBe(200);
    });
    
    // Performance should be acceptable
    const avgResponseTime = (endTime - startTime) / requests.length;
    expect(avgResponseTime).toBeLessThan(1000); // Less than 1 second per request on average
    
    console.log(`Processed ${requests.length} concurrent requests in ${endTime - startTime}ms`);
    console.log(`Average response time: ${avgResponseTime}ms`);
  });

  test('memory usage monitoring', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });
    
    // Perform memory-intensive operations
    for (let i = 0; i < 10; i++) {
      await page.goto('/claims/list?limit=1000');
      await page.waitForLoadState('networkidle');
      
      await page.goto('/workshops/list?limit=1000');
      await page.waitForLoadState('networkidle');
    }
    
    // Check final memory usage
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });
    
    const memoryIncrease = finalMemory - initialMemory;
    const memoryIncreasePercent = (memoryIncrease / initialMemory) * 100;
    
    // Memory increase should be reasonable (less than 200%)
    expect(memoryIncreasePercent).toBeLessThan(200);
    
    console.log(`Memory usage: ${initialMemory} -> ${finalMemory} (+${memoryIncreasePercent.toFixed(2)}%)`);
  });
});

// ============================================================================
// DATA-DRIVEN TESTS
// ============================================================================

// tests/data-driven/claims-validation.spec.ts
import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import fs from 'fs';

// Read test data from CSV
const testData = parse(fs.readFileSync('test-data/claim-validation-cases.csv'), {
  columns: true,
  skip_empty_lines: true
});

testData.forEach((testCase: any) => {
  test(`claim validation: ${testCase.scenario}`, async ({ page }) => {
    await page.goto('/claims/create');
    
    // Fill form with test data
    if (testCase.vehicle) {
      await page.selectOption('[data-testid="vehicle-select"]', testCase.vehicle);
    }
    
    if (testCase.incidentDate) {
      await page.fill('[data-testid="incident-date-input"]', testCase.incidentDate);
    }
    
    if (testCase.description) {
      await page.fill('[data-testid="description-textarea"]', testCase.description);
    }
    
    if (testCase.estimatedCost) {
      await page.fill('[data-testid="estimated-cost-input"]', testCase.estimatedCost);
    }
    
    await page.click('[data-testid="submit-claim-button"]');
    
    // Verify expected outcome
    if (testCase.expectedResult === 'success') {
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    } else if (testCase.expectedResult === 'validation_error') {
      await expect(page.locator('[data-testid="error-message"]'))
        .toContainText(testCase.expectedError);
    }
  });
});

// ============================================================================
// DOCUMENTATION AND REPORTING
// ============================================================================

// README.md - Complete documentation
/*
# Automotive Claims Management System - Test Automation

## 🚗 Overview
Enterprise-grade test automation suite for automotive insurance claims management system. Built with Playwright and TypeScript, featuring comprehensive E2E, API, performance, security, and accessibility testing.

## 🏗️ System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Frontend  │    │   API Gateway   │    │    Database     │
│   (React/Vue)   │◄──►│   (Node.js)     │◄──►│  (PostgreSQL)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  E2E Tests      │    │   API Tests     │    │  Database Tests │
│  (Playwright)   │    │  (Playwright)   │    │   (TestCafe)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Business Domain Coverage

### Claims Management
- **Lifecycle**: Draft → Submitted → Under Review → Approved/Rejected → In Repair → Completed → Closed
- **Validation**: Business rules, insurance policy verification, fraud detection
- **Workflows**: Multi-role approval, workshop assignment, customer communication

### Workshop Operations  
- **Management**: Registration, certification, capacity planning
- **Specialization**: Vehicle types (Car, Truck, Motorcycle, Van, SUV)
- **Integration**: Real-time capacity updates, geographic routing

### User Roles & Permissions
- **Customer**: Claim creation, status tracking, communication
- **Claims Adjuster**: Review, approval, investigation
- **Workshop Manager**: Capacity management, repair updates
- **Admin**: System configuration, reporting, user management

## 🛠️ Technical Implementation

### Project Structure
```
automotive-claims-testing/
├── src/
│   ├── pages/              # Page Object Model
│   ├── components/         # Reusable component objects
│   ├── services/api/       # API service layer
│   ├── factories/          # Test data factories
│   ├── fixtures/           # Custom Playwright fixtures
│   └── utils/              # Helpers, types, constants
├── tests/
│   ├── e2e/               # End-to-end user journeys
│   ├── api/               # Backend API validation
│   ├── mobile/            # Mobile-specific tests
│   ├── accessibility/     # A11y compliance tests
│   ├── visual/            # Visual regression tests
│   ├── security/          # Security vulnerability tests
│   ├── performance/       # Load and stress tests
│   └── data-driven/       # CSV/JSON driven test cases
└── docker/                # Containerization configs
```

### Key Features Tested

#### 🔐 Security Testing
- **Authentication**: JWT tokens, session management, password policies
- **Authorization**: Role-based access control (RBAC)
- **Input Validation**: XSS prevention, SQL injection protection
- **Rate Limiting**: Brute force protection, API throttling

#### ♿ Accessibility Testing  
- **WCAG Compliance**: AA level standards
- **Screen Reader**: ARIA labels, semantic HTML
- **Keyboard Navigation**: Tab order, focus management
- **Visual**: Color contrast, text scaling

#### 📱 Mobile