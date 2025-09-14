export class ReportHelper {
  static generateClaimReport(claims: Array<{ id?: string; amount?: number }> = []): { totalClaims: number; totalAmount: number } {
    const totalClaims = Array.isArray(claims) ? claims.length : 0;
    const totalAmount = claims.reduce((sum, c) => sum + (c.amount || 0), 0);
    return { totalClaims, totalAmount };
  }

  static generateWorkshopPerformanceReport(workshops: Array<{ id?: string; capacity?: number; current_load?: number }> = []): { totalWorkshops: number; avgUtilization: number } {
    const totalWorkshops = Array.isArray(workshops) ? workshops.length : 0;
    let totalUtil = 0;
    let counted = 0;
    for (const w of workshops) {
      if (w && typeof w.capacity === 'number' && w.capacity > 0) {
        totalUtil += ((w.current_load || 0) / w.capacity) * 100;
        counted += 1;
      }
    }
    const avgUtilization = counted > 0 ? Math.round((totalUtil / counted) * 10) / 10 : 0;
    return { totalWorkshops, avgUtilization };
  }
}
