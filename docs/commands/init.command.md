# ⚙️ init Command

## Overview

The `init` command creates a default `.shtk.json` configuration file in your project.

This file is used by commands like `tree` and `copy-content` to control behavior such as ignored files and smart clipboard limits.

[🇧🇷 Leia em Português](./init.command.pt-BR.md)

---

## Usage

```bash
shtk init
```

---

## What it does

* Creates a `.shtk.json` file in the current directory
* Applies default ignore and output delivery rules
* Does not overwrite existing configuration

---

## Example

```bash
shtk init
```

Output:

```
✅ .shtk.json created
```

---

## Generated Configuration

Example of `.shtk.json`:

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
  "copyContent": {
    "pathMode": "relative"
  },
  "tree": {
    "ignore": {
      "names": ["node_modules", ".git", "dist", "venv", "__pycache__"],
      "filesIn": ["screenshots", "uploads"],
      "patterns": ["*.log", "*.tmp", "*.lock"]
    }
  }
}
```

### Configuration Fields

* `output.mode`: The copy delivery strategy (`text`, `file`, or `auto`).
* `output.textMaxChars`: Maximum characters allowed for plain text copying in `auto` mode before switching to file copy.
* `output.file.location`: Location where temporary files are generated (currently only `windowsTemp` is supported).
* `output.file.clipboard`: Technique used to copy the temporary file (`file` copies the real file object).
* `copyContent.pathMode`: How paths are presented in copy output (e.g. `relative`).

---

## Behavior

* If `.shtk.json` already exists:

  * The command will **not overwrite it**
  * You must edit it manually

---

## Notes

* This command is optional but recommended
* Enables better control over project structure visualization and clipboard behavior

---

## Best Practices

* Run `shtk init` at the root of your project
* Customize ignore rules and output settings according to your needs

---

## Summary

The `init` command provides a quick way to bootstrap configuration, allowing you to customize how your project is analyzed, displayed, and copied by other commands.
