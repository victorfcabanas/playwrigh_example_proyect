import { faker } from '@faker-js/faker';
import { Vehicle } from '../utils/types/Vehicle';

export class VehicleFactory {
  static create(overrides: Partial<Vehicle> = {}): Vehicle {
    return {
      id: faker.string.uuid(),
      updatedAt: new Date(),
      ...overrides
    } as Vehicle;
  }
}
