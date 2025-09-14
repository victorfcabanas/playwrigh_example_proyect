export class ReportHelper {
  static generateClaimReport(claims: any[] = []): { totalClaims: number } {
    const totalClaims = Array.isArray(claims) ? claims.length : 0;
    return { totalClaims };
  }
  
  static generateWorkshopPerformanceReport(workshops: any[] = []): { totalWorkshops: number } {
    const totalWorkshops = Array.isArray(workshops) ? workshops.length : 0;
    return { totalWorkshops };
  }
}
