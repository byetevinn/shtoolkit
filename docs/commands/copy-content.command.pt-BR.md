# 📋 Comando copy-content

## Visão Geral

O comando `copy-content` permite coletar e copiar o conteúdo de arquivos e pastas diretamente para a área de transferência, terminal ou arquivo.

Diferente do comando `tree`, este comando **não utiliza o `.shtk.json`**. Ele segue exatamente os caminhos informados pelo usuário.

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

---

## Opções

| Opção            | Descrição                                |
| ---------------- | ---------------------------------------- |
| `--stdout`       | Imprime no terminal                      |
| `--file`         | Salva em arquivo                         |
| `--output`       | Define o nome do arquivo                 |
| `--paths-only`   | Mostra apenas os caminhos (sem conteúdo) |
| `--no-separator` | Remove separadores entre blocos          |
| `-h, --help`     | Exibe ajuda                              |

---

## Comportamento

* Aceita **arquivos e diretórios**
* Percorre diretórios recursivamente
* Remove duplicados automaticamente
* Ignora arquivos binários
* Trata caminhos inválidos sem quebrar a execução

---

## Saída

### Padrão

* Copia conteúdo para a área de transferência

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

* Este comando **não respeita `.shtk.json`**
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
* Use `--file` para grandes volumes
* Use entrada multilinha para seleções complexas

---

## Resumo

O comando `copy-content` foi projetado para **velocidade, flexibilidade e precisão**, permitindo extrair exatamente o necessário sem depender de configuração.
