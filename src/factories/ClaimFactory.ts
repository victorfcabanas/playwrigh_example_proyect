import { faker } from '@faker-js/faker';
import { Claim, ClaimStatus } from '../utils/types/Claim';

export class ClaimFactory {
  static create(overrides: Partial<Claim> = {}): Claim {
    const incidentDate = overrides.incidentDate ?? faker.date.past({ years: 2 });
    const status = overrides.status ?? ClaimStatus.DRAFT;

    return {
      id: overrides.id ?? faker.string.uuid(),
      vehicleId: overrides.vehicleId ?? `veh_${faker.string.uuid()}`,
      incidentDate,
      description: overrides.description ?? faker.lorem.sentence(),
      estimatedCost: overrides.estimatedCost ?? faker.number.int({ min: 100, max: 5000 }),
      status,
      updatedAt: overrides.updatedAt ?? new Date(),
    } as Claim;
  }

  static createDraft(overrides: Partial<Claim> = {}): Claim {
    return this.create({ status: ClaimStatus.DRAFT, ...overrides });
  }
}
