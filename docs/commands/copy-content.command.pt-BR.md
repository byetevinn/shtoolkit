# 📋 Comando copy-content

## Visão Geral

O comando `copy-content` permite coletar e copiar o conteúdo de arquivos e pastas diretamente para a área de transferência, terminal ou arquivo.

Os caminhos exibidos no output são sempre formatados de forma relativa ao diretório atual onde o comando é executado (`process.cwd()`) usando barras normais (`/`) para compatibilidade multiplataforma.

Este comando lê a configuração `.shtk.json` para regras de entrega de saída (output delivery).

[🇺🇸 Read in English](./copy-content.command.md)

---

## Uso

```bash
shtk copy-content [paths...] [options]
shtk cpc [paths...] [options]
```

---

## Exemplos

### Copiar uma pasta

```bash
shtk cpc src
```

### Copiar múltiplos caminhos

```bash
shtk cpc src docs README.md
```

### Entrada multilinha

```bash
shtk cpc "src
docs
README.md"
```

### Imprimir no terminal

```bash
shtk cpc src --stdout
```

### Exibir apenas caminhos

```bash
shtk cpc src --paths-only
```

### Salvar em arquivo

```bash
shtk cpc src --file --output resultado.txt
```

### Sobrescritas de área de transferência (clipboard)

Forçar cópia como texto:
```bash
shtk cpc src --copy-as text
```

Forçar cópia como arquivo:
```bash
shtk cpc src --copy-as file
```

Modo automático com limite customizado de caracteres:
```bash
shtk cpc src --copy-as auto --text-max-chars 3000
```

---

## Opções

| Opção            | Descrição                                |
| ---------------- | ---------------------------------------- |
| `--stdout`       | Imprime no terminal                      |
| `--file`         | Salva em arquivo                         |
| `--output`       | Define o nome do arquivo                 |
| `--paths-only`   | Mostra apenas os caminhos (sem conteúdo) |
| `--no-separator` | Remove separadores entre blocos          |
| `--copy-as`      | Define o modo de cópia (`text`, `file`, `auto`) |
| `--text-max-chars` | Limite de caracteres antes de gerar arquivo |
| `-h, --help`     | Exibe ajuda                              |

---

## Comportamento

* Aceita **arquivos e diretórios**
* Percorre diretórios recursivamente
* Remove duplicados automaticamente
* Ignora arquivos binários
* Trata caminhos inválidos sem quebrar a execução
* Usa caminhos relativos na saída final

---

## Saída

### Padrão

* Copia o conteúdo para a área de transferência. Dependendo do limite de caracteres e configurações, pode copiar como texto ou gerar um arquivo temporário físico no Windows/WSL e colocá-lo no clipboard.

### Resumo

```
📊 Copy Content Result

📁 Total Files : X
✅ Processed   : X
⏭ Skipped     : X
❌ Errors      : X
📄 Total Lines : X
```

### Detalhes (quando houver)

* Not Found
* Skipped Binary
* Failed to Read
* Failed Access

---

## Observações

* Respeita a seção `output` no `.shtk.json`
* Foi projetado para ser **explícito e flexível**
* Ideal para:

  * Copiar trechos de código
  * Compartilhar partes do projeto
  * Alimentar ferramentas de IA

---

## Alias

```bash
shtk cpc
```

---

## Boas Práticas

* Use `--paths-only` para estrutura
* Use `--file` para salvar grandes volumes localmente
* Use entrada multilinha para seleções complexas

---

## Resumo

O comando `copy-content` foi projetado para **velocidade, flexibilidade e precisão**, permitindo extrair exatamente o necessário de forma inteligente.
