import fs from 'node:fs';
import { parseArgs } from '../../shared/args.js';
import { copyToClipboard } from '../../shared/clipboard.js';
import { loadTreeConfig } from '../../config/tree.config.js';
import { buildTree } from './tree.service.js';
import { formatTree } from './tree.formatters.js';

function formatTreeSummary(stats) {
  return `📊 Folders: ${stats.folders} | Files: ${stats.files}`;
}

function formatTreeDetails(details) {
  const sections = [];

  if (details.failedAccess?.length > 0) {
    sections.push(
      [
        '⚠️ Failed Access',
        ...details.failedAccess.map((item) => `- ${item}`),
      ].join('\n'),
    );
  }

  return sections.join('\n\n');
}

function getDefaultOutputFile(options) {
  if (options.yaml) {
    return 'project_tree.yaml';
  }

  if (options.pretty) {
    return 'project_tree.json';
  }

  return 'project_tree.min.json';
}

export function runTreeCommand(args) {
  const options = parseArgs(args);

  if (options.help) {
    console.log(
      `
shtk tree

Usage:
  shtk tree [options]

Options:
  --stdout           Print output to terminal
  --file             Save output to file
  --output <file>    Define output file name
  --pretty           Pretty-print output
  --yaml             Output as YAML
  --depth <number>   Limit traversal depth
  --dirs-only        Include directories only
  --path <dir>       Define target path
  -h, --help         Show help
`.trim(),
    );
    return;
  }

  let config;

  try {
    config = loadTreeConfig(options.path);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const { tree, stats, details } = buildTree(options.path, {
    depth: options.depth,
    dirsOnly: options.dirsOnly,
    config,
  });

  const output = formatTree(tree, {
    pretty: options.pretty,
    yaml: options.yaml,
  });

  const detailsOutput = formatTreeDetails(details);

  if (options.file) {
    const outputFile = options.output || getDefaultOutputFile(options);
    fs.writeFileSync(outputFile, output, 'utf8');

    console.log(`✅ File generated: ${outputFile}`);
    console.log();
    console.log(formatTreeSummary(stats));

    if (detailsOutput) {
      console.log();
      console.log(detailsOutput);
    }

    return;
  }

  if (options.stdout) {
    console.log(output);
    console.log();
    console.log(formatTreeSummary(stats));

    if (detailsOutput) {
      console.log();
      console.log(detailsOutput);
    }

    return;
  }

  const copied = copyToClipboard(output);

  if (!copied) {
    console.error('❌ Clipboard is not available.');
    process.exitCode = 1;
    return;
  }

  console.log('✅ Tree copied to clipboard');
  console.log();
  console.log(formatTreeSummary(stats));

  if (detailsOutput) {
    console.log();
    console.log(detailsOutput);
  }
}
