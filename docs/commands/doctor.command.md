# 🩺 doctor Command

## Overview

The `doctor` command diagnoses your local environment setup. It runs tests on your system components, checks for compatibility, and prints out status for debugging purposes.

[🇧🇷 Leia em Português](./doctor.command.pt-BR.md)

---

## Usage

```bash
shtk doctor
```

---

## What it does

Runs diagnostic checks on:
* **shtoolkit version**: Displays the currently running CLI version.
* **node version**: Displays the active Node.js version.
* **platform**: Displays your operating system (e.g. `win32`, `linux`).
* **wsl**: Detects if execution is running inside WSL (Windows Subsystem for Linux).
* **powershell.exe**: Checks if PowerShell is available in path (crucial for WSL file clipboard).
* **wslpath**: Checks if the path translation utility is available.
* **text clipboard**: Verifies availability of text-copying utilities (e.g. `pbcopy`, `xclip`, `wl-copy`, `clip.exe`).
* **file clipboard**: Verifies if the platform supports copying real file objects to clipboard (supported on Windows and WSL).
* **current binary / package path**: Displays locations for CLI installation files.

---

## Example Output

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

## Summary

The `doctor` command does not modify any system settings or files. It is an investigatory tool designed to help developers identify setup or clipboard issues quickly.
