import { faker } from '@faker-js/faker';
import { Workshop } from '../utils/types/Workshop';

export class WorkshopFactory {
  static create(overrides: Partial<Workshop> = {}): Workshop {
    return {
      id: faker.string.uuid(),
      updatedAt: new Date(),
      ...overrides
    } as Workshop;
  }

  static createSpecialist(type: string): Workshop {
    return this.create({});
  }
}
