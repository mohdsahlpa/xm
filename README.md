# XM - Serverless C Program Repository

A lightweight, zero-backend web application designed for **GitHub Pages** (`https://mohdsahlpa.github.io/xm`).

When hosted on GitHub Pages:
- Visiting **`mohdsahlpa.github.io/xm?id=1`** loads and displays the plain text C code for Program 1 (`programs/1.c`).
- Visiting **`mohdsahlpa.github.io/xm?id=1&raw=1`** renders pure text with zero UI wrappers (ideal for curl, scripts, or raw reading).
- Visiting **`mohdsahlpa.github.io/xm`** presents an interactive directory with live search, copy-to-clipboard, download buttons, and quick test inputs.
- Direct static file URLs like **`mohdsahlpa.github.io/xm/programs/1.c`** work natively with `curl` or `wget`.

---

## 📁 Repository Structure

```text
xm/
├── index.html            # Core application (SPA router, plain text viewer, directory)
├── 404.html              # GitHub Pages fallback redirect handler
├── package.json          # Local development scripts
├── .gitignore            # Git ignore file
├── programs/             # C program files directory
│   ├── 1.c               # Program 1 (Hello World & Arithmetic)
│   ├── 2.c               # Program 2 (Bubble Sort Algorithm)
│   ├── 3.c               # Program 3 (Singly Linked List)
│   └── manifest.json     # Metadata catalog for dashboard index
└── .github/
    └── workflows/
        └── deploy.yml    # Optional GitHub Actions deployment workflow
```

---

## ⚡ How It Works (Without a Backend Server)

1. **Client-side Query Routing**:
   GitHub Pages serves `index.html` as a static file. When someone accesses `mohdsahlpa.github.io/xm?id=1`, JavaScript extracts `id=1` from `window.location.search`.
2. **File Fetching**:
   The application fetches `./programs/1.c` using standard browser `fetch()`. The path resolver automatically accounts for GitHub Pages repository subdirectory paths (`/xm/`).
3. **Instant Display & Plain Text Mode**:
   The C code is displayed in a monospace, high-contrast viewer with a 1-click **Copy Code** button. For automated tools or pure text view, `?id=1&raw=1` renders purely the raw text in the DOM.

---

## ➕ Adding New C Programs

Adding a new C program takes 2 seconds:

1. Create a new file in `programs/` named `<id>.c` (e.g. `programs/4.c` or `programs/binary_search.c`).
2. Write your C code in that file.
3. Commit and push to GitHub:
   ```bash
   git add programs/4.c
   git commit -m "Add program 4"
   git push
   ```
4. It is **immediately accessible** at:
   - `https://mohdsahlpa.github.io/xm?id=4`
   - `https://mohdsahlpa.github.io/xm/programs/4.c`

*(Optional)* You can also add an entry to `programs/manifest.json` if you want it to appear with a custom title and category on the main directory page.

---

## 🚀 Deploying to GitHub Pages

Follow these simple steps to deploy:

### Step 1: Initialize Git and Push to GitHub

In your terminal (inside the `xm` folder):

```bash
git init
git add .
git commit -m "Initial commit of XM application"
git branch -M main
git remote add origin https://github.com/mohdsahlpa/xm.git
git push -u origin main
```

*(Ensure the repository on GitHub is named `xm` and set to Public).*

### Step 2: Enable GitHub Pages

1. Open your repository on GitHub: `https://github.com/mohdsahlpa/xm`
2. Go to **Settings** → **Pages** (under the "Code and automation" sidebar section).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` / `/ (root)`
   - Click **Save**.
4. GitHub Pages will publish the site in 1-2 minutes at:
   **`https://mohdsahlpa.github.io/xm`**

---

## 🧪 Testing Locally

To test locally on your computer:

### Option A: Using Node.js
```bash
npm start
```
or:
```bash
npx serve . -p 3000
```
Then open:
- `http://localhost:3000/?id=1`
- `http://localhost:3000/?id=2`
- `http://localhost:3000/`

### Option B: Using Python
```bash
python -m http.server 3000
```
Then open `http://localhost:3000/?id=1` in your browser.
