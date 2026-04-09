# ⚙️ init Command

## Overview

The `init` command creates a default `.shtk.json` configuration file in your project.

This file is used by commands like `tree` to control behavior such as ignored files and folders.

[🇧🇷 Leia em Português](./init.command.pt-BR.md)

---

## Usage

```bash
shtk init
```

---

## What it does

* Creates a `.shtk.json` file in the current directory
* Applies default ignore rules
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
  "tree": {
    "ignore": {
      "names": ["node_modules", ".git", "dist", "venv", "__pycache__"],
      "filesIn": ["screenshots", "uploads"],
      "patterns": ["*.log", "*.tmp", "*.lock"]
    }
  }
}
```

---

## Behavior

* If `.shtk.json` already exists:

  * The command will **not overwrite it**
  * You must edit it manually

---

## Notes

* This command is optional but recommended
* Enables better control over project structure visualization

---

## Best Practices

* Run `shtk init` at the root of your project
* Customize ignore rules according to your needs
* Keep the configuration minimal and clean

---

## Summary

The `init` command provides a quick way to bootstrap configuration, allowing you to customize how your project is analyzed and displayed by other commands.
