import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://rarwpddnjjgmxspaoplf.supabase.co';
const supabaseAnonKey = 'sb_publishable_M2qfYWRFurL9-ZkV7zmQ3Q_nmvbb5ku';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
