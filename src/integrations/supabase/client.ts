import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rarwpddnjjgmxspaoplf.supabase.co';
const supabaseAnonKey = 'sb_publishable_M2qfYWRFurL9-ZkV7zmQ3Q_nmvbb5ku';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
