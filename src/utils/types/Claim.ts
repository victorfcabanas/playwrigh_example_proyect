export interface Claim {
  id: string;
  vehicleId?: string;
  incidentDate?: Date;
  description?: string;
  estimatedCost?: number;
  status?: ClaimStatus;
  updatedAt: Date;
}

export enum ClaimStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  IN_REPAIR = 'IN_REPAIR',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CLOSED = 'CLOSED'
}
