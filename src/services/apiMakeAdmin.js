import supabase, { supabaseAdmin } from "./supabase";

async function makeAdmin() {
  let { data: user_roles, error } = await supabase
    .from("user_roles")
    .select("*");
  console.log(user_roles);
  return user_roles;
}

makeAdmin();
