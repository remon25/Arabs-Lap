import supabase, { supabaseAdmin } from "./supabase";



export async function getUserId() {
  const { data:  user  } = await supabase.auth.getUser();
  return user.user.id;
}

export async function getOperationReport() {
  try {
    const { data, error } = await supabase.from("operation_report").select("*");

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      throw new Error("لايوجد تقارير تشغيل");
    }

    const finalData = await Promise.all(
      data.map(async (item) => {
        const userId = item.writer;
        const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserById(
          userId
        );
        if (userError) {
          throw new Error(userError.message);
        }
        return { ...item, writer: user?.user.user_metadata?.fullName };
      })
    );

    console.log("Operation Report",finalData);
    return finalData;
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function getOperationSingleReport(id) {
  try {
    const { data, error } = await supabase
      .from("operation_report")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      throw new Error("No operation report found.");
    }

    const finalData = await Promise.all(
      [data].map(async (item) => {
        const userId = item.writer;
        const { data: user, error: userError } =
          await supabaseAdmin.auth.admin.getUserById(userId);
        if (userError) {
          throw new Error(userError.message);
        }
        return { ...item, writer: user?.user.user_metadata?.fullName };
      })
    );
    console.log(finalData[0],"finalData");
    return finalData[0];
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createEditOperationReport(newOperationReport, id) {
  // 1. Create/edit cabin

  let query = supabase.from("operation_report");

  //A) CREATE
  if (!id) {
    query = query.insert([{ ...newOperationReport }]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("فشل في حفظ التقرير");
  }

  console.log("postdata",data);
  return data;
}

export async function deleteOperationReport(id) {
  const { data, error } = await supabase
    .from("operation_report")
    .delete()
    .eq("id", id);
  if (error) {
    throw new Error("فشل في حذف التقرير");
  }
  return data;
}


export async function editOperationreportApi(editedData,id){

  const { data } = await supabase
  .from('operation_report')
  .update({ ...editedData })
  .eq('id', id)
  .select()
  console.log(editedData,id)
  return data;
}

