# Rails Dev Path

Version React du prototype Rails Dev Path.

## Stack

- Vite + React
- React Router
- CSS par composant
- Supabase Auth email/password + Database
- Fallback localStorage si Supabase n'est pas configuré

## Lancer en local

```bash
npm install
npm run dev
```

## Routes

- `/`
- `/roadmap`
- `/curriculum`
- `/project`
- `/account`

## Configurer Supabase

1. Crée un projet Supabase.
2. Copie `.env.example` vers `.env`.
3. Ajoute `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
   Si Supabase te donne une clé publishable, utilise `VITE_SUPABASE_PUBLISHABLE_KEY` à la place.
4. Exécute le SQL dans `src/lib/schema.sql` depuis Supabase SQL Editor.
5. Dans Supabase Auth, active le provider Email et autorise les connexions email/password.
6. En développement, désactive `Confirm email` pour éviter les emails de confirmation et les limites d'envoi.

Les tables utilisées sont:

- `topic_progress`
- `feature_progress`
- `profiles`

Si `.env` n'est pas configuré, l'app reste utilisable en mode local avec `localStorage`.
