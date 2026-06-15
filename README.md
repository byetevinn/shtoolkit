# 🧰 shtoolkit

Modern CLI to **explore, filter and copy project content** with consistency and simplicity.

[🇧🇷 Leia em Português](./README.pt-BR.md)

---

## ✨ Features

* 🌳 Generate project tree (`tree`)
* 📋 Copy file contents (`copy-content` / `cpc`) with smart output delivery (text clipboard or automatic Windows/WSL file attachment)
* 🩺 Diagnose local environment (`doctor`)
* 🔀 Git-aware file selection (`--changed`, `--staged`, `--untracked`, `--all-changes`) for clipboard copying
* ⚙️ Centralized config via `.shtk.json` (for `tree` ignores and `output` settings)
* 🔍 Ignore rules by name, folder and glob
* 📦 JSON and YAML output
* 📊 Detailed statistics & Dry-run analysis (`--dry-run`) with character and token count estimation
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

### 🩺 Doctor

Diagnose your local environment (Node, WSL, PowerShell, clipboard access).

```bash
shtk doctor
```

👉 Full docs: [doctor](./docs/commands/doctor.command.md)

---

### 🔢 Version

Show the installed version.

```bash
shtk version
# or shtk -v / shtk --version
```

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

This creates a `.shtk.json` file used by commands to configure ignore lists and output delivery (such as copy limits).

> ℹ️ Note: both `tree` and `copy-content` read `output` settings from `.shtk.json` to decide between text clipboard and file clipboard delivery.

---

## 📋 Smart Output Delivery

Both `tree` and `copy-content` support smart output delivery to improve workflow efficiency, especially when feeding files to AI models (e.g. ChatGPT, Claude):

* **Mode (`output.mode = "auto"`)**: By default, small outputs (up to `textMaxChars`, default `3000` characters) are copied directly as plain text.
* **Automatic File Caching**: If the output length exceeds the character limit, a temporary file is automatically created, and the actual file object is copied to your clipboard.
* **WSL & Windows Native Focus**: The real file clipboard integration is optimized to run smoothly on both native Windows and WSL environments, resolving paths dynamically.

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
🔢 Characters  : 4852
🧠 Est. Tokens : ~1213
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
