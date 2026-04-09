# 🧰 shtoolkit

Modern CLI to **explore, filter and copy project content** with consistency and simplicity.

[🇧🇷 Leia em Português](./README.pt-BR.md)

---

## ✨ Features

* 🌳 Generate project tree (`tree`)
* 📋 Copy file contents (`copy-content` / `cpc`)
* ⚙️ Centralized config via `.shtk.json` (for `tree`)
* 🔍 Ignore rules by name, folder and glob
* 📦 JSON and YAML output
* 📊 Detailed statistics
* 🚫 Robust error handling

---

## 📦 Installation

### Global

```bash
npm install -g @byetevinn/shtoolkit
```

### Using npx

```bash
npx @byetevinn/shtoolkit tree
```

---

## 🚀 Commands

### 🌳 Tree

Generate project structure.

```bash
shtk tree
```

👉 Full docs: [tree](./docs/commands/tree.command.md)

---

### 📋 Copy Content (cpc)

Copy file contents from one or more paths.

```bash
shtk cpc src
```

👉 Full docs: [copy-content](./docs/commands/copy-content.command.md)

---

### ⚙️ Init

Initialize configuration file.

```bash
shtk init
```

👉 Full docs: [init](./docs/commands/init.command.md)

---

## 📚 Documentation

* [Getting Started](./docs/getting-started.md)
* [Commands](./docs/commands.md)

---

## ⚙️ Configuration

Run:

```bash
shtk init
```

This creates a `.shtk.json` file used by the `tree` command.

> ℹ️ Note: `copy-content` does NOT use `.shtk.json` — it always follows the paths provided.

---

## 🧠 Ignore Rules

### `names`

Ignore files/folders anywhere

```json
"names": ["node_modules", ".git"]
```

### `filesIn`

Ignore files inside specific folders

```json
"filesIn": ["screenshots", "src/temp/uploads"]
```

### `patterns`

Glob support

```json
"patterns": ["*.log", "*.tmp"]
```

---

## 📊 Example Output

### JSON

```json
{
  "name": "project",
  "type": "folder",
  "children": []
}
```

### YAML

```yaml
name: project
type: folder
children: []
```

---

## 📈 Stats Example

```
📊 Copy Content Result

📁 Total Files : 23
✅ Processed   : 23
⏭ Skipped     : 0
❌ Errors      : 0
📄 Total Lines : 1213
```

---

## 🧪 Use Cases

* Prepare context for AI (ChatGPT, etc)
* Generate project documentation
* Analyze codebase structure
* Debug file content

---

## 🛠 Roadmap

* [ ] Markdown output
* [ ] `--flat` flag
* [ ] `.gitignore` integration
* [ ] Multi-directory support

---

## 👤 Author

Built by **[Stevan Padilha](https://github.com/byetevinn)**

---

## 📝 License

MIT
