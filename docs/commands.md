# 📚 Commands

This section provides an overview of all available commands in **shtoolkit**.

[🇧🇷 Leia em Português](./commands.pt-BR.md)

---

## Available Commands

### 📋 copy-content

Copy file contents from one or more paths.

* Flexible input (files, folders, multiline)
* Relative paths format
* Smart output delivery support (text or file clipboard)

👉 [View documentation](./commands/copy-content.command.md)

---

### 🌳 tree

Visualize project structure.

* Supports JSON, YAML, and pretty formats
* Uses `.shtk.json` for configuration
* Smart output delivery support (text or file clipboard)

👉 [View documentation](./commands/tree.command.md)

---

### ⚙️ init

Initialize project configuration.

* Creates `.shtk.json`
* Enables customization for other commands

👉 [View documentation](./commands/init.command.md)

---

### 🩺 doctor

Diagnose your local environment setup.

* Checks Node and OS versions
* Checks WSL/Windows environment compatibility
* Validates clipboard commands and tools

👉 [View documentation](./commands/doctor.command.md)

---

### 🔢 version

Show installed version of shtoolkit.

* Standard CLI versioning flag support
* Reads dynamically from package.json

---

## Notes

* Commands are designed to be **simple and composable**
* Use `--help` to explore options for each command

---

## Summary

The shtoolkit CLI provides a small set of powerful commands focused on:

* Exploring project structure
* Extracting content
* Improving developer workflows
