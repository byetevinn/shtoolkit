# 🌳 Comando tree

## Visão Geral

O comando `tree` gera uma visão estruturada do projeto.

Ele suporta múltiplos formatos de saída e respeita a configuração definida no `.shtk.json`.

[🇺🇸 Read in English](./tree.command.md)

---

## Uso

```bash
shtk tree [options]
```

---

## Exemplos

### Saída padrão (JSON)

```bash
shtk tree
```

### Saída formatada

```bash
shtk tree --pretty
```

### Saída em YAML

```bash
shtk tree --yaml
```

### Imprimir no terminal

```bash
shtk tree --stdout
```

### Salvar em arquivo

```bash
shtk tree --file
```

### Salvar YAML em arquivo

```bash
shtk tree --file --yaml
```

### Limitar profundidade

```bash
shtk tree --depth 2
```

### Apenas diretórios

```bash
shtk tree --dirs-only
```

### Usar um caminho específico

```bash
shtk tree --path ./src
```

### Sobrescritas de área de transferência (clipboard)

Forçar cópia como texto:
```bash
shtk tree --copy-as text
```

Forçar cópia como arquivo:
```bash
shtk tree --copy-as file
```

Modo automático com limite de caracteres personalizado:
```bash
shtk tree --copy-as auto --text-max-chars 3000
```

Forçar cópia como arquivo YAML:
```bash
shtk tree --yaml --copy-as file
```

---

## Opções

| Opção                | Descrição                |
| -------------------- | ------------------------ |
| `--stdout`           | Imprime no terminal      |
| `--file`             | Salva em arquivo         |
| `--output <arquivo>` | Define o nome do arquivo |
| `--pretty`           | Formata a saída JSON     |
| `--yaml`             | Saída em YAML            |
| `--depth <número>`   | Limita a profundidade    |
| `--dirs-only`        | Inclui apenas diretórios |
| `--path <dir>`       | Define o caminho alvo    |
| `--copy-as`          | Modo de cópia (`text`, `file`, `auto`) |
| `--text-max-chars`   | Limite de caracteres antes de gerar arquivo |
| `-h, --help`         | Exibe ajuda              |

---

## Comportamento

* Lê a configuração do `.shtk.json`
* Aplica regras de ignore (arquivos e pastas)
* Percorre diretórios recursivamente
* Ordena arquivos e pastas alfabeticamente
* Usa JSON como formato padrão de saída
* Integra-se ao `deliverOutput` para copiar os dados de saída de maneira inteligente como texto ou arquivo temporário físico no Windows/WSL

---

## Configuração (.shtk.json)

O comando `tree` respeita regras de ignore e regras de entrega de saída (output delivery) definidas no `.shtk.json`.

### Exemplo

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

## Exemplo de saída (JSON)

```json
{
  "name": "project",
  "type": "folder",
  "children": []
}
```

---

## Observações

* Ideal para **visualizar a estrutura do projeto**
* Útil para documentação e compartilhamento
* A configuração é opcional
* Se o arquivo de configuração estiver inválido, o comando falha com uma mensagem amigável

---

## Boas Práticas

* Use `--pretty` para inspeção rápida
* Use `--yaml` quando quiser uma exportação mais compacta e legível
* Use `--file` para salvar a saída gerada
* Mantenha o `.shtk.json` simples e objetivo

---

## Resumo

O comando `tree` fornece uma visão **clara, configurável e estruturada** do projeto, facilitando a exploração, documentação e entendimento da organização dos arquivos.
