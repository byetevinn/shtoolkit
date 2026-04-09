# ⚙️ Comando init

## Visão Geral

O comando `init` cria um arquivo de configuração padrão `.shtk.json` no seu projeto.

Esse arquivo é utilizado por comandos como o `tree` para controlar comportamentos como ignorar arquivos e pastas.

[🇺🇸 Read in English](./init.command.md)

---

## Uso

```bash
shtk init
```

---

## O que ele faz

* Cria o arquivo `.shtk.json` no diretório atual
* Aplica regras padrão de ignore
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
  "tree": {
    "ignore": {
      "names": ["node_modules", ".git", "dist", "venv", "__pycache__"],
      "filesIn": ["screenshots", "uploads"],
      "patterns": ["*.log", "*.tmp", "*.lock"]
    }
  }
}
```

---

## Comportamento

* Se o `.shtk.json` já existir:

  * O comando **não sobrescreve** o arquivo
  * A edição deve ser feita manualmente

---

## Observações

* Este comando é opcional, mas recomendado
* Permite maior controle sobre a visualização da estrutura do projeto

---

## Boas Práticas

* Execute `shtk init` na raiz do projeto
* Customize as regras de ignore conforme necessário
* Mantenha a configuração simples e objetiva

---

## Resumo

O comando `init` facilita a inicialização da configuração do projeto, permitindo personalizar como outros comandos analisam e exibem a estrutura de arquivos.
