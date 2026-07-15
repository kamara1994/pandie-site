-- Messages inbox: chat leads, newsletter signups, contact form, giving
-- inquiries, and encouragement notes all land here when no n8n webhook is
-- configured. Read them in Supabase -> Table Editor -> messages.
-- Run this once in Supabase -> SQL Editor.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null,          -- e.g. 'chat_message', 'contact_message', 'inquiry_items'
  name text,
  email text,
  message text,
  payload jsonb not null default '{}'::jsonb,
  handled boolean not null default false  -- tick when you've replied
);

alter table public.messages enable row level security;
-- No policies: only the service-role key (server-side) can read/write.
