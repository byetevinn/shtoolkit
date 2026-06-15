export function formatCopyContentOutput(items, options = {}) {
  if (!items.length) {
    return '';
  }

  if (options.pathsOnly) {
    return items.map((item) => item.displayPath || item.path).join('\n');
  }

  const separator = options.noSeparator
    ? '\n\n'
    : '\n\n----------------------------------------\n\n';

  return items.map((item) => `${item.displayPath || item.path}\n\n${item.content}`).join(separator);
}
