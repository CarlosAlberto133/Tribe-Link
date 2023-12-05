import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ruxjfmcdcgkfdtyedkpm.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eGpmbWNkY2drZmR0eWVka3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3NzI3MDgsImV4cCI6MjAxNzM0ODcwOH0.uxrvFSMrE_KZPFyQ-BIOPHb4mfsm0IA6t1ruiJmUFCo"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase