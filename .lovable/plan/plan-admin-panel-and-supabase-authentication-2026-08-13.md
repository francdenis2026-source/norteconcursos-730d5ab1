# Plan: Admin Panel and Supabase Authentication

Implement a management interface for contests and questions and integrate Supabase Auth for progress persistence.

## User Review Required
> [!IMPORTANT]
> The admin panel will be accessible via a new sidebar item. For now, it will be visible to all users until a specific 'admin' role check is implemented in the `user_roles` table.

- **Authentication**: Should the "PIN" be the primary password for the Supabase user, or just a 6-digit code stored in metadata with a standard password hidden from the user? (Assuming standard password for security, PIN for UX).
- **Admin Access**: Should I implement a basic `isAdmin` flag in the `profiles` table now, or wait for the full `user_roles` schema?

## Proposed Changes

### 1. Authentication Integration
- Update `src/routes/auth.tsx` to use `supabase.auth.signInWithPassword` and `signUp`.
- Implement a `useAuth` hook to manage session state globally.
- Update `DashboardLayout.tsx` to show actual user info from the session.

### 2. Hybrid Data & Admin Service
- Extend `src/services/mockService.ts` (renaming or refactoring to `DataService`) to handle CRUD operations for contests and questions.
- Add `createContest`, `updateContest`, `deleteContest`, `createQuestion`, etc.

### 3. Admin Panel UI
- Create `src/routes/dashboard/admin.tsx` as the main management hub.
- Implement sub-tabs: "Gerenciar Concursos" and "Gerenciar Questões".
- Use `shadcn/ui` Dialogs and Forms for creating/editing items.

### 4. Data Persistence
- Ensure `user_responses` are correctly saved to the `user_responses` table in Supabase when a user is logged in.
- Load historical responses on login to populate performance stats.

## Technical Details
- **Schema**: Ensure `contests` and `questions` tables exist in Supabase (migration was created previously).
- **Forms**: Use `react-hook-form` with `zod` for robust data entry in the admin panel.
- **State**: Use TanStack Query for data fetching and mutations in the admin panel to ensure UI stays in sync.
