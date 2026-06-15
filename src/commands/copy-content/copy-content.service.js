import fs from 'node:fs';
import path from 'node:path';

function uniqueList(values) {
  return [...new Set(values)];
}

function splitPathArgument(value) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeInputPath(inputPath) {
  return path.resolve(inputPath);
}

function isBinaryFile(filePath) {
  try {
    const fileDescriptor = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(8000);
    const bytesRead = fs.readSync(fileDescriptor, buffer, 0, buffer.length, 0);
    fs.closeSync(fileDescriptor);

    for (let index = 0; index < bytesRead; index += 1) {
      if (buffer[index] === 0) {
        return true;
      }
    }

    return false;
  } catch {
    return true;
  }
}

function countLines(content) {
  if (!content) {
    return 0;
  }

  return content.split(/\r?\n/).length;
}

function getDisplayPath(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  return relativePath.split(path.sep).join('/');
}

function collectFilesFromDirectory(directoryPath, state) {
  function walk(currentPath) {
    let stat;

    try {
      stat = fs.statSync(currentPath);
    } catch {
      state.details.failedAccess.push(currentPath);
      state.stats.errors += 1;
      return;
    }

    if (stat.isDirectory()) {
      let items = [];

      try {
        items = fs
          .readdirSync(currentPath)
          .sort((first, second) => first.localeCompare(second));
      } catch {
        state.details.failedAccess.push(currentPath);
        state.stats.errors += 1;
        return;
      }

      for (const item of items) {
        walk(path.join(currentPath, item));
      }

      return;
    }

    state.resolvedFiles.push(currentPath);
  }

  walk(directoryPath);
}

export function parseCopyContentArgs(args) {
  const options = {
    stdout: false,
    file: false,
    output: null,
    pathsOnly: false,
    noSeparator: false,
    help: false,
    paths: [],
    copyAs: null,
    textMaxChars: null,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === '--stdout') {
      options.stdout = true;
      continue;
    }

    if (arg === '--file') {
      options.file = true;
      continue;
    }

    if (arg === '--paths-only') {
      options.pathsOnly = true;
      continue;
    }

    if (arg === '--no-separator') {
      options.noSeparator = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--copy-as') {
      const val = args[index + 1];
      if (!val || !['text', 'file', 'auto'].includes(val)) {
        throw new Error(`Invalid value for --copy-as: "${val || ''}". Expected text, file, or auto.`);
      }
      options.copyAs = val;
      index += 1;
      continue;
    }

    if (arg === '--text-max-chars') {
      const val = args[index + 1];
      const parsed = parseInt(val, 10);
      if (Number.isNaN(parsed) || parsed < 0) {
        throw new Error(`Invalid value for --text-max-chars: "${val || ''}". Expected a non-negative number.`);
      }
      options.textMaxChars = parsed;
      index += 1;
      continue;
    }

    if (arg === '--output') {
      options.output = args[index + 1] ?? null;
      index += 1;
      continue;
    }

    options.paths.push(...splitPathArgument(arg));
  }

  options.paths = uniqueList(options.paths);

  return options;
}

export function collectCopyContent(inputPaths, options = {}) {
  const resolvedInputs = uniqueList(inputPaths.map(normalizeInputPath));
  const outputItems = [];

  const details = {
    notFound: [],
    skippedBinary: [],
    failedRead: [],
    failedAccess: [],
  };

  const stats = {
    total: 0,
    success: 0,
    skipped: 0,
    errors: 0,
    lines: 0,
  };

  const state = {
    resolvedFiles: [],
    details,
    stats,
  };

  for (const inputPath of resolvedInputs) {
    if (!fs.existsSync(inputPath)) {
      details.notFound.push(inputPath);
      stats.total += 1;
      stats.errors += 1;
      continue;
    }

    let stat;

    try {
      stat = fs.statSync(inputPath);
    } catch {
      details.failedAccess.push(inputPath);
      stats.total += 1;
      stats.errors += 1;
      continue;
    }

    if (stat.isDirectory()) {
      collectFilesFromDirectory(inputPath, state);
      continue;
    }

    state.resolvedFiles.push(inputPath);
  }

  const uniqueFiles = uniqueList(state.resolvedFiles);

  for (const filePath of uniqueFiles) {
    stats.total += 1;

    if (isBinaryFile(filePath)) {
      details.skippedBinary.push(filePath);
      stats.skipped += 1;
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');

      outputItems.push({
        path: filePath,
        displayPath: getDisplayPath(filePath),
        content,
      });

      stats.success += 1;
      stats.lines += countLines(content);
    } catch {
      details.failedRead.push(filePath);
      stats.errors += 1;
    }
  }

  if (options.pathsOnly) {
    return {
      outputItems: outputItems.map((item) => ({
        path: item.path,
        displayPath: item.displayPath,
        content: '',
      })),
      stats,
      details,
    };
  }

  return {
    outputItems,
    stats,
    details,
  };
}

export function formatCopyContentSummary(stats) {
  return `
📊 Copy Content Result

📁 Total Files : ${stats.total}
✅ Processed   : ${stats.success}
⏭ Skipped     : ${stats.skipped}
❌ Errors      : ${stats.errors}
📄 Total Lines : ${stats.lines}
`.trim();
}

export function formatCopyContentDetails(details) {
  const sections = [];

  if (details.notFound.length > 0) {
    sections.push(
      ['❌ Not Found', ...details.notFound.map((item) => `- ${getDisplayPath(item)}`)].join(
        '\n',
      ),
    );
  }

  if (details.skippedBinary.length > 0) {
    sections.push(
      [
        '⏭ Skipped Binary',
        ...details.skippedBinary.map((item) => `- ${getDisplayPath(item)}`),
      ].join('\n'),
    );
  }

  if (details.failedRead.length > 0) {
    sections.push(
      [
        '⚠️ Failed to Read',
        ...details.failedRead.map((item) => `- ${getDisplayPath(item)}`),
      ].join('\n'),
    );
  }

  if (details.failedAccess.length > 0) {
    sections.push(
      [
        '🚫 Failed Access',
        ...details.failedAccess.map((item) => `- ${getDisplayPath(item)}`),
      ].join('\n'),
    );
  }

  return sections.join('\n\n');
}
