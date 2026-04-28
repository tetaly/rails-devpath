create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.topic_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_key text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, topic_key)
);

create table if not exists public.feature_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature_id text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, feature_id)
);

alter table public.topic_progress enable row level security;
alter table public.feature_progress enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can read own topic progress" on public.topic_progress;
drop policy if exists "Users can insert own topic progress" on public.topic_progress;
drop policy if exists "Users can update own topic progress" on public.topic_progress;
drop policy if exists "Users can delete own topic progress" on public.topic_progress;
drop policy if exists "Users can read own feature progress" on public.feature_progress;
drop policy if exists "Users can insert own feature progress" on public.feature_progress;
drop policy if exists "Users can update own feature progress" on public.feature_progress;
drop policy if exists "Users can delete own feature progress" on public.feature_progress;

create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can read own topic progress"
on public.topic_progress for select
using (auth.uid() = user_id);

create policy "Users can insert own topic progress"
on public.topic_progress for insert
with check (auth.uid() = user_id);

create policy "Users can update own topic progress"
on public.topic_progress for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own topic progress"
on public.topic_progress for delete
using (auth.uid() = user_id);

create policy "Users can read own feature progress"
on public.feature_progress for select
using (auth.uid() = user_id);

create policy "Users can insert own feature progress"
on public.feature_progress for insert
with check (auth.uid() = user_id);

create policy "Users can update own feature progress"
on public.feature_progress for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own feature progress"
on public.feature_progress for delete
using (auth.uid() = user_id);
