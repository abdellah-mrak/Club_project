# ENSIASD — Plateforme Étudiante

Plateforme de vie étudiante pour l'ENSIASD — clubs, publications, reels, messagerie.

**🌐 Demo live :** `https://VOTRE-USERNAME.github.io/ensiasd-platform/`

---

## 🚀 Déploiement sur GitHub Pages

### 1. Créer le repo GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/ensiasd-platform.git
git push -u origin main
```

### 2. Configurer GitHub Pages
Le fichier `frontend/vite.config.js` détecte automatiquement le nom du repo pendant le build GitHub Actions, donc aucune modification manuelle de `base` n'est nécessaire.

### 3. Activer GitHub Pages
- Aller dans **Settings → Pages**
- Source : **GitHub Actions**
- Le déploiement se lance automatiquement à chaque `git push`

---

## 💻 Développement local

```bash
cd frontend
npm install
npm run dev
```

Ouvrir http://localhost:5173

---

## 🔐 Comptes démo

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| Étudiant | ahmed@ensiasd.dz | 1234 |
| Admin Info | karim@ensiasd.dz | 1234 |
| Admin Sport | amine@ensiasd.dz | 1234 |

---

## 📁 Structure

```
Club_project/
├── .github/workflows/deploy.yml    ← GitHub Actions (déploiement auto)
└── ensiasd-clean/frontend/
    ├── public/404.html            ← Fix routing SPA pour GitHub Pages
    ├── src/
    │   ├── pages/                 ← Toutes les pages
    │   ├── components/layout/     ← Layout, Topbar, Sidebar
    │   └── context/AppContext.jsx ← Données mock (sans backend)
    └── vite.config.js             ← base GitHub Pages détectée automatiquement
```
