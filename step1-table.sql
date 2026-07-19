create table if not exists series (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  country text not null,
  year int,
  synopsis text,
  video_url text,
  added_at bigint default (extract(epoch from now()) * 1000)::bigint
);

alter table series enable row level security;

create policy public_read on series for select using (true);

create policy insert_authenticated on series for insert to authenticated with check (true);

create policy delete_authenticated on series for delete to authenticated using (true);
