import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { DEFAULT_TREE_CONFIG } from './defaults.js';

function readJsonIfExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch {
    throw new Error(`Invalid ${label} config file: ${filePath}`);
  }
}

function uniqueList(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function mergeTreeConfig(...configs) {
  const result = {
    ignore: {
      names: [],
      filesIn: [],
      patterns: [],
    },
  };

  for (const config of configs) {
    if (!config?.ignore) {
      continue;
    }

    result.ignore.names.push(...(config.ignore.names ?? []));
    result.ignore.filesIn.push(...(config.ignore.filesIn ?? []));
    result.ignore.patterns.push(...(config.ignore.patterns ?? []));
  }

  result.ignore.names = uniqueList(result.ignore.names);
  result.ignore.filesIn = uniqueList(result.ignore.filesIn);
  result.ignore.patterns = uniqueList(result.ignore.patterns);

  return result;
}

export function loadTreeConfig(targetPath = '.') {
  const absoluteTargetPath = path.resolve(targetPath);

  const globalConfigPath = path.join(
    os.homedir(),
    '.config',
    'shtoolkit',
    'config.json',
  );

  const localConfigPath = path.join(absoluteTargetPath, '.shtk.json');

  const globalConfig = readJsonIfExists(globalConfigPath, 'global');
  const localConfig = readJsonIfExists(localConfigPath, 'local');

  return mergeTreeConfig(
    DEFAULT_TREE_CONFIG,
    globalConfig?.tree,
    localConfig?.tree,
  );
}
