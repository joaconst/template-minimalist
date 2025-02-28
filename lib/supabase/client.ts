import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uktngdcptiuoywhcjgsi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdG5nZGNwdGl1b3l3aGNqZ3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MDE3NjcsImV4cCI6MjA1NjI3Nzc2N30.-IR8XI0KCLIeEjeW12HaHKWcyfkkXTUxwSfGucTh8G4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)