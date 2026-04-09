import { spawnSync } from 'node:child_process';

function copyWithCommand(command, args, input, encoding = 'utf8') {
  const result = spawnSync(command, args, {
    input,
    encoding,
  });

  return !result.error && result.status === 0;
}

export function copyToClipboard(content) {
  if (copyWithCommand('wl-copy', [], content)) {
    return true;
  }

  if (copyWithCommand('xclip', ['-selection', 'clipboard'], content)) {
    return true;
  }

  if (copyWithCommand('xsel', ['--clipboard', '--input'], content)) {
    return true;
  }

  if (copyWithCommand('pbcopy', [], content)) {
    return true;
  }

  const windowsBuffer = Buffer.from(content, 'utf16le');

  if (copyWithCommand('clip.exe', [], windowsBuffer, null)) {
    return true;
  }

  if (copyWithCommand('clip', [], windowsBuffer, null)) {
    return true;
  }

  return false;
}
