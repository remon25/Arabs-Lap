import supabase, { supabaseUrl } from "./supabase";

export async function getCapins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error(error);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin

  let query =  supabase.from("cabins");

  //A) CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //B)EDIT
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }
  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cannot create cabin");
  }

  //2-upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3- delete cabin if there is error in uploading image
  if (storageError) {
    const { data } = await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cannot upload cabin image");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cannot delete cabin");
  }
  return data;
}
