create table chat_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  user_message text not null,
  ai_response text not null,
  mountain text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table chat_history enable row level security;

-- Create policy
create policy "Users can view their own chat history"
  on chat_history
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own chat messages"
  on chat_history
  for insert
  to authenticated
  with check (auth.uid() = user_id); 