import { faker } from '@faker-js/faker';
import { Claim } from '../utils/types/Claim';

export class ClaimFactory {
  static create(overrides: Partial<Claim> = {}): Claim {
    return {
      id: faker.string.uuid(),
      updatedAt: new Date(),
      ...overrides
    } as Claim;
  }

  static createDraft(): Claim {
    const claim = this.create();
    return claim;
  }
}
