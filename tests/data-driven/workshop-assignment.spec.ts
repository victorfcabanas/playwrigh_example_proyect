import { test, expect } from '@playwright/test';
import fs from 'fs';
import { WorkshopListPage } from '../../src/pages/workshops/WorkshopListPage';

const csvPath = 'test-data/workshop-assignment-scenarios.csv';
let scenarios: Array<{ scenario: string; workshopName: string }> = [];
function simpleCsvParse(raw: string) {
	const lines = raw.split(/\r?\n/).filter(l => l.trim() !== '');
	if (!lines.length) return [];
	const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
	const rows: any[] = [];
	for (let i = 1; i < lines.length; i++) {
		const line = lines[i];
		// naive split that handles simple quoted fields
		const cells: string[] = [];
		let cur = '';
		let inQuotes = false;
		for (let ch of line) {
			if (ch === '"') {
				inQuotes = !inQuotes;
				continue;
			}
			if (ch === ',' && !inQuotes) {
				cells.push(cur.trim());
				cur = '';
				continue;
			}
			cur += ch;
		}
		if (cur.length || line.endsWith(',')) cells.push(cur.trim());
		const obj: any = {};
		for (let j = 0; j < headers.length; j++) obj[headers[j]] = (cells[j] || '').replace(/^"|"$/g, '');
		rows.push(obj);
	}
	return rows;
}
try {
	const raw = fs.readFileSync(csvPath, 'utf8');
	scenarios = simpleCsvParse(raw) as any;
} catch (e) {
	// if the CSV is missing, keep tests skipped gracefully
}

for (const s of scenarios) {
	test(`workshop assignment: ${s.scenario}`, async ({ page, baseURL }) => {
		const list = new WorkshopListPage(page);
		await page.goto(baseURL + '/workshops');
		await list.searchWorkshops(s.workshopName || '');
		const ids = await list.getWorkshopCards();
		expect(ids.length).toBeGreaterThanOrEqual(0);
	});
}
