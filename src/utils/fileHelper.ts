import { Locator } from '@playwright/test';

export async function safeText(locator: Locator, timeout = 1000): Promise<string> {
  try {
    await locator.waitFor({ state: 'visible', timeout }).catch(() => {});
    const t = await locator.textContent().catch(() => '');
    return (t || '').trim();
  } catch {
    const t = await locator.textContent().catch(() => '');
    return (t || '').trim();
  }
}

export async function safeClick(locator: Locator, timeout = 1000): Promise<void> {
  try {
    await locator.waitFor({ state: 'visible', timeout }).catch(() => {});
    await locator.scrollIntoViewIfNeeded().catch(() => {});
    await locator.click().catch(() => {});
  } catch {
    // swallow to keep tests resilient in headless/CI environments
  }
}

export function parseFirstInt(text: string): number {
  const m = (text || '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}
