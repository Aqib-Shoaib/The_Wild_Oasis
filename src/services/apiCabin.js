import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("There was error in loading cabin data");
  }
  return data;
}

export async function deleteCabin(id) {
  // console.log(id);
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error(`There was error in deleting cabin row with ${id}`);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  //https://zbqmuwrqbsgqviqcrnxu.supabase.co/storage/v1/object/public/cabin/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin/${imageName}`;
  let query = supabase.from("Cabins");
  //creating a new cabin row
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //eidting a a cabin if there is any id
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("There was error in creating a new Row in database");
  }
  //uploading image to supabase storage
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin")
    .upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from("Cabins").delete().eq("id", data[0].id);
    console.log(storageError);
    throw new Error("There was error in uploading image in database");
  }
  return data;
}
