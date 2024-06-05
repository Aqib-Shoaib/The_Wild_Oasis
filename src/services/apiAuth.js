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

  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    throw new Error("Error While fetching user data!");
  }
  return user.user;
}
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Error in Signing Out!");
}
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error("error in adding a new user!");
  return data;
}
