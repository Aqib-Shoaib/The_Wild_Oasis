import supabase, { supabaseUrl } from "./supabase";

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
export async function updateUser({ fullName, password, avatar }) {
  //updating user data based on different data recieved
  let updateData = {};
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error("Error in Updating user data!");
  if (!avatar) return data;
  //uploading avatar image if there is any
  const fileName = `avatar-${fullName}-${Math.random()}`;

  const { error: imageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);

  if (imageError) throw new Error("Error in updating the avatar image");

  //uploading avatar to the supabase if there is any avatar updated
  const { data: avatarData, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
      },
    });
  if (avatarError) throw new Error("Error in uploading image to storage");

  return avatarData;
}
