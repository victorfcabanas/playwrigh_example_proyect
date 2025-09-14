// src/services/database/TestDataSeeder.ts
import { DatabaseHelper } from './DatabaseHelper';
import { ClaimFactory } from '../../factories/ClaimFactory';
import { VehicleFactory } from '../../factories/VehicleFactory';
import { UserFactory } from '../../factories/UserFactory';

export class TestDataSeeder {
  static async seed(connectionString: string) {
    const db = new DatabaseHelper(connectionString);
    try {
      // Create a few users, vehicles, and claims for local testing
      const user = UserFactory.createCustomer();
      const vehicle = VehicleFactory.create({ ownerId: user.id });
      const claim = ClaimFactory.create({ vehicleId: vehicle.id });

      // Insert minimal sample rows (these queries are examples; real schema may differ)
      await db.executeQuery('INSERT INTO users(id, email, name) VALUES($1,$2,$3) ON CONFLICT DO NOTHING', [user.id, (user as any).email || null, `${(user as any).firstName || ''} ${(user as any).lastName || ''}`]);
      await db.executeQuery('INSERT INTO vehicles(id, vin, make, model, year, owner_id) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING', [vehicle.id, vehicle.vin || null, vehicle.make || null, vehicle.model || null, vehicle.year || null, vehicle.ownerId]);
      await db.executeQuery('INSERT INTO claims(id, vehicle_id, description, estimated_cost, status) VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING', [claim.id, claim.vehicleId, claim.description, claim.estimatedCost, claim.status]);

      console.log('Test data seeded:', { user: user.id, vehicle: vehicle.id, claim: claim.id });
    } finally {
      await db.close();
    }
  }
}
