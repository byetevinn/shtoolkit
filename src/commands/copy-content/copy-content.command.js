import fs from 'node:fs';
import { deliverOutput } from '../../shared/output/output.delivery.js';
import { formatCopyContentOutput, formatCopyContentDryRun } from './copy-content.formatters.js';
import {
  collectCopyContent,
  formatCopyContentDetails,
  formatCopyContentSummary,
  parseCopyContentArgs,
} from './copy-content.service.js';
import { getGitFiles } from './git-files.js';

export function runCopyContentCommand(args) {
  let options;
  try {
    options = parseCopyContentArgs(args);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

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
  shtk cpc --changed --dry-run

Options:
  --stdout                 Print output to terminal
  --file                   Save output to file
  --output <file>          Define output file name
  --paths-only             Output only resolved file paths
  --no-separator           Remove separators between file blocks
  --copy-as <text|file|auto>  Set the copy mode (default: auto)
  --text-max-chars <n>     Set maximum characters before saving to file (default: 3000)
  --dry-run                Analyze files and show summary without copying
  --changed                Copy files modified in working tree (unstaged)
  --staged                 Copy files staged for commit
  --untracked              Copy untracked files
  --all-changes            Copy union of staged, unstaged, and untracked modified files
  -h, --help               Show help
`.trim(),
    );
    return;
  }

  const hasGitOptions = options.changed || options.staged || options.untracked || options.allChanges;

  if (hasGitOptions) {
    try {
      options.paths = getGitFiles({
        changed: options.changed,
        staged: options.staged,
        untracked: options.untracked,
        allChanges: options.allChanges,
      });

      if (options.paths.length === 0) {
        if (options.staged) {
          console.log('No staged files found.');
        } else if (options.changed) {
          console.log('No changed files found.');
        } else if (options.untracked) {
          console.log('No untracked files found.');
        } else if (options.allChanges) {
          console.log('No changes found.');
        }
        return;
      }
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
      return;
    }
  } else if (options.paths.length === 0) {
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

  if (options.dryRun) {
    const dryRunRes = formatCopyContentDryRun(result, output, options);
    console.log(dryRunRes);
    if (detailsOutput) {
      console.log();
      console.log(detailsOutput);
    }
    return;
  }

  if (options.file) {
    const outputFile = options.output || 'copied_content.txt';
    fs.writeFileSync(outputFile, output, 'utf8');
    console.log(`File generated: ${outputFile}`);
    console.log();
    console.log(formatCopyContentSummary(result.stats, output));

    if (detailsOutput) {
      console.log();
      console.log(detailsOutput);
    }

    return;
  }

  if (options.stdout) {
    console.log(output);
    console.log();
    console.log(formatCopyContentSummary(result.stats, output));

    if (detailsOutput) {
      console.log();
      console.log(detailsOutput);
    }

    return;
  }

  const deliveryConfig = {};
  if (options.copyAs) {
    deliveryConfig.mode = options.copyAs;
  }
  if (options.textMaxChars !== null) {
    deliveryConfig.textMaxChars = options.textMaxChars;
  }

  try {
    const delivery = deliverOutput({
      content: output,
      fileName: 'shtoolkit-copy-content.txt',
      config: { output: deliveryConfig },
    });

    if (delivery.delivery === 'text') {
      console.log('✅ Content copied to clipboard as text');
    } else if (delivery.delivery === 'file') {
      console.log('✅ Output file copied to clipboard');
      const displayPath = delivery.file.windowsPath || delivery.file.filePath;
      console.log(`📄 File: ${displayPath}`);
    }

    console.log();
    console.log(formatCopyContentSummary(result.stats, output));

    if (detailsOutput) {
      console.log();
      console.log(detailsOutput);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
