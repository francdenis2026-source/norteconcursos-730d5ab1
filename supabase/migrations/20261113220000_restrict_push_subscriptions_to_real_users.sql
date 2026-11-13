drop policy if exists "Users can read own push subscriptions" on public.push_subscriptions;
create policy "Users can read own push subscriptions"
  on public.push_subscriptions for select to authenticated
  using ((select auth.uid()) = user_id and coalesce((select auth.jwt() ->> 'is_anonymous'), 'false') <> 'true');

drop policy if exists "Users can create own push subscriptions" on public.push_subscriptions;
create policy "Users can create own push subscriptions"
  on public.push_subscriptions for insert to authenticated
  with check ((select auth.uid()) = user_id and coalesce((select auth.jwt() ->> 'is_anonymous'), 'false') <> 'true');

drop policy if exists "Users can update own push subscriptions" on public.push_subscriptions;
create policy "Users can update own push subscriptions"
  on public.push_subscriptions for update to authenticated
  using ((select auth.uid()) = user_id and coalesce((select auth.jwt() ->> 'is_anonymous'), 'false') <> 'true')
  with check ((select auth.uid()) = user_id and coalesce((select auth.jwt() ->> 'is_anonymous'), 'false') <> 'true');

drop policy if exists "Users can delete own push subscriptions" on public.push_subscriptions;
create policy "Users can delete own push subscriptions"
  on public.push_subscriptions for delete to authenticated
  using ((select auth.uid()) = user_id and coalesce((select auth.jwt() ->> 'is_anonymous'), 'false') <> 'true');
