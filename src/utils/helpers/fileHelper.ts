import fs from 'fs/promises';
import path from 'path';
import mime from 'mime-types';

export class FileHelper {
  static async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static async readJsonFile<T = any>(filePath: string): Promise<T | null> {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      return JSON.parse(content) as T;
    } catch (e) {
      return null;
    }
  }

  static async writeJsonFile(filePath: string, data: any): Promise<void> {
    await this.ensureDirectoryExists(path.dirname(filePath));
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  static async ensureDirectoryExists(dirPath: string): Promise<void> {
    await fs.mkdir(dirPath, { recursive: true });
  }

  static async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch { /* ignore */ }
  }

  static async copyFile(src: string, dest: string): Promise<void> {
    await this.ensureDirectoryExists(path.dirname(dest));
    await fs.copyFile(src, dest);
  }

  static generateFileName(prefix: string, ext: string = ''): string {
    const ts = Date.now();
    return `${prefix}-${ts}${ext ? '.' + ext.replace(/^\./, '') : ''}`;
  }

  static async getFileSize(filePath: string): Promise<number> {
    const stat = await fs.stat(filePath);
    return stat.size;
  }

  static getMimeType(filePath: string): string | false {
    return mime.lookup(filePath);
  }

  static isImageFile(filePath: string): boolean {
    const mimeType = this.getMimeType(filePath);
    return !!mimeType && mimeType.startsWith('image/');
  }

  static isDocumentFile(filePath: string): boolean {
    const mimeType = this.getMimeType(filePath);
    if (!mimeType) return false;
    return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(mimeType);
  }

  static async cleanupOldFiles(dirPath: string, maxAgeMs: number): Promise<void> {
    try {
      const files = await fs.readdir(dirPath);
      const now = Date.now();
      for (const f of files) {
        const fp = path.join(dirPath, f);
        try {
          const stat = await fs.stat(fp);
          if (now - stat.mtimeMs > maxAgeMs) {
            await fs.unlink(fp);
          }
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore
    }
  }
}
