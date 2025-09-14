export class ValidationHelper {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static isValidVIN(vin: string): boolean {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    return vinRegex.test(vin);
  }
  
  static isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+?[0-9\-\s]{7,20}$/;
    return phoneRegex.test(phone);
  }
  
  static isValidLicensePlate(plate: string): boolean {
    const plateRegex = /^[A-Z0-9]{3,8}$/;
    return plateRegex.test(plate.toUpperCase());
  }
  
  static validateCurrency(amount: number, min: number = 0, max: number = 1000000): boolean {
    return amount >= min && amount <= max && Number.isFinite(amount);
  }
}
