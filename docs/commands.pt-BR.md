# 📚 Comandos

Esta seção apresenta uma visão geral de todos os comandos disponíveis no **shtoolkit**.

[🇺🇸 Read in English](./commands.md)

---

## Comandos disponíveis

### 📋 copy-content

Copia o conteúdo de arquivos a partir de um ou mais caminhos.

* Entrada flexível (arquivos, pastas, multilinha)
* Caminhos de arquivo relativos
* Suporte a entrega inteligente de saída (texto ou arquivo físico)

👉 [Ver documentação](./commands/copy-content.command.pt-BR.md)

---

### 🌳 tree

Visualiza a estrutura do projeto.

* Suporta formatos JSON, YAML e pretty
* Utiliza `.shtk.json` para configuração
* Suporte a entrega inteligente de saída (texto ou arquivo físico)

👉 [Ver documentação](./commands/tree.command.pt-BR.md)

---

### ⚙️ init

Inicializa a configuração do projeto.

* Cria o arquivo `.shtk.json`
* Permite personalização dos outros comandos

👉 [Ver documentação](./commands/init.command.pt-BR.md)

---

### 🩺 doctor

Diagnostica a configuração do ambiente local.

* Verifica versões do Node e sistema operacional
* Verifica compatibilidade entre o Windows e WSL
* Valida comandos e utilitários da área de transferência

👉 [Ver documentação](./commands/doctor.command.pt-BR.md)

---

### 🔢 version

Exibe a versão instalada do shtoolkit.

* Suporte aos parâmetros padrão de versionamento CLI
* Lê dinamicamente do arquivo package.json

---

## Observações

* Os comandos foram projetados para serem **simples e combináveis**
* Use `--help` para explorar as opções de cada comando

---

## Resumo

A CLI shtoolkit oferece um conjunto enxuto de comandos poderosos focados em:

* Explorar a estrutura do projeto
* Extrair conteúdo
* Melhorar o fluxo de desenvolvimento
