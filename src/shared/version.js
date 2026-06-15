import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, '../../package.json');

let cachedVersion = null;

export function getVersion() {
  if (cachedVersion) {
    return cachedVersion;
  }
  try {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    cachedVersion = pkg.version;
    return cachedVersion;
  } catch {
    return 'unknown';
  }
}
