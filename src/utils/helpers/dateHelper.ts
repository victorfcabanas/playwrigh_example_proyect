export class DateHelper {
  static formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  static isBusinessDay(date: Date): boolean {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Not Sunday (0) or Saturday (6)
  }
  
  static getNextBusinessDay(date: Date): Date {
    let nextDay = this.addDays(date, 1);
    while (!this.isBusinessDay(nextDay)) {
      nextDay = this.addDays(nextDay, 1);
    }
    return nextDay;
  }
}
