import fs from 'node:fs';
import path from 'node:path';

export function runInitCommand() {
  const targetPath = process.cwd();
  const configPath = path.join(targetPath, '.shtk.json');

  if (fs.existsSync(configPath)) {
    console.log('⚠️ .shtk.json already exists');
    return;
  }

  const defaultConfig = {
    output: {
      mode: 'auto',
      textMaxChars: 3000,
      file: {
        location: 'windowsTemp',
        clipboard: 'file'
      }
    },
    copyContent: {
      pathMode: 'relative'
    },
    tree: {
      ignore: {
        names: ['node_modules', '.git', 'dist', 'venv', '__pycache__'],
        filesIn: ['screenshots', 'uploads'],
        patterns: ['*.log', '*.tmp', '*.lock'],
      },
    },
  };

  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf8');

  console.log('✅ .shtk.json created');
}
