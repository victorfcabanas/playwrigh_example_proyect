-- database/seed.sql
-- Seed data for testing (extracted from PROJECT_SPEC.md)

-- Insert test users
INSERT INTO users (id, email, password_hash, first_name, last_name, role, phone_number, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'john.doe@email.com', crypt('Test123!', gen_salt('bf')), 'John', 'Doe', 'CUSTOMER', '+1-555-0101', true),
('550e8400-e29b-41d4-a716-446655440002', 'jane.smith@email.com', crypt('Test123!', gen_salt('bf')), 'Jane', 'Smith', 'CUSTOMER', '+1-555-0102', true),
('550e8400-e29b-41d4-a716-446655440003', 'mike.adjuster@company.com', crypt('Adjuster123!', gen_salt('bf')), 'Mike', 'Johnson', 'CLAIMS_ADJUSTER', '+1-555-0201', true),
('550e8400-e29b-41d4-a716-446655440004', 'sarah.workshop@autoshop.com', crypt('Workshop123!', gen_salt('bf')), 'Sarah', 'Wilson', 'WORKSHOP_MANAGER', '+1-555-0301', true);

-- Insert test addresses
INSERT INTO user_addresses (user_id, street, city, state, zip_code, is_primary) VALUES
('550e8400-e29b-41d4-a716-446655440001', '123 Main St', 'New York', 'NY', '10001', true),
('550e8400-e29b-41d4-a716-446655440002', '456 Oak Ave', 'Los Angeles', 'CA', '90210', true);

-- Insert test vehicles
INSERT INTO vehicles (id, vin, license_plate, make, model, year, type, color, owner_id, insurance_policy_number) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'JH4TB2H26CC000001', 'ABC-123', 'Honda', 'Accord', 2020, 'CAR', 'Silver', '550e8400-e29b-41d4-a716-446655440001', 'POL-1234567'),
('660e8400-e29b-41d4-a716-446655440002', 'JH4TB2H26CC000002', 'XYZ-789', 'Toyota', 'Camry', 2019, 'CAR', 'Blue', '550e8400-e29b-41d4-a716-446655440002', 'POL-2345678'),
('660e8400-e29b-41d4-a716-446655440003', '1FTFW1ET5DFC00001', 'TRK-456', 'Ford', 'F-150', 2021, 'TRUCK', 'Red', '550e8400-e29b-41d4-a716-446655440001', 'POL-3456789');

-- Insert test workshops
INSERT INTO workshops (id, name, registration_number, email, phone_number, capacity, current_load, rating, is_active, manager_id) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'Downtown Auto Repair', 'WS-10001', 'info@downtownauto.com', '+1-555-1001', 25, 12, 4.8, true, '550e8400-e29b-41d4-a716-446655440004'),
('770e8400-e29b-41d4-a716-446655440002', 'Luxury Car Specialists', 'WS-10002', 'service@luxurycars.com', '+1-555-1002', 15, 8, 4.9, true, '550e8400-e29b-41d4-a716-446655440004'),
('770e8400-e29b-41d4-a716-446655440003', 'Heavy Duty Truck Repair', 'WS-10003', 'repairs@heavyduty.com', '+1-555-1003', 40, 22, 4.6, true, '550e8400-e29b-41d4-a716-446655440004');

-- Insert workshop addresses
INSERT INTO workshop_addresses (workshop_id, street, city, state, zip_code) VALUES
('770e8400-e29b-41d4-a716-446655440001', '789 Industrial Blvd', 'New York', 'NY', '10002'),
('770e8400-e29b-41d4-a716-446655440002', '456 Premium Way', 'Beverly Hills', 'CA', '90210'),
('770e8400-e29b-41d4-a716-446655440003', '321 Truck Stop Rd', 'Houston', 'TX', '77001');

-- Insert workshop specializations
INSERT INTO workshop_specializations (workshop_id, vehicle_type) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'CAR'),
('770e8400-e29b-41d4-a716-446655440001', 'SUV'),
('770e8400-e29b-41d4-a716-446655440002', 'CAR'),
('770e8400-e29b-41d4-a716-446655440003', 'TRUCK'),
('770e8400-e29b-41d4-a716-446655440003', 'VAN');

-- Insert test claims
INSERT INTO claims (id, claim_number, customer_id, vehicle_id, status, incident_date, description, estimated_cost) VALUES
('880e8400-e29b-41d4-a716-446655440001', 'CLM-10001', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'OPEN', '2024-11-01', 'Rear-end collision', 2500.00),
('880e8400-e29b-41d4-a716-446655440002', 'CLM-10002', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 'PENDING', '2024-11-03', 'Windshield damage', 800.00),
('880e8400-e29b-41d4-a716-446655440003', 'CLM-10003', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', 'IN_REPAIR', '2024-11-05', 'Side impact', 4200.00);

-- NOTE: The PROJECT_SPEC.md ended with a truncated fragment; review file to ensure schema compatibility.
