export class ReportHelper {
  static generateClaimReport(claims: Array<{ id?: string; amount?: number }> = []): { totalClaims: number; totalAmount: number } {
    const list = Array.isArray(claims) ? claims : [];
    const totalClaims = list.length;
    const totalAmount = list.reduce((sum, c) => sum + (typeof c.amount === 'number' ? c.amount : 0), 0);
    return { totalClaims, totalAmount };
  }

  static generateWorkshopPerformanceReport(workshops: Array<{ id?: string; capacity?: number; current_load?: number }> = []): { totalWorkshops: number; avgUtilization: number } {
    const list = Array.isArray(workshops) ? workshops : [];
    const totalWorkshops = list.length;
    let totalUtil = 0;
    let counted = 0;

    for (const w of list) {
      if (w && typeof w.capacity === 'number' && w.capacity > 0) {
        const load = typeof w.current_load === 'number' ? w.current_load : 0;
        totalUtil += (load / w.capacity) * 100;
        counted += 1;
      }
    }

    // round to one decimal place consistently
    const avgUtilization = counted > 0 ? Math.round((totalUtil / counted) * 10) / 10 : 0;
    return { totalWorkshops, avgUtilization };
  }
}
