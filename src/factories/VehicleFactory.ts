import { faker } from '@faker-js/faker';
import { Vehicle, VehicleType } from '../utils/types/Vehicle';

export class VehicleFactory {
  static create(overrides: Partial<Vehicle> = {}): Vehicle {
    const make = overrides.make || faker.vehicle.manufacturer();
    const model = overrides.model || faker.vehicle.model();
    const year = overrides.year || faker.number.int({ min: 1995, max: new Date().getFullYear() });
    const type = overrides.type || (faker.helpers.arrayElement(Object.values(VehicleType)) as VehicleType);

    const vin = overrides.vin || `${String(make).replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0,3).padEnd(3,'X')}${faker.string.alphanumeric(9).toUpperCase()}${(year % 100).toString().padStart(2,'0')}`;

    return {
      id: overrides.id ?? faker.string.uuid(),
      vin,
      make,
      model,
      year,
      type,
      ownerId: overrides.ownerId ?? null,
    } as Vehicle;
  }
}
