# 🩺 Comando doctor

## Visão Geral

O comando `doctor` diagnostica o seu ambiente de execução local. Ele executa testes rápidos nos componentes do sistema, verifica a compatibilidade e imprime o status para fins de depuração.

[🇺🇸 Read in English](./doctor.command.md)

---

## Uso

```bash
shtk doctor
```

---

## O que ele faz

Executa testes de diagnóstico sobre:
* **shtoolkit version**: Mostra a versão atualmente instalada da CLI.
* **node version**: Mostra a versão ativa do Node.js.
* **platform**: Mostra o sistema operacional ativo (ex: `win32`, `linux`).
* **wsl**: Detecta se a execução está ocorrendo dentro do WSL (Windows Subsystem for Linux).
* **powershell.exe**: Verifica se o PowerShell está disponível no PATH (essencial para o clipboard de arquivos no WSL).
* **wslpath**: Verifica se a ferramenta de conversão de caminhos está disponível no WSL.
* **text clipboard**: Verifica utilitários de cópia de texto (ex: `pbcopy`, `xclip`, `wl-copy`, `clip.exe`).
* **file clipboard**: Verifica se a plataforma suporta copiar arquivos físicos como objetos para a área de transferência (suportado no Windows e WSL).
* **current binary / package path**: Mostra os caminhos do binário ativo e do pacote instalado.

---

## Exemplo de Saída

```txt
🩺 shtoolkit doctor

shtoolkit version : 1.1.0
node version      : v22.16.0
platform          : win32
wsl               : false
powershell.exe    : available
wslpath           : missing
text clipboard    : available (clip.exe)
file clipboard    : available
current binary    : C:\Users\...\shtoolkit\bin\cli.js
package path      : C:\Users\...\shtoolkit
```

---

## Resumo

O comando `doctor` não altera nenhuma configuração ou arquivo de sistema. É uma ferramenta investigativa de diagnóstico para ajudar desenvolvedores a identificarem problemas de ambiente ou acesso à área de transferência.
