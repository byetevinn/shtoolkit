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
