import { faker } from '@faker-js/faker';
import { User } from '../utils/types/User';

export class UserFactory {
  static create(overrides: Partial<User> = {}): User {
    return {
      id: faker.string.uuid(),
      updatedAt: new Date(),
      ...overrides
    } as User;
  }

  static createCustomer(): User {
    return this.create({});
  }

  static createAdmin(): User {
    return this.create({});
  }
}
