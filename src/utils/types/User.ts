export interface User {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
}

export interface Address {
  street: string;
  country: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
  CUSTOMER = 'customer'
}

export type FullUser = User;
