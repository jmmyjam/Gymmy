import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://wbqpapgabtvrnagjwses.supabase.co"
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "sb_publishable_rcYLAEB8o-erC5exuS_pyw_vlkJNuB9"

export const supabase = createClient(supabaseUrl, supabaseKey)
