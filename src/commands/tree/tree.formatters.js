import YAML from 'yaml';

export function formatTree(tree, options = {}) {
  if (options.yaml) {
    return YAML.stringify(tree);
  }

  return options.pretty ? JSON.stringify(tree, null, 2) : JSON.stringify(tree);
}
