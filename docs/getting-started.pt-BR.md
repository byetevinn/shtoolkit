# 🚀 Primeiros Passos

Bem-vindo ao **shtoolkit** — uma CLI moderna para explorar a estrutura do projeto e copiar conteúdo de arquivos com eficiência.

[🇺🇸 Read in English](./getting-started.md)

---

## Instalação

### Usando npm (recomendado)

```bash
npm install -g @byetevinn/shtoolkit
```

### Usando npx

```bash
npx @byetevinn/shtoolkit tree
```

---

## Primeiros passos

### 1. Inicializar configuração (opcional)

```bash
shtk init
```

Isso cria um arquivo `.shtk.json` para personalizar o comportamento (regras de ignore, limites da área de transferência inteligente, etc.).

---

### 2. Explorar a estrutura do projeto

```bash
shtk tree --pretty
```

---

### 3. Copiar conteúdo de arquivos

```bash
shtk cpc src
```

---

## Fluxos comuns

### Copiar múltiplos caminhos

```bash
shtk cpc src docs README.md
```

### Usar entrada multilinha

```bash
shtk cpc "src
docs
README.md"
```

### Imprimir no terminal

```bash
shtk cpc src --stdout
```

---

## Dicas

* Use `tree` para visualizar a estrutura
* Use `copy-content` para extrair código ou conteúdo
* Use `init` para personalizar regras de ignore e de saída (output)
* Grandes seleções de cópia geram automaticamente arquivos temporários e os copiam para o clipboard do Windows/WSL para facilidade no anexo em ferramentas de IA.

---

## Documentação

* [Comandos](./commands.pt-BR.md)

---

## Resumo

Com apenas alguns comandos, você consegue:

* Entender a estrutura do projeto
* Extrair conteúdo rapidamente
* Melhorar seu fluxo de desenvolvimento

---

Bom código 🚀
