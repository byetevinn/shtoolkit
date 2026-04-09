function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function globToRegex(pattern) {
  const escaped = escapeRegex(pattern)
    .replace(/\\\*/g, '.*')
    .replace(/\\\?/g, '.');

  return new RegExp(`^${escaped}$`);
}

export function matchesGlob(value, patterns = []) {
  return patterns.some((pattern) => globToRegex(pattern).test(value));
}
