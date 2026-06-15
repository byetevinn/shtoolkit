import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isWin32, isWSL } from '../../shared/output/platform.js';
import { getVersion } from '../../shared/version.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isCommandAvailable(cmd, args = []) {
  try {
    const res = spawnSync(cmd, args, { stdio: 'ignore' });
    return res.status === 0;
  } catch {
    return false;
  }
}

export function runDoctorCommand() {
  console.log('🩺 shtoolkit doctor\n');

  const shtkVersion = getVersion();
  const nodeVersion = process.version;
  const platform = process.platform;
  const wsl = isWSL;

  const hasPowershell = (() => {
    try {
      const res = spawnSync('powershell.exe', ['-NoProfile', '-Command', 'Write-Output 1'], { stdio: 'pipe' });
      return res.status === 0 && res.stdout.toString().trim() === '1';
    } catch {
      return false;
    }
  })();

  const hasWslpath = (() => {
    try {
      const res = spawnSync('wslpath', ['-h'], { stdio: 'ignore' });
      return res.status === 0 || res.status === 1;
    } catch {
      return false;
    }
  })();

  const textClipboard = (() => {
    if (platform === 'darwin') return 'available (pbcopy)';
    if (platform === 'win32') {
      const avail = isCommandAvailable('clip.exe') || isCommandAvailable('clip');
      return avail ? 'available (clip.exe)' : 'missing';
    }
    if (isWSL && (isCommandAvailable('clip.exe') || isCommandAvailable('clip'))) {
      return 'available (clip.exe via WSL)';
    }
    if (isCommandAvailable('wl-copy', ['--help'])) return 'available (wl-copy)';
    if (isCommandAvailable('xclip', ['-version'])) return 'available (xclip)';
    if (isCommandAvailable('xsel', ['--version'])) return 'available (xsel)';
    return 'missing';
  })();

  const fileClipboard = (() => {
    if (isWin32) {
      return 'available';
    }
    if (isWSL) {
      return hasPowershell ? 'available (via powershell.exe)' : 'missing (powershell.exe not found)';
    }
    return 'unsupported on this platform';
  })();

  const currentBinary = process.argv[1] ? path.resolve(process.argv[1]) : 'unknown';
  const packagePath = path.resolve(__dirname, '../../../');

  console.log(`shtoolkit version : ${shtkVersion}`);
  console.log(`node version      : ${nodeVersion}`);
  console.log(`platform          : ${platform}`);
  console.log(`wsl               : ${wsl}`);
  console.log(`powershell.exe    : ${hasPowershell ? 'available' : 'missing'}`);
  console.log(`wslpath           : ${hasWslpath ? 'available' : 'missing'}`);
  console.log(`text clipboard    : ${textClipboard}`);
  console.log(`file clipboard    : ${fileClipboard}`);
  console.log(`current binary    : ${currentBinary}`);
  console.log(`package path      : ${packagePath}`);
}
