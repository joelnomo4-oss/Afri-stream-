import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://exufqbvkkqluwetaggop.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_7stYjgk_3aIsOHXX6mdYvA_CTLee6uX";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
