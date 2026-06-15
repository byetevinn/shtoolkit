import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { isWin32, isWSL } from './platform.js';

export function copyWindowsFileToClipboard(filePath) {
  if (!isWin32 && !isWSL) {
    throw new Error('Unsupported platform: Copying files to the Windows clipboard is only supported on Windows or WSL.');
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  let windowsPath = filePath;
  if (isWSL) {
    try {
      windowsPath = execFileSync('wslpath', ['-w', filePath], { encoding: 'utf8' }).trim();
    } catch (error) {
      throw new Error(`Failed to convert WSL path to Windows path: ${error.message}`);
    }
  }

  const base64WindowsPath = Buffer.from(windowsPath, 'utf8').toString('base64');

  const psScript = `
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms

$filePath = [System.Text.Encoding]::UTF8.GetString(
  [System.Convert]::FromBase64String('${base64WindowsPath}')
)

if (-not (Test-Path -LiteralPath $filePath)) {
  throw "File not found: $filePath"
}

$files = New-Object System.Collections.Specialized.StringCollection
[void]$files.Add($filePath)

for ($i = 1; $i -le 3; $i++) {
  try {
    [System.Windows.Forms.Clipboard]::SetFileDropList($files)
    break
  } catch {
    if ($i -eq 3) {
      throw
    }
    Start-Sleep -Milliseconds 100
  }
}
`.trim();

  // PowerShell -EncodedCommand expects UTF-16LE base64
  const base64Script = Buffer.from(psScript, 'utf16le').toString('base64');

  try {
    execFileSync('powershell.exe', [
      '-NoProfile',
      '-STA',
      '-EncodedCommand',
      base64Script
    ], { stdio: 'pipe' });

    return {
      copied: true,
      filePath,
      windowsPath
    };
  } catch (error) {
    throw new Error(`Failed to copy file to Windows clipboard: ${error.stderr?.toString() || error.message}`);
  }
}
