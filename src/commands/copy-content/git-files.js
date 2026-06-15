import { execFileSync } from 'node:child_process';
import path from 'node:path';

export function getGitFiles({ changed, staged, untracked, allChanges }) {
  // Check if Git is installed and we are in a Git repository
  let gitRoot;
  try {
    gitRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
  } catch {
    throw new Error('❌ Git-aware options require a Git repository.');
  }

  const files = new Set();

  if (changed || allChanges) {
    try {
      const output = execFileSync('git', ['diff', '--name-only'], { encoding: 'utf8' });
      output.split(/\r?\n/).map(f => f.trim()).filter(Boolean).forEach(file => {
        files.add(path.resolve(gitRoot, file));
      });
    } catch {
      // Ignore git errors
    }
  }

  if (staged || allChanges) {
    try {
      const output = execFileSync('git', ['diff', '--name-only', '--cached'], { encoding: 'utf8' });
      output.split(/\r?\n/).map(f => f.trim()).filter(Boolean).forEach(file => {
        files.add(path.resolve(gitRoot, file));
      });
    } catch {
      // Ignore git errors
    }
  }

  if (untracked || allChanges) {
    try {
      const output = execFileSync('git', ['ls-files', '--others', '--exclude-standard'], { encoding: 'utf8' });
      output.split(/\r?\n/).map(f => f.trim()).filter(Boolean).forEach(file => {
        files.add(path.resolve(gitRoot, file));
      });
    } catch {
      // Ignore git errors
    }
  }

  return Array.from(files);
}
