import fs from 'node:fs';

export const isWin32 = process.platform === 'win32';

export const isWSL = (() => {
  if (process.platform !== 'linux') {
    return false;
  }
  try {
    const version = fs.readFileSync('/proc/version', 'utf8').toLowerCase();
    return version.includes('microsoft') || version.includes('wsl');
  } catch {
    return false;
  }
})();

export const isWindows = isWin32 || isWSL;
