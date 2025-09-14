export class ReportHelper {
  static generateClaimReport(claims: any[]): any {
    const totalClaims = claims.length;
    return { totalClaims };
  }
  
  static generateWorkshopPerformanceReport(workshops: any[]): any {
    const totalWorkshops = workshops.length;
    return { totalWorkshops };
  }
}
