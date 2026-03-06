from supabase import create_client, Client

SUPABASE_URL = "https://wbqpapgabtvrnagjwses.supabase.co"
SUPABASE_KEY = "sb_publishable_rcYLAEB8o-erC5exuS_pyw_vlkJNuB9"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
