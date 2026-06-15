import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { isWin32, isWSL } from './platform.js';

let cachedTempDir = null;

export function getWindowsTempDir() {
  if (cachedTempDir) {
    return cachedTempDir;
  }

  if (isWin32) {
    const tempDir = path.join(os.tmpdir(), 'shtoolkit');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    cachedTempDir = tempDir;
    return tempDir;
  }

  if (isWSL) {
    try {
      const windowsTemp = execFileSync('powershell.exe', [
        '-NoProfile',
        '-Command',
        '[System.IO.Path]::GetTempPath().Trim()',
      ], { encoding: 'utf8' }).trim();

      const wslTemp = execFileSync('wslpath', ['-u', windowsTemp], { encoding: 'utf8' }).trim();
      const tempDir = path.join(wslTemp, 'shtoolkit');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      cachedTempDir = tempDir;
      return tempDir;
    } catch (error) {
      throw new Error(`Failed to resolve Windows temp directory in WSL: ${error.message}`);
    }
  }

  throw new Error('Unsupported platform: Copy file to Windows clipboard is only supported on Windows or WSL.');
}

export function writeWindowsTempOutputFile({ fileName, content }) {
  const tempDir = getWindowsTempDir();
  const filePath = path.join(tempDir, fileName);

  fs.writeFileSync(filePath, content, 'utf8');

  let windowsPath = filePath;
  if (isWSL) {
    try {
      windowsPath = execFileSync('wslpath', ['-w', filePath], { encoding: 'utf8' }).trim();
    } catch {
      // Fallback
    }
  }

  return {
    filePath,
    fileName,
    windowsPath
  };
}
