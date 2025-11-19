import os
import json

# ===========================================
# Script para gerar um JSON da estrutura de diretórios do projeto
# Com regras avançadas de ignorar:
# - IGNORE_ALL       → Ignora arquivos OU pastas pelo caminho exato ou nome
# - IGNORE_FILES_IN  → Ignora apenas arquivos dentro de uma pasta (por caminho)
# ===========================================

# Ignora arquivos/pastas completamente (nome OU caminho relativo)
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

# Ignora arquivos dentro das pastas especificadas (por caminho relativo)
# Exemplo:
# IGNORE_FILES_IN = ["logs"] → ignora arquivos somente em ./logs
# IGNORE_FILES_IN = ["src/services/cache"] → ignora arquivos só nessa pasta
IGNORE_FILES_IN = []


def normalize(path: str) -> str:
    """Normaliza caminhos para evitar problemas com barras e diferenças de SO."""
    return path.replace("\\", "/").strip("/")


def should_ignore_all(relative_path: str, parts: list[str]) -> bool:
    """Verifica se o caminho deve ser ignorado completamente."""
    # Ignora pelo nome da pasta/arquivo em qualquer lugar
    if any(part in IGNORE_ALL for part in parts):
        return True

    # Ignora pelo caminho relativo exatamente igual
    if normalize(relative_path) in [normalize(p) for p in IGNORE_ALL]:
        return True

    return False


def should_ignore_file(relative_path: str) -> bool:
    """Verifica se um arquivo deve ser ignorado com base em IGNORE_FILES_IN."""
    rel = normalize(relative_path)

    for folder in IGNORE_FILES_IN:
        folder_norm = normalize(folder)

        # Se o arquivo estiver dentro da pasta especificada
        if rel.startswith(folder_norm + "/"):
            # E o caminho relativo tem mais partes → é arquivo dentro dessa pasta
            return True

    return False


def build_structure(path, root_path):
    """Cria recursivamente a estrutura do projeto."""
    relative_path = os.path.relpath(path, root_path)
    relative_path_norm = normalize(relative_path)
    parts = relative_path_norm.split("/")

    # Regras de ignorar total
    if should_ignore_all(relative_path_norm, parts):
        return None

    name = os.path.basename(path)

    # Pasta
    if os.path.isdir(path):
        children = []
        for item in sorted(os.listdir(path)):
            full_path = os.path.join(path, item)
            child = build_structure(full_path, root_path)
            if child:
                children.append(child)
        return {"name": name, "type": "folder", "children": children}

    # Arquivo
    else:
        if should_ignore_file(relative_path_norm):
            return None

        return {"name": name, "type": "file"}


# =======================================================
# Execução
# =======================================================

script_dir = os.path.dirname(os.path.abspath(__file__))
root_path = script_dir
root_name = os.path.basename(root_path)

structure = build_structure(root_path, root_path)

if structure:
    structure["name"] = root_name

output_path = os.path.join(script_dir, "project_structure.json")

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(structure, f, indent=4, ensure_ascii=False)
