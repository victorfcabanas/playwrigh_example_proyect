// src/utils/types/Vehicle.ts
// Types for Vehicle used across the project

export type Vehicle = {
	id: string;
	vin?: string;
	licensePlate?: string;
	make?: string;
	model?: string;
	year?: number;
	type?: VehicleType;
	ownerId?: string;
	color?: string;
	mileage?: number;
	insurancePolicyNumber?: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export enum VehicleType {
	CAR = 'car',
	TRUCK = 'truck',
	MOTORCYCLE = 'motorcycle',
	OTHER = 'other',
}