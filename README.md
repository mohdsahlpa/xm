# XM - Terminal & CLI C Program Distributor (Pure Plain Text)

Strictly **zero HTML**. Designed 100% for command-line access via **`curl`** and **`wget`**, returning pure plain text on every single request.

---

## ⚡ Quick Start for Terminal Users

### 1. View Root Syntax & Available Programs
```bash
curl -sL https://mohdsahlpa.github.io/xm
```
*(or with wget)*:
```bash
wget -qO- https://mohdsahlpa.github.io/xm
```

Output:
```text
===============================================================================
 XM - C Programming Laboratory Source Code Distributor (CLI / Terminal)
===============================================================================

USAGE:
  curl -sL https://mohdsahlpa.github.io/xm/<id>
  curl -sL https://mohdsahlpa.github.io/xm/<id>.c
  wget -qO- https://mohdsahlpa.github.io/xm/<id>
...
```

---

### 2. Retrieve C Program Source Code

```bash
# Retrieve Program 1 (Hello World & Arithmetic)
curl -sL https://mohdsahlpa.github.io/xm/1

# Retrieve Program 2 (Bubble Sort) and save to file
curl -sL https://mohdsahlpa.github.io/xm/2.c -o bubble_sort.c

# Retrieve Program 3 (Linked List)
curl -sL https://mohdsahlpa.github.io/xm/3
```

---

### 3. Direct Compile & Run On-the-Fly (No local file needed)

You can stream any C program directly into `gcc` via pipe:

```bash
curl -sL https://mohdsahlpa.github.io/xm/1 | gcc -x c - -o prog && ./prog
```

---

### 4. Recommended Terminal Alias (`xm`)

Add this single line to your `~/.bashrc` or `~/.zshrc`:

```bash
xm() { curl -sL "https://mohdsahlpa.github.io/xm/${1:-}"; }
```

Reload terminal (`source ~/.bashrc`), then use:
- `xm` &rarr; Shows syntax and all available programs.
- `xm 1` &rarr; Prints C program 1.
- `xm 2 > sort.c` &rarr; Saves program 2 into `sort.c`.
- `xm 1 | gcc -x c - && ./a.out` &rarr; Compiles and runs in 1 step!

---

## 🔍 Static GitHub Pages vs Query Parameters (`?id=...`)

1. **How GitHub Pages Static CDN Works**:
   - GitHub Pages is a static file host (no server-side Node/PHP/Python execution).
   - CLI tools like `curl` and `wget` do **not** run browser JavaScript engines.
   - When `curl` requests a query string like `?id=1` on a static CDN, the CDN ignores the query string and serves the root file (`index.html`).
   - Therefore, on GitHub Pages, the direct clean endpoints (`/1`, `/1.c`, `/2`, `/2.c`) give you instant, reliable plain-text responses without any server overhead.

2. **Full Query Parameter Support (`?id=1`)**:
   - If you run the included zero-dependency server (`npm start` or `python server.py`), it automatically supports both:
     - `curl "http://localhost:3000/?id=1"`
     - `curl "http://localhost:3000/1"`
     - `curl "http://localhost:3000/1.c"`

---

## 📁 Repository Structure

```text
xm/
├── index.html            # Root plain-text syntax guide (0 HTML tags)
├── 404.html              # Plain-text error response
├── .nojekyll             # Ensures GitHub Pages serves all raw & extensionless files
├── 1                     # Extensionless text endpoint for Program 1
├── 1.c                   # C source file for Program 1
├── 2                     # Extensionless text endpoint for Program 2
├── 2.c                   # C source file for Program 2
├── 3                     # Extensionless text endpoint for Program 3
├── 3.c                   # C source file for Program 3
├── server.js             # Zero-dependency local Node server (supports ?id=1 and /1)
├── server.py             # Zero-dependency local Python server
├── package.json          # CLI dev scripts (npm start)
├── programs/             # Program directory archive
│   ├── 1.c
│   ├── 2.c
│   ├── 3.c
│   └── manifest.json
└── .github/
    └── workflows/
        └── deploy.yml    # GitHub Pages deployment workflow
```

---

## ➕ Adding New C Programs

1. Add your program to the repository as `<id>` and `<id>.c`:
   ```bash
   cp my_code.c 4.c
   cp my_code.c 4
   ```
2. (Optional) Add `4` to `programs/` as well.
3. Commit and push:
   ```bash
   git add .
   git commit -m "Add program 4"
   git push
   ```
4. It is immediately available:
   ```bash
   curl -sL https://mohdsahlpa.github.io/xm/4
   ```

---

## 🚀 Deploying to GitHub Pages

1. Push to your repository:
   ```bash
   git add .
   git commit -m "Deploy pure plain text CLI application"
   git push origin main
   ```
2. On GitHub: **Settings** &rarr; **Pages** &rarr; Source: `Deploy from a branch` &rarr; Branch: `main` / `root`.
