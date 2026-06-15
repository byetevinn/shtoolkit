export const DEFAULT_TREE_CONFIG = {
  ignore: {
    names: [
      'venv',
      '__pycache__',
      '.git',
      '.env',
      'README.md',
      'structure.py',
      'node_modules',
      'dist',
      '.pnpm-store',
      '.husky',
      'project_structure.json',
      'project_tree.json',
      'project_tree.min.json',
      'project_tree.yaml',
    ],
    filesIn: ['screenshots', 'processed', 'sites'],
    patterns: [],
  },
};

export const DEFAULT_OUTPUT_CONFIG = {
  mode: 'auto',
  textMaxChars: 3000,
  file: {
    location: 'windowsTemp',
    clipboard: 'file',
  },
};

