import { faker } from '@faker-js/faker';
import { Workshop, VehicleType } from '../utils/types/Workshop';

export class WorkshopFactory {
  static create(overrides: Partial<Workshop> = {}): Workshop {
    return {
      id: overrides.id ?? faker.string.uuid(),
      name: overrides.name ?? `${faker.company.name()} Workshop`,
      registrationNumber: overrides.registrationNumber ?? faker.string.alphanumeric(10).toUpperCase(),
      email: overrides.email ?? faker.internet.email(),
      phoneNumber: overrides.phoneNumber ?? faker.phone.number(),
      capacity: overrides.capacity ?? faker.number.int({ min: 1, max: 10 }),
      currentLoad: overrides.currentLoad ?? faker.number.int({ min: 0, max: 5 }),
      rating: overrides.rating ?? faker.number.float({ min: 3, max: 5, precision: 0.1 }),
    } as Workshop;
  }

  static createSpecialist(_type: VehicleType, overrides: Partial<Workshop> = {}): Workshop {
    // current Workshop type doesn't track specialization; just create a regular workshop
    return this.create({ ...overrides });
  }
}
