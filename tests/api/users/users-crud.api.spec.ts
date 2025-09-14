import { apiTest, expect } from '../../../src/fixtures/api.fixture';
import { UserFactory } from '../../../src/factories/UserFactory';
import { UserRole } from '../../../src/utils/enums/UserRole';

apiTest.describe('Users API - CRUD Operations', () => {
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

  apiTest('should create a new user', async ({ usersService }) => {
    usersService.setAuthToken(authToken);
    
    const userData = UserFactory.createCustomer();
    delete userData.id;
    
    const response = await usersService.createUser(userData);
    expect(response.status()).toBe(201);
    
    const createdUser = await response.json();
    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.role).toBe(userData.role);
    expect(createdUser.isActive).toBe(true);
    expect(createdUser.password).toBeUndefined();
  });

  // ... remaining tests omitted for brevity
});
