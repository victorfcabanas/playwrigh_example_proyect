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

  async filterBySpecialization(specialization: string