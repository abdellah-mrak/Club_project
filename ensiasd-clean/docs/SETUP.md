# 📖 Guide d'installation — ENSIASD Clubs Platform

## Prérequis

| Outil | Version min |
|-------|-------------|
| Node.js | 18 LTS |
| npm | 9+ |
| Supabase CLI | 1.130+ |
| Git | 2.40+ |

---

## 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com) → **New project**
2. Choisir **Region : EU West (Paris)** pour la latence
3. Définir un mot de passe fort pour la base de données
4. Attendre la création (~2 min)

### Récupérer les clés API

Dashboard → **Settings → API** :
- `Project URL` → `VITE_SUPABASE_URL`
- `anon / public key` → `VITE_SUPABASE_ANON_KEY`

---

## 2. Appliquer les migrations

### Via le Dashboard Supabase (SQL Editor)

Copier-coller et exécuter les fichiers dans l'ordre :

```
1. backend/supabase/migrations/001_schema.sql
2. backend/supabase/migrations/002_rls.sql
3. backend/supabase/migrations/003_storage.sql
4. backend/supabase/migrations/004_realtime.sql
```

### Via Supabase CLI (recommandé)

```bash
# Installer la CLI
npm install -g supabase

# Login
supabase login

# Lier le projet
supabase link --project-ref VOTRE_PROJECT_REF

# Pousser les migrations
supabase db push
```

---

## 3. Configurer l'authentification

Dashboard → **Authentication → Settings** :

### Email
- ✅ Enable email confirmations
- Sender name : `ENSIASD Clubs`
- Sender email : `noreply@clubs.ensiasd.ac.ma`

### URL de redirection
- Site URL : `https://clubs.ensiasd.ac.ma`
- Redirect URLs : `https://clubs.ensiasd.ac.ma/**`

### Templates email (optionnel)
Personnaliser les emails de confirmation dans **Auth → Email Templates**.

---

## 4. Configurer le Storage

Les buckets sont créés automatiquement par `003_storage.sql`.

Pour vérifier : Dashboard → **Storage** → vous devez voir :
- `avatars`
- `club-media`
- `posts-images`
- `videos`
- `video-thumbnails`
- `stories`
- `messages-media`

---

## 5. Activer le Realtime

Dashboard → **Database → Replication** :

Activer sur les tables :
- ✅ `direct_messages`
- ✅ `channel_messages`
- ✅ `notifications`
- ✅ `stories`

---

## 6. Créer le premier admin (Super Admin)

Dans le Dashboard → **SQL Editor** :

```sql
-- 1. Créer un utilisateur via Auth (ou via l'interface d'inscription)
-- 2. Récupérer l'ID de l'utilisateur dans auth.users
-- 3. Lui attribuer le rôle super_admin

UPDATE profiles
SET role = 'super_admin'
WHERE id = 'UUID_DE_L_UTILISATEUR';

-- Assigner à un club (ex: coding)
UPDATE profiles
SET club_id = (SELECT id FROM clubs WHERE slug = 'coding'),
    role = 'club_admin'
WHERE id = 'UUID_DE_L_UTILISATEUR';
```

---

## 7. Installer et lancer le frontend

```bash
# Se placer dans le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Éditer .env.local avec vos vraies clés Supabase
nano .env.local
```

Contenu de `.env.local` :
```env
VITE_SUPABASE_URL=https://VOTRE_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...votre_anon_key
VITE_APP_NAME=ENSIASD Clubs Platform
VITE_APP_URL=http://localhost:3000
```

```bash
# Lancer en développement
npm run dev

# → Ouverture sur http://localhost:3000
```

---

## 8. Build & déploiement Vercel

```bash
# Build de production
npm run build

# Tester le build local
npm run preview
```

### Déployer sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
cd frontend
vercel --prod
```

**Variables d'environnement Vercel** (Dashboard → Settings → Environment Variables) :
```
VITE_SUPABASE_URL     = https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJ...
VITE_APP_NAME          = ENSIASD Clubs Platform
VITE_APP_URL           = https://clubs.ensiasd.ac.ma
```

`vercel.json` à la racine du dossier `frontend/` :
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Structure finale déployée

```
Vercel (Frontend)
    ↕ HTTPS / REST / WebSocket
Supabase Cloud
    ├── PostgreSQL (base de données)
    ├── Auth (JWT + sessions)
    ├── Storage (fichiers médias)
    └── Realtime (WebSocket messages)
```

---

## Dépannage courant

| Erreur | Solution |
|--------|----------|
| `Missing env variables` | Vérifier `.env.local` et redémarrer Vite |
| `RLS policy violation` | Vérifier que l'utilisateur a le bon rôle dans `profiles` |
| `Storage 403` | Vérifier les politiques dans `003_storage.sql` |
| `Realtime not working` | Activer `REPLICA IDENTITY FULL` sur les tables |
| `Auth email not sent` | Vérifier SMTP dans Supabase → Auth → Settings |
