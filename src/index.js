import { runCopyContentCommand } from './commands/copy-content/copy-content.command.js';
import { runInitCommand } from './commands/init/init.command.js';
import { runTreeCommand } from './commands/tree/tree.command.js';

export function run(args) {
  const [command, ...rest] = args;

  if (!command || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  if (command === 'tree') {
    runTreeCommand(rest);
    return;
  }

  if (command === 'init') {
    runInitCommand(rest);
    return;
  }

  if (command === 'copy-content' || command === 'cpc') {
    runCopyContentCommand(rest);
    return;
  }

  console.error(`Unknown command: ${command}`);
  console.error('Run "shtk --help" to see available commands.');
  process.exitCode = 1;
}

function printHelp() {
  console.log(
    `
shtk - Shell toolkit CLI

Usage:
  shtk <command> [options]

Commands:
  tree           Generate a project tree output
  init           Create a default .shtk.json file
  copy-content   Copy file contents from files and directories
  cpc            Alias for copy-content

Options:
  -h, --help     Show help
`.trim(),
  );
}
