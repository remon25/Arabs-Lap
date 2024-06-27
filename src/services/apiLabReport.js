import supabase, { supabaseAdmin } from "./supabase";
import { getToday } from "../utils/helpers";

export async function getUserId() {
  const { data: user } = await supabase.auth.getUser();
  return user.user.id;
}

export async function getLabReport() {
  try {
    const { data, error } = await supabase.from("lab_report").select("*");

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      throw new Error("No lab reports found.");
    }

    const finalData = await Promise.all(
      data.map(async (item) => {
        const userId = item.sample_writer;
        const { data: user, error: userError } =
          await supabaseAdmin.auth.admin.getUserById(userId);
        if (userError) {
          throw new Error(userError.message);
        }
        return { ...item, sample_writer: user?.user.user_metadata?.fullName };
      })
    );

    console.log(finalData);
    return finalData;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getLabSingleReport(id) {
  try {
    const { data, error } = await supabase
      .from("lab_report")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      throw new Error("No lab report found.");
    }

    const finalData = await Promise.all(
      [data].map(async (item) => {
        const userId = item.sample_writer;
        const { data: user, error: userError } =
          await supabaseAdmin.auth.admin.getUserById(userId);
        if (userError) {
          throw new Error(userError.message);
        }
        return { ...item, sample_writer: user?.user.user_metadata?.fullName };
      })
    );
    console.log(finalData[0],"finalData");
    return finalData[0];
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createEditLabReport(newLabReport, id) {
  // 1. Create/edit cabin

  let query = supabase.from("lab_report");

  //A) CREATE
  if (!id) {
    query = query.insert([{ ...newLabReport }]);
  }

  // //B)EDIT
  // if (id) {
  //   query = query
  //     .update({ ...newLabReport })
  //     .eq("id", id)
  //     .select();
  // }
  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("فشل في حفظ التقرير");
  }

  console.log("postdata", data);
  return data;
}

export async function deleteLabReport(id) {
  const { data, error } = await supabase
    .from("lab_report")
    .delete()
    .eq("id", id);
  if (error) {
    throw new Error("فشل في حذف التقرير");
  }
  return data;
}

export async function editLabreportApi(editedData, id) {
  const { data } = await supabase
    .from("lab_report")
    .update({ ...editedData })
    .eq("id", id)
    .select();
  console.log(editedData, id);
  return data;
}


export async function getLapReportsToday() {
  const today = getToday();
  const utcToday = new Date(today).toISOString();

  const { data, error } = await supabase
    .from("lab_report")
    .select('id,sample_writer')
    .gte('created_at', `${utcToday}T00:00:00Z`) 
    .lte('created_at', `${utcToday}T23:59:59Z`) 
    .order("created_at");

  if (error) {
    throw new Error("Reports could not get loaded");
  }
  const finalData = await Promise.all(
    data.map(async (item) => {
      const userId = item.sample_writer;
      const { data: user, error: userError } =
        await supabaseAdmin.auth.admin.getUserById(userId);
      if (userError) {
        throw new Error(userError.message);
      }
      return { ...item, sample_writer: user?.user.user_metadata?.fullName };
    })
  );

  return finalData;
}
