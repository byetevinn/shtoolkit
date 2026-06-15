import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { DEFAULT_OUTPUT_CONFIG } from '../../config/defaults.js';

export function resolveOutputConfig(config = {}) {
  // Extract output configuration if wrapped, else default to empty object
  const outputConfig = config.output || {};

  const merged = {
    mode: outputConfig.mode !== undefined ? outputConfig.mode : DEFAULT_OUTPUT_CONFIG.mode,
    textMaxChars: outputConfig.textMaxChars !== undefined ? outputConfig.textMaxChars : DEFAULT_OUTPUT_CONFIG.textMaxChars,
    file: {
      location: (outputConfig.file && outputConfig.file.location !== undefined)
        ? outputConfig.file.location
        : DEFAULT_OUTPUT_CONFIG.file.location,
      clipboard: (outputConfig.file && outputConfig.file.clipboard !== undefined)
        ? outputConfig.file.clipboard
        : DEFAULT_OUTPUT_CONFIG.file.clipboard,
    }
  };

  const validModes = ['text', 'file', 'auto'];
  if (!validModes.includes(merged.mode)) {
    throw new Error(`Invalid output mode: "${merged.mode}". Must be one of ${validModes.join(', ')}.`);
  }

  if (typeof merged.textMaxChars !== 'number' || Number.isNaN(merged.textMaxChars) || merged.textMaxChars < 0) {
    throw new Error(`Invalid textMaxChars: "${merged.textMaxChars}". Must be a non-negative number.`);
  }

  if (merged.file.location !== 'windowsTemp') {
    throw new Error(`Invalid file.location: "${merged.file.location}". Only "windowsTemp" is supported.`);
  }

  if (merged.file.clipboard !== 'file') {
    throw new Error(`Invalid file.clipboard: "${merged.file.clipboard}". Only "file" is supported.`);
  }

  return merged;
}

export function loadOutputConfig(targetPath = '.') {
  const globalConfigPath = path.join(
    os.homedir(),
    '.config',
    'shtoolkit',
    'config.json',
  );
  const localConfigPath = path.join(path.resolve(targetPath), '.shtk.json');

  let globalConfig = null;
  let localConfig = null;

  if (fs.existsSync(globalConfigPath)) {
    try {
      globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, 'utf8'));
    } catch {
      throw new Error(`Invalid global config file: ${globalConfigPath}`);
    }
  }

  if (fs.existsSync(localConfigPath)) {
    try {
      localConfig = JSON.parse(fs.readFileSync(localConfigPath, 'utf8'));
    } catch {
      throw new Error(`Invalid local config file: ${localConfigPath}`);
    }
  }

  // Merge output config (local overrides global)
  const mergedOutput = {
    ...globalConfig?.output,
    ...localConfig?.output,
  };

  return resolveOutputConfig({ output: mergedOutput });
}
