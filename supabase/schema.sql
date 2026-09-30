create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null check (char_length(display_name) between 1 and 60)
);
alter table public.profiles enable row level security;
grant select, insert, update on public.profiles to authenticated;
revoke all on public.profiles from anon;
create policy profiles_read on public.profiles for select to authenticated using (true);
create policy profiles_insert on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy profiles_update on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create table public.messages (
 id uuid primary key default gen_random_uuid(),
 sender_id uuid not null references public.profiles(id) on delete cascade,
 recipient_id uuid not null references public.profiles(id) on delete cascade,
 body text not null check (char_length(trim(body)) between 1 and 4000),
 created_at timestamptz not null default now(),
 check (sender_id <> recipient_id)
);
alter table public.messages enable row level security;
grant select on public.messages to authenticated;
grant insert (sender_id, recipient_id, body) on public.messages to authenticated;
revoke all on public.messages from anon;
create policy messages_read on public.messages for select to authenticated
 using ((select auth.uid()) in (sender_id, recipient_id));
create policy messages_send on public.messages for insert to authenticated
 with check ((select auth.uid()) = sender_id);
create index messages_sender_created on public.messages(sender_id, created_at desc);
create index messages_recipient_created on public.messages(recipient_id, created_at desc);
alter publication supabase_realtime add table public.messages;
