# Plan: Admin Access & Subscription Activation Flow

Implement administrative controls, user creation, and a secure subscription activation system with e-mail confirmation.

## User Improvements

### 1. Administrative Controls
- **Admin Login**: Enable login for `francdenisbr@gmail.com`.
- **User Creation**: Implement a management interface for the admin to create users (e.g., `Franc D'nis`, ID `69598193268`).
- **Role Management**: Define and enforce 'admin' vs 'user' roles.

### 2. Subscription & Activation Flow
- **Email Activation**: After payment, users receive a code via email.
- **Activation Interface**: A new field in the user profile to enter and validate the activation code.
- **Trial Period**: Simplified "one-click" activation for test periods without requiring email codes.
- **Feature Gating**: Ensure premium features are strictly locked until activation is confirmed.

## Technical Details

### 1. Database Schema (Supabase)
- **Profiles Table**: Add `is_activated` (boolean), `activation_code` (text), and `subscription_tier` (enum).
- **User Roles Table**: Create a `user_roles` table to store 'admin' or 'user' status.
- **Security Definer**: Add a `has_role` PostgreSQL function for recursive-safe RLS checks.

### 2. Authentication & Authorization
- **Role-Based Access Control (RBAC)**: Update RLS policies on `contests`, `questions`, and `notebooks` to allow admins full CRUD while users only have READ access (based on tier).
- **Admin Middleware**: Protect the `/dashboard/admin` route using a role check.

### 3. Implementation Steps
- **Auth Hook**: Update `useAuth` to fetch and cache user roles and activation status.
- **Activation UI**: Add an "Ativar Assinatura" modal/section in `/dashboard/profile`.
- **Admin UI**: Add a "Usuários" tab in `/dashboard/admin` for user management.
- **Mock Service**: Extend `MockService` to handle activation logic and backend validation.
