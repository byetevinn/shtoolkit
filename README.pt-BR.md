# 🧰 shtoolkit

CLI moderna para **explorar, filtrar e copiar conteúdo de projetos** com consistência e simplicidade.

[🇺🇸 Read in English](./README.md)

---

## ✨ Features

* 🌳 Gerar árvore de diretórios (`tree`)
* 📋 Copiar conteúdo de arquivos (`copy-content` / `cpc`)
* ⚙️ Configuração via `.shtk.json` (para `tree`)
* 🔍 Regras de ignore por nome, pasta e glob
* 📦 Saída em JSON e YAML
* 📊 Estatísticas detalhadas
* 🚫 Tratamento de erros robusto

---

## 📦 Instalação

### Global

```bash
npm install -g @byetevinn/shtoolkit
```

### Usando npx

```bash
npx @byetevinn/shtoolkit tree
```

---

## 🚀 Comandos

### 🌳 Tree

Gera a estrutura do projeto.

```bash
shtk tree
```

👉 Documentação: [tree](./docs/commands/tree.command.pt-BR.md)

---

### 📋 Copy Content (cpc)

Copia conteúdo de arquivos a partir dos caminhos informados.

```bash
shtk cpc src
```

👉 Documentação: [copy-content](./docs/commands/copy-content.command.pt-BR.md)

---

### ⚙️ Init

Inicializa o arquivo de configuração.

```bash
shtk init
```

👉 Documentação: [init](./docs/commands/init.command.pt-BR.md)

---

## 📚 Documentação

* [Getting Started](./docs/getting-started.pt-BR.md)
* [Commands](./docs/commands.pt-BR.md)

---

## ⚙️ Configuração

Execute:

```bash
shtk init
```

Isso cria o arquivo `.shtk.json`, utilizado pelo comando `tree`.

> ℹ️ Observação: `copy-content` NÃO utiliza `.shtk.json` — ele segue apenas os caminhos informados.

---

## 🧠 Regras de Ignore

### `names`

Ignora arquivos/pastas em qualquer nível

```json
"names": ["node_modules", ".git"]
```

### `filesIn`

Ignora arquivos dentro de pastas específicas

```json
"filesIn": ["screenshots", "src/temp/uploads"]
```

### `patterns`

Suporte a glob

```json
"patterns": ["*.log", "*.tmp"]
```

---

## 📊 Exemplo de Saída

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

## 📈 Exemplo de Estatísticas

```
📊 Copy Content Result

📁 Total Files : 23
✅ Processed   : 23
⏭ Skipped     : 0
❌ Errors      : 0
📄 Total Lines : 1213
```

---

## 🧪 Casos de Uso

* Preparar contexto para IA (ChatGPT, etc)
* Gerar documentação de projetos
* Analisar estrutura de código
* Debug de arquivos

---

## 🛠 Roadmap

* [ ] Saída em Markdown
* [ ] Flag `--flat`
* [ ] Integração com `.gitignore`
* [ ] Suporte a múltiplos diretórios

---

## 👤 Autor

Desenvolvido por **[Stevan Padilha](https://github.com/byetevinn)**

---

## 📝 Licença

MIT
