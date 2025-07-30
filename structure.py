import os
import json

# ===========================================
# Este script gera um arquivo JSON contendo
# a estrutura de diretórios de um projeto.
# Ele ignora arquivos e/ou pastas conforme
# duas listas de controle:
# - IGNORE_ALL: ignora arquivos/pastas por completo
# - IGNORE_FILES_IN: ignora apenas arquivos dentro de pastas específicas,
#                    mas permite que suas subpastas apareçam
# ===========================================

# Lista de nomes a serem completamente ignorados (arquivos ou pastas)
IGNORE_ALL = [
    "structure.py",
    "project_structure.json",
    "venv",
    "__pycache__",
    "README.md",
    "node_modules",
    ".git",
    ".env",
]

# Lista de pastas onde os arquivos devem ser ignorados (mas subpastas são permitidas)
IGNORE_FILES_IN = []


def build_structure(path, root_path):
    """Cria recursivamente a estrutura de diretórios, ignorando conforme regras globais"""
    relative_path = os.path.relpath(path, root_path)
    parts = relative_path.split(os.sep)

    if any(part in IGNORE_ALL for part in parts):
        return None

    name = os.path.basename(path)

    if os.path.isdir(path):
        children = []
        for item in sorted(os.listdir(path)):
            full_path = os.path.join(path, item)
            child_structure = build_structure(full_path, root_path)
            if child_structure:
                children.append(child_structure)
        return {"name": name, "type": "folder", "children": children}
    else:
        if any(part in IGNORE_FILES_IN for part in parts[:-1]):
            return None
        return {"name": name, "type": "file"}


# Define o diretório base como o diretório onde o script está salvo
script_dir = os.path.dirname(os.path.abspath(__file__))
root_path = script_dir
root_name = os.path.basename(root_path)

# Cria a estrutura
structure = build_structure(root_path, root_path)

if structure:
    structure["name"] = root_name

# Caminho completo para o arquivo JSON
output_path = os.path.join(script_dir, "project_structure.json")

# Salva o JSON
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(structure, f, indent=4, ensure_ascii=False)
