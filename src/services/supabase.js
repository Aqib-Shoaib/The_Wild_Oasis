import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zbqmuwrqbsgqviqcrnxu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicW11d3JxYnNncXZpcWNybnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5MjEzMjIsImV4cCI6MjAzMDQ5NzMyMn0.W41w836MU21AnuYqMtyAchqMpur5aeLhs9BS4dwlC_s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
