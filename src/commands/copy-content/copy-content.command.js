import fs from 'node:fs';
import { copyToClipboard } from '../../shared/clipboard.js';
import { formatCopyContentOutput } from './copy-content.formatters.js';
import {
  collectCopyContent,
  formatCopyContentDetails,
  formatCopyContentSummary,
  parseCopyContentArgs,
} from './copy-content.service.js';

export function runCopyContentCommand(args) {
  const options = parseCopyContentArgs(args);

  if (options.help) {
    console.log(
      `
shtk copy-content

Usage:
  shtk copy-content [paths...] [options]
  shtk cpc [paths...] [options]

Examples:
  shtk cpc src docs README.md
  shtk cpc "src
docs
README.md"

Options:
  --stdout           Print output to terminal
  --file             Save output to file
  --output <file>    Define output file name
  --paths-only       Output only resolved file paths
  --no-separator     Remove separators between file blocks
  -h, --help         Show help
`.trim(),
    );
    return;
  }

  if (options.paths.length === 0) {
    console.error('No input paths provided.');
    console.error(
      'Usage: shtk copy-content [paths...] [options] or shtk cpc [paths...] [options]',
    );
    process.exitCode = 1;
    return;
  }

  const result = collectCopyContent(options.paths, {
    pathsOnly: options.pathsOnly,
  });

  const detailsOutput = formatCopyContentDetails(result.details);

  if (!result.outputItems.length) {
    console.error('No valid content found.');
    console.log();
    console.log(formatCopyContentSummary(result.stats));

    if (detailsOutput) {
      console.log();
      console.log(detailsOutput);
    }

    process.exitCode = 1;
    return;
  }

  const output = formatCopyContentOutput(result.outputItems, {
    pathsOnly: options.pathsOnly,
    noSeparator: options.noSeparator,
  });

  if (options.file) {
    const outputFile = options.output || 'copied_content.txt';
    fs.writeFileSync(outputFile, output, 'utf8');
    console.log(`File generated: ${outputFile}`);
    console.log();
    console.log(formatCopyContentSummary(result.stats));

    if (detailsOutput) {
      console.log();
      console.log(detailsOutput);
    }

    return;
  }

  if (options.stdout) {
    console.log(output);
    console.log();
    console.log(formatCopyContentSummary(result.stats));

    if (detailsOutput) {
      console.log();
      console.log(detailsOutput);
    }

    return;
  }

  const copied = copyToClipboard(output);

  if (!copied) {
    console.error('Clipboard is not available.');
    process.exitCode = 1;
    return;
  }

  console.log('Content copied to clipboard');
  console.log();
  console.log(formatCopyContentSummary(result.stats));

  if (detailsOutput) {
    console.log();
    console.log(detailsOutput);
  }
}
