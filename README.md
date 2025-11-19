# Estrutura de Diretórios - Gerador JSON

Este projeto tem como objetivo **gerar automaticamente um arquivo JSON** contendo a estrutura de diretórios de um projeto, de forma organizada, personalizável e fácil de integrar em outros fluxos. Ideal para documentações, análises de arquitetura ou visualização de estrutura de código.

---

## 📁 O que o script faz?

O script `structure.py` percorre recursivamente os diretórios a partir do local onde ele está salvo e gera um arquivo `project_structure.json` contendo:

* Hierarquia completa de pastas e arquivos
* Nomes e tipos (`folder` ou `file`)
* Estrutura organizada e padronizada
* Pastas e arquivos ignorados conforme regras configuráveis
* Ordenação alfabética automática

Ele é **simples**, **rápido** e **não depende de nenhuma biblioteca externa**.

---

## ⚙️ Regras de Ignoração

Existem duas categorias principais de regras para controlar o que será exibido no JSON final.

### **1. IGNORE_ALL**

Ignora completamente **arquivos ou pastas**, independentemente do nível em que aparecem.

Exemplos típicos:

* `venv`
* `.git`
* `node_modules`
* `README.md`
* `.env`

Se qualquer parte do caminho corresponder ao nome, o item inteiro é ignorado.

---

### **2. IGNORE_FILES_IN**

Ignora **apenas arquivos** dentro de pastas específicas (por caminho relativo), mas continua mostrando:

* A pasta
* Suas subpastas
* Arquivos dentro das subpastas

Exemplos:

```python
IGNORE_FILES_IN = [
    "logs",                # Ignora apenas arquivos em ./logs
    "src/temp/uploads"     # Ignora apenas arquivos em src/temp/uploads
]
```

### ✔ Exemplos de comportamento

| Caminho                      | Regra aplicada           | Será listado? |
| ---------------------------- | ------------------------ | ------------- |
| `logs/error.txt`             | IGNORE_FILES_IN=["logs"] | ❌ Não         |
| `logs/api/info.json`         | Subpasta de logs         | ✔ Sim         |
| `src/services/logs/test.txt` | Pasta diferente          | ✔ Sim         |
| `node_modules/react`         | IGNORE_ALL               | ❌ Não         |

---

## 📄 Exemplo de saída JSON

Um arquivo `project_structure.json` será gerado como este:

```json
{
    "name": "meu_projeto",
    "type": "folder",
    "children": [
        {
            "name": "src",
            "type": "folder",
            "children": [
                {
                    "name": "main.py",
                    "type": "file"
                },
                {
                    "name": "services",
                    "type": "folder",
                    "children": []
                }
            ]
        }
    ]
}
```

---

## 🚀 Como usar

### 1. Clone ou copie o repositório

```bash
git clone https://github.com/byetevinn/save-project-structure
```

### 2. Execute o script

```bash
python3 structure.py
```

### 3. O arquivo será gerado

```
project_structure.json
```

---

## 📦 Arquivos do Projeto

| Arquivo        | Função                            |
| -------------- | --------------------------------- |
| `structure.py` | Script principal que gera o JSON  |
| `.gitignore`   | Configurações de ignorar para Git |
| `README.md`    | Este documento                    |

---

## 🧠 Requisitos

* Python **3.6+**
* Não requer bibliotecas adicionais

---

## 🔮 Roadmap (Futuras Melhorias)

* **CLI Tool:** permitir uso via linha de comando (`project-structure --ignore logs`).
* Suporte a múltiplos diretórios de entrada.
* Exportação em outros formatos: **YAML**, **Markdown**, **Tree view**.
* Padrões glob (`**/*.log`) e regex.
* Opção para ignorar subpastas recursivamente.

---

## 👤 Autor

Desenvolvido por **Stevan Padilha**.

Sinta-se à vontade para contribuir, sugerir melhorias ou abrir issues.

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Você pode usar e modificar livremente.
