-- database/init.sql
-- Extracted from PROJECT_SPEC.md
-- NOTE: Some fragments in the spec were truncated; placeholders are kept as-is.

-- Example view for active claims (spec fragment)
CREATE VIEW active_claims_summary AS
SELECT
  c.id AS claim_id,
  c.claim_number,
  u.id AS customer_id,
  u.email AS customer_email,
  v.id AS vehicle_id,
  v.vin AS vehicle_vin,
  c.status,
  c.incident_date
FROM claims c
JOIN users u ON c.customer_id = u.id
JOIN vehicles v ON c.vehicle_id = v.id
LEFT JOIN workshops w ON c.workshop_id = w.id
WHERE c.status NOT IN ('CLOSED', 'REJECTED');

-- Workshop performance view
CREATE VIEW workshop_performance AS
SELECT 
    w.id,
    ROUND(COALESCE(w.current_load,0)::numeric / NULLIF(w.capacity,0) * 100, 1) as capacity_utilization
FROM workshops w
LEFT JOIN claims c ON w.id = c.workshop_id
WHERE w.is_active = true
GROUP BY w.id, w.name, w.capacity, w.current_load, w.rating;

-- Insert default admin user (placeholder values from spec)
-- NOTE: The spec provided an incomplete INSERT; filling minimal fields.
INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
VALUES (
  'admin@automotive-claims.com',
  -- password_hash placeholder (replace with actual hash)
  'REPLACE_WITH_HASH',
  'System',
  'Administrator',
  'ADMIN',
  true
);

-- Additional schema objects (tables, indexes, constraints) should be created as required by the project.
-- This file intentionally preserves fragments from PROJECT_SPEC.md; review and adjust for your DB engine.
