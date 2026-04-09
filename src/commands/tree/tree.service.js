import fs from 'node:fs';
import path from 'node:path';
import { matchesGlob } from '../../shared/glob.js';

function normalizeRelativePathParts(relativePath) {
  if (!relativePath) {
    return [];
  }

  return relativePath.split(path.sep).filter(Boolean);
}

function normalizeRelativePath(relativePath) {
  return relativePath.split(path.sep).join('/');
}

function shouldIgnoreByName(relativePathParts, ignoreNames) {
  return relativePathParts.some((part) => ignoreNames.includes(part));
}

function shouldIgnoreFileIn(relativePathParts, filesIn) {
  const parentParts = relativePathParts.slice(0, -1);
  const parentPath = parentParts.join('/');

  return (
    parentParts.some((part) => filesIn.includes(part)) ||
    filesIn.includes(parentPath)
  );
}

function shouldIgnoreByPattern(name, relativePath, patterns) {
  return matchesGlob(name, patterns) || matchesGlob(relativePath, patterns);
}

export function buildTree(targetPath, options = {}) {
  const absoluteRootPath = path.resolve(targetPath);
  const rootName = path.basename(absoluteRootPath);

  const config = options.config ?? {
    ignore: {
      names: [],
      filesIn: [],
      patterns: [],
    },
  };

  const ignoreNames = config.ignore?.names ?? [];
  const ignoreFilesIn = config.ignore?.filesIn ?? [];
  const ignorePatterns = config.ignore?.patterns ?? [];

  const stats = {
    folders: 0,
    files: 0,
  };

  const details = {
    failedAccess: [],
  };

  function walk(currentPath, currentDepth) {
    const relativePathRaw = path.relative(absoluteRootPath, currentPath);
    const relativePath = normalizeRelativePath(relativePathRaw);
    const relativeParts = normalizeRelativePathParts(relativePathRaw);
    const name = path.basename(currentPath);

    if (shouldIgnoreByName(relativeParts, ignoreNames)) {
      return null;
    }

    if (shouldIgnoreByPattern(name, relativePath, ignorePatterns)) {
      return null;
    }

    let currentStats;

    try {
      currentStats = fs.statSync(currentPath);
    } catch {
      details.failedAccess.push(currentPath);
      return null;
    }

    if (currentStats.isDirectory()) {
      stats.folders += 1;

      if (options.depth !== null && currentDepth >= options.depth) {
        return {
          name,
          type: 'folder',
          children: [],
        };
      }

      let items = [];

      try {
        items = fs
          .readdirSync(currentPath)
          .sort((first, second) => first.localeCompare(second));
      } catch {
        details.failedAccess.push(currentPath);
        return {
          name,
          type: 'folder',
          children: [],
        };
      }

      const children = items
        .map((item) => walk(path.join(currentPath, item), currentDepth + 1))
        .filter(Boolean);

      return {
        name,
        type: 'folder',
        children,
      };
    }

    if (options.dirsOnly) {
      return null;
    }

    if (shouldIgnoreFileIn(relativeParts, ignoreFilesIn)) {
      return null;
    }

    stats.files += 1;

    return {
      name,
      type: 'file',
    };
  }

  const tree = walk(absoluteRootPath, 0);

  if (!tree) {
    return {
      tree: {
        name: rootName,
        type: 'folder',
        children: [],
      },
      stats,
      details,
    };
  }

  tree.name = rootName;

  return {
    tree,
    stats,
    details,
  };
}
