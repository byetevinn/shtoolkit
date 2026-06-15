# 🌳 tree Command

## Overview

The `tree` command generates a structured view of your project.

It supports multiple output formats and respects configuration defined in `.shtk.json`.

[🇧🇷 Leia em Português](./tree.command.pt-BR.md)

---

## Usage

```bash
shtk tree [options]
```

---

## Examples

### Default output (JSON)

```bash
shtk tree
```

### Pretty output

```bash
shtk tree --pretty
```

### YAML output

```bash
shtk tree --yaml
```

### Print to terminal

```bash
shtk tree --stdout
```

### Save to file

```bash
shtk tree --file
```

### Save YAML to file

```bash
shtk tree --file --yaml
```

### Limit depth

```bash
shtk tree --depth 2
```

### Only directories

```bash
shtk tree --dirs-only
```

### Use a custom path

```bash
shtk tree --path ./src
```

### Clipboard overrides

Force copy as text:
```bash
shtk tree --copy-as text
```

Force copy as file:
```bash
shtk tree --copy-as file
```

Auto mode with a custom character limit:
```bash
shtk tree --copy-as auto --text-max-chars 3000
```

Force copy as YAML file:
```bash
shtk tree --yaml --copy-as file
```

---

## Options

| Option             | Description              |
| ------------------ | ------------------------ |
| `--stdout`         | Print output to terminal |
| `--file`           | Save output to file      |
| `--output <file>`  | Define output file name  |
| `--pretty`         | Pretty-print JSON output |
| `--yaml`           | Output as YAML           |
| `--depth <number>` | Limit traversal depth    |
| `--dirs-only`      | Include only directories |
| `--path <dir>`     | Define target path       |
| `--copy-as`        | Set copy mode (`text`, `file`, `auto`) |
| `--text-max-chars` | Max characters before copying as file |
| `-h, --help`       | Show help                |

---

## Behavior

* Reads configuration from `.shtk.json`
* Applies ignore rules (files and folders)
* Traverses directories recursively
* Sorts files and folders alphabetically
* Uses JSON as the default output format
* Integrates with `deliverOutput` to copy output intelligently as text or a temporary file

---

## Configuration (.shtk.json)

The `tree` command respects ignore rules and output configuration defined in `.shtk.json`.

### Example

```json
{
  "output": {
    "mode": "auto",
    "textMaxChars": 3000,
    "file": {
      "location": "windowsTemp",
      "clipboard": "file"
    }
  },
  "tree": {
    "ignore": {
      "names": ["node_modules", ".git"],
      "filesIn": ["screenshots", "src/temp/uploads"],
      "patterns": ["*.log", "*.tmp"]
    }
  }
}
```

---

## Output Example (JSON)

```json
{
  "name": "project",
  "type": "folder",
  "children": []
}
```

---

## Notes

* This command is ideal for **visualizing project structure**
* Works well for documentation and sharing
* Configuration is optional
* If the config file is invalid, the command fails with a friendly error message

---

## Best Practices

* Use `--pretty` for quick inspection
* Use `--yaml` when you want a more compact, readable export
* Use `--file` for saving generated outputs
* Keep `.shtk.json` simple and focused

---

## Summary

The `tree` command provides a **clear, configurable, and structured view** of your project, making it easier to explore, document, and understand file organization.
