export interface Workshop {
  id: string;
  name: string;
  registrationNumber?: string;
  email?: string;
  phoneNumber?: string;
  capacity?: number;
  currentLoad?: number;
  rating?: number;
}

export enum VehicleType {
  CAR = 'car',
  TRUCK = 'truck',
  MOTORCYCLE = 'motorcycle',
  OTHER = 'other'
}
