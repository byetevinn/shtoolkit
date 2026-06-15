# 🧰 shtoolkit

CLI moderna para **explorar, filtrar e copiar conteúdo de projetos** com consistência e simplicidade.

[🇺🇸 Read in English](./README.md)

---

## ✨ Features

* 🌳 Gerar árvore de diretórios (`tree`)
* 📋 Copiar conteúdo de arquivos (`copy-content` / `cpc`) com entrega inteligente de saída (área de transferência de texto ou anexo real de arquivo no Windows/WSL automaticamente)
* ⚙️ Configuração centralizada via `.shtk.json` (para ignores de `tree` e configurações de `output`)
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

Isso cria o arquivo `.shtk.json`, utilizado pelos comandos para configurar listas de ignore e regras de entrega de saída (como limites de caracteres).

> ℹ️ Observação: tanto `tree` quanto `copy-content` leem as configurações de `output` do `.shtk.json` para decidir entre copiar como texto ou gerar um arquivo temporário no clipboard.

---

## 📋 Entrega Inteligente de Saída

Tanto o comando `tree` quanto o `copy-content` suportam entrega inteligente de saída (Smart Output Delivery) para melhorar a eficiência de fluxos de desenvolvimento, especialmente ao anexar arquivos em modelos de IA (ex: ChatGPT, Claude):

* **Modo (`output.mode = "auto"`)**: Por padrão, saídas pequenas (até `textMaxChars`, cujo padrão é `3000` caracteres) são copiadas diretamente como texto simples.
* **Geração Automática de Arquivo**: Caso a saída ultrapasse o limite de caracteres, um arquivo temporário é criado automaticamente e o arquivo físico real é copiado para a área de transferência.
* **Foco em Windows & WSL**: A integração com o clipboard de arquivo real é otimizada para funcionar tanto nativamente no Windows quanto dentro do WSL, resolvendo os caminhos do sistema dinamicamente.

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
