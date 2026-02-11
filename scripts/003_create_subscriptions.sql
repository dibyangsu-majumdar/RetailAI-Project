-- Create subscriptions table
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_name text not null,
  plan_price numeric(10,2) not null,
  status text not null default 'active' check (status in ('trial', 'active', 'canceled', 'expired')),
  trial_ends_at timestamptz,
  current_period_start timestamptz default now(),
  current_period_end timestamptz,
  canceled_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.subscriptions enable row level security;

-- RLS Policies
create policy "subscriptions_select_own" on public.subscriptions 
  for select using (auth.uid() = user_id);

create policy "subscriptions_insert_own" on public.subscriptions 
  for insert with check (auth.uid() = user_id);

create policy "subscriptions_update_own" on public.subscriptions 
  for update using (auth.uid() = user_id);

-- Add trigger for updated_at
create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row
  execute function public.handle_updated_at();

-- Function to create free trial subscription
create or replace function public.create_trial_subscription(user_uuid uuid)
returns void
language plpgsql
security definer
as $$
begin
  insert into public.subscriptions (user_id, plan_name, plan_price, status, trial_ends_at, current_period_end)
  values (
    user_uuid,
    'Free Trial',
    0.00,
    'trial',
    now() + interval '14 days',
    now() + interval '14 days'
  );
end;
$$;
