export interface Claim {
  id: string;
  updatedAt: Date;
}

export enum ClaimStatusEnum {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  IN_REPAIR = 'IN_REPAIR',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CLOSED = 'CLOSED'
}
