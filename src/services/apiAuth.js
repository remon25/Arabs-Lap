import supabase, { supabaseAdmin, supabaseUrl } from "./supabase";

export async function getUserRole(userId) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role_id")
    .eq("user_id", userId)
    .single();

  if (error) {
    return 2;
  }
  
  const roleId = data?.role_id;

  return roleId || 2;
}
export async function signUp({ fullName, email, password }) {
  let { data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error);

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error);
  }
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  // 1 - update password or fullName

  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error);
  if (!avatar) return data;

  // 2 - upload avatar image

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError);

  // 3 - update avatar in user

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      heloo: "hellooooooooooooooo",
    },
  });

  if (error2) throw new Error(error2);

  return updatedUser;
}

export async function fetchAllUsers() {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) {
      throw error;
    }

    // Fetch roles for each user
    const usersWithRoles = await Promise.all(
      data.users.map(async (user) => {
        const role = await getUserRole(user.id);
        return {
          ...user,
          role,
        };
      })
    );
    return usersWithRoles;
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
  return null;
}
fetchAllUsers()

export async function makeAdmin(user_id) {
  const { data } = await supabase
    .from("user_roles")
    .insert([{ user_id: user_id, role_id: 1 }])
    .select();
  return data;
}
