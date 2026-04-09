# 📋 copy-content Command

## Overview

The `copy-content` command allows you to collect and copy file contents from one or multiple paths directly to your clipboard, terminal, or file.

Unlike the `tree` command, this command does **not use `.shtk.json` configuration**. It strictly follows the paths provided by the user.

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

---

## Options

| Option           | Description                           |
| ---------------- | ------------------------------------- |
| `--stdout`       | Print output to terminal              |
| `--file`         | Save output to file                   |
| `--output`       | Define output file name               |
| `--paths-only`   | Output only file paths (no content)   |
| `--no-separator` | Remove separators between file blocks |
| `-h, --help`     | Show help                             |

---

## Behavior

* Accepts **files and directories**
* Recursively scans directories
* Automatically removes duplicates
* Skips binary files
* Handles invalid paths gracefully

---

## Output

### Default

* Copies content to clipboard

### Summary

```
📊 Copy Content Result

📁 Total Files : X
✅ Processed   : X
⏭ Skipped     : X
❌ Errors      : X
📄 Total Lines : X
```

### Details (when applicable)

* Not Found
* Skipped Binary
* Failed to Read
* Failed Access

---

## Notes

* This command **does not respect `.shtk.json`**
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
* Use `--file` for large outputs
* Use multiline input for complex selections

---

## Summary

The `copy-content` command is designed for **speed, flexibility, and precision**, allowing developers to extract exactly what they need from a project without relying on configuration.
