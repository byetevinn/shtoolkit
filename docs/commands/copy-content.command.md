# 📋 copy-content Command

## Overview

The `copy-content` command allows you to collect and copy file contents from one or multiple paths directly to your clipboard, terminal, or file.

Paths shown in the output are always formatted relative to the current execution directory (`process.cwd()`) using forward slashes (`/`) for cross-platform compatibility.

This command reads `.shtk.json` for output delivery configuration.

[🇧🇷 Leia em Português](./copy-content.command.pt-BR.md)

---

## Usage

```bash
shtk copy-content [paths...] [options]
shtk cpc [paths...] [options]
```

---

## Examples

### Copy a folder

```bash
shtk cpc src
```

### Copy multiple paths

```bash
shtk cpc src docs README.md
```

### Multiline input

```bash
shtk cpc "src
docs
README.md"
```

### Output to terminal

```bash
shtk cpc src --stdout
```

### Output only file paths

```bash
shtk cpc src --paths-only
```

### Save to file

```bash
shtk cpc src --file --output result.txt
```

### Clipboard overrides

Force copy as text:
```bash
shtk cpc src --copy-as text
```

Force copy as file:
```bash
shtk cpc src --copy-as file
```

Auto mode with a custom character limit:
```bash
shtk cpc src --copy-as auto --text-max-chars 3000
```

### Git-aware & Dry Run Overrides

Dry run analysis:
```bash
shtk cpc src --dry-run
```

Copy only unstaged modified files:
```bash
shtk cpc --changed
```

Copy staged files:
```bash
shtk cpc --staged
```

Copy untracked files:
```bash
shtk cpc --untracked
```

Copy all changes (unstaged, staged, and untracked) in dry-run mode:
```bash
shtk cpc --all-changes --dry-run
```

---

## Options

| Option             | Description                                   |
| ------------------ | --------------------------------------------- |
| `--stdout`         | Print output to terminal                      |
| `--file`           | Save output to file                           |
| `--output`         | Define output file name                       |
| `--paths-only`     | Output only file paths (no content)           |
| `--no-separator`   | Remove separators between file blocks         |
| `--copy-as`        | Set copy mode (`text`, `file`, `auto`)        |
| `--text-max-chars` | Max characters before copying as file         |
| `--dry-run`        | Analyze files and show summary without copying|
| `--changed`        | Copy unstaged modified files                  |
| `--staged`         | Copy staged modified files                    |
| `--untracked`      | Copy untracked files                          |
| `--all-changes`    | Copy union of staged, unstaged, and untracked modified files |
| `-h, --help`       | Show help                                     |

---

## Behavior

* Accepts **files and directories**
* Recursively scans directories
* Automatically removes duplicates
* Skips binary files
* Handles invalid paths gracefully
* Uses relative paths in the final output

---

## Output

### Default

* Copies content to clipboard. Depending on your configuration or size limit, it will either copy as plain text or save to a temporary file and copy that file to your clipboard.

### Summary

```
📊 Copy Content Result

📁 Total Files : X
✅ Processed   : X
⏭ Skipped     : X
❌ Errors      : X
📄 Total Lines : X
🔢 Characters  : X
🧠 Est. Tokens : ~X
```

### Details (when applicable)

* Not Found
* Skipped Binary
* Failed to Read
* Failed Access

---

## Notes

* Respects the `output` section in `.shtk.json`
* Designed for **explicit and flexible file selection**
* Ideal for:

  * Copying code snippets
  * Sharing project parts
  * Feeding AI tools

---

## Alias

```bash
shtk cpc
```

---

## Best Practices

* Use `--paths-only` when you only need structure
* Use `--file` for large outputs that you want to save locally
* Use multiline input for complex selections

---

## Summary

The `copy-content` command is designed for **speed, flexibility, and precision**, allowing developers to extract exactly what they need from a project.
