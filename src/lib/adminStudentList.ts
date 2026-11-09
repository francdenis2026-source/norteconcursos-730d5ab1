export interface AdminStudentProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  subscription_tier: string | null;
  created_at: string | null;
}

/** Anonymous sessions power the public challenge and are not student accounts. */
export function visibleAdminStudentProfiles<T extends AdminStudentProfile>(profiles: T[]): T[] {
  return profiles.filter((profile) => Boolean(profile.email?.trim()));
}
