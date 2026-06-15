# ⚙️ Comando init

## Visão Geral

O comando `init` cria um arquivo de configuração padrão `.shtk.json` no seu projeto.

Esse arquivo é utilizado por comandos como `tree` e `copy-content` para controlar comportamentos como ignorar arquivos e pastas ou configurar limites inteligentes de cópia.

[🇺🇸 Read in English](./init.command.md)

---

## Uso

```bash
shtk init
```

---

## O que ele faz

* Cria o arquivo `.shtk.json` no diretório atual
* Aplica regras padrão de ignore e de saída (output)
* Não sobrescreve configurações existentes

---

## Exemplo

```bash
shtk init
```

Saída:

```
✅ .shtk.json created
```

---

## Configuração gerada

Exemplo do `.shtk.json`:

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
  "copyContent": {
    "pathMode": "relative"
  },
  "tree": {
    "ignore": {
      "names": ["node_modules", ".git", "dist", "venv", "__pycache__"],
      "filesIn": ["screenshots", "uploads"],
      "patterns": ["*.log", "*.tmp", "*.lock"]
    }
  }
}
```

### Campos de Configuração

* `output.mode`: A estratégia de entrega da cópia (`text`, `file` ou `auto`).
* `output.textMaxChars`: Quantidade máxima de caracteres permitidos para a cópia como texto simples no modo `auto` antes de gerar um arquivo.
* `output.file.location`: O diretório onde os arquivos temporários são gerados (atualmente apenas `windowsTemp` é suportado).
* `output.file.clipboard`: Método utilizado para copiar o arquivo temporário (`file` copia o arquivo real como objeto físico).
* `copyContent.pathMode`: Como os caminhos de arquivo são formatados na saída (ex: `relative`).

---

## Comportamento

* Se o `.shtk.json` já existir:

  * O comando **não sobrescreve** o arquivo
  * A edição deve ser feita manualmente

---

## Observações

* Este comando é opcional, mas recomendado
* Permite maior controle sobre a visualização da estrutura e comportamento do clipboard de saída

---

## Boas Práticas

* Execute `shtk init` na raiz do projeto
* Customize as regras de ignore e saída conforme necessário

---

## Resumo

O comando `init` facilita a inicialização da configuração do projeto, permitindo personalizar como outros comandos analisam, exibem e copiam a estrutura do projeto.
