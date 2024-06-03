import supabase from "./supabase";

export default async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw new Error("Error whil signing in!");
  }
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    throw new Error("Error While fetching user data!");
  }
  return data;
}
