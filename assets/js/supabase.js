import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://lfgxpcrwtpzmaswdwvpi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZ3hwY3J3dHB6bWFzd2R3dnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzNzc3MTcsImV4cCI6MjAzNzk1MzcxN30.lF1lVs4yvs_rsxXpo-mN91AWSzNPYWdQUeihM_B8pFk";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadData() {
  const { data, error } = await supabase.from("mensagens").select();
  if (!error) {
    console.log(data);
  } else {
    console.error(error);
  }
}
loadData();
