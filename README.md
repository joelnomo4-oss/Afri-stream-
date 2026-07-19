# afri-stream🎥 — guide de mise en ligne

## Étape 1 — Préparer la base de données (une seule fois)
1. Va dans ton projet Supabase.
2. Menu de gauche → **SQL Editor** → **New query**.
3. Ouvre le fichier `supabase-setup.sql` de ce dossier, copie tout son contenu, colle-le dans l'éditeur.
4. Clique sur **Run**. Ça crée la table `series` avec les 22 séries déjà dedans, visibles par tout le monde, modifiables seulement par un compte connecté.

## Étape 2 — Mettre le code sur GitHub
1. Va sur github.com et crée un compte si tu n'en as pas.
2. Clique sur **New repository**, nomme-le `afri-stream`, laisse-le "Public" ou "Private" comme tu préfères, puis **Create repository**.
3. Sur la page du nouveau dépôt, clique sur **uploading an existing file**.
4. Glisse-dépose TOUS les fichiers et dossiers de ce projet (garde la structure : `src/` doit rester un dossier).
5. Clique sur **Commit changes**.

## Étape 3 — Déployer sur Vercel
1. Va sur vercel.com et connecte-toi avec ton compte GitHub.
2. Clique sur **Add New** → **Project**.
3. Choisis le dépôt `afri-stream` que tu viens de créer.
4. Vercel détecte automatiquement Vite — ne change rien, clique sur **Deploy**.
5. Attends 1-2 minutes. Tu obtiens une adresse du type `afri-stream.vercel.app` — c'est ton appli en ligne, accessible à tout le monde !

## Pour mettre à jour l'appli plus tard
Répète l'étape 2 (uploader les nouveaux fichiers sur GitHub) — Vercel redéploie automatiquement à chaque changement.
