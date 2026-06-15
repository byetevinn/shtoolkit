export function parseArgs(args) {
  const options = {
    stdout: false,
    file: false,
    output: null,
    pretty: false,
    yaml: false,
    depth: null,
    dirsOnly: false,
    path: '.',
    help: false,
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

    if (arg === '--pretty') {
      options.pretty = true;
      continue;
    }

    if (arg === '--yaml') {
      options.yaml = true;
      continue;
    }

    if (arg === '--dirs-only') {
      options.dirsOnly = true;
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

    if (arg === '--depth') {
      const value = args[index + 1];
      options.depth = value ? Number(value) : null;
      index += 1;
      continue;
    }

    if (arg === '--path') {
      options.path = args[index + 1] ?? '.';
      index += 1;
    }
  }

  return options;
}

