import { faker } from '@faker-js/faker';
import { User, UserRole } from '../utils/types/User';

export class UserFactory {
  static create(overrides: Partial<User> = {}): User {
    const firstName = overrides.firstName || faker.person.firstName();
    const lastName = overrides.lastName || faker.person.lastName();
    const email = overrides.email || faker.internet.email({ firstName, lastName });
    const role = overrides.role || UserRole.CUSTOMER;

    return {
      id: overrides.id ?? faker.string.uuid(),
      firstName,
      lastName,
      email,
      role,
      createdAt: overrides.createdAt ?? new Date(),
      updatedAt: overrides.updatedAt ?? new Date(),
    } as User;
  }

  static createCustomer(overrides: Partial<User> = {}): User {
    return this.create({ role: UserRole.CUSTOMER, ...overrides });
  }

  static createAdmin(overrides: Partial<User> = {}): User {
    return this.create({ role: UserRole.ADMIN, ...overrides });
  }
}
