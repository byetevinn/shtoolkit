# 🚀 Getting Started

Welcome to **shtoolkit** — a modern CLI to explore project structure and copy file content efficiently.

[🇧🇷 Leia em Português](./getting-started.pt-BR.md)

---

## Installation

### Using npm (recommended)

```bash
npm install -g @byetevinn/shtoolkit
```

### Using npx

```bash
npx @byetevinn/shtoolkit tree
```

---

## First Steps

### 1. Initialize configuration (optional)

```bash
shtk init
```

This creates a `.shtk.json` file to customize behavior (ignore rules, smart clipboard limits, etc.).

---

### 2. Explore your project structure

```bash
shtk tree --pretty
```

---

### 3. Copy file content

```bash
shtk cpc src
```

---

## Common Workflows

### Copy multiple paths

```bash
shtk cpc src docs README.md
```

### Use multiline input

```bash
shtk cpc "src
docs
README.md"
```

### Output to terminal

```bash
shtk cpc src --stdout
```

---

## Tips

* Use `tree` for structure visualization
* Use `copy-content` for extracting code or content
* Use `init` to customize ignore rules and output settings
* Large copy tasks automatically generate temporary files and copy them to the Windows/WSL clipboard for easy attachment in AI tools.

---

## Documentation

* [Commands](./commands.md)

---

## Summary

With just a few commands, you can:

* Understand your project structure
* Extract content quickly
* Improve your development workflow

---

Happy coding 🚀
