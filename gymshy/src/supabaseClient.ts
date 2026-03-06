import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wbqpapgabtvrnagjwses.supabase.co'
const supabaseKey = 'sb_publishable_rcYLAEB8o-erC5exuS_pyw_vlkJNuB9'

export const supabase = createClient(supabaseUrl, supabaseKey)
