import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ruxjfmcdcgkfdtyedkpm.supabase.co"
const supabaseKey = process.env.VUE_APP_API_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase