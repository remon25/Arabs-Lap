import { useQuery } from "@tanstack/react-query";
import { getUserRole } from "../../services/apiAuth";
import { useUser } from "./useUser";

export function useRoles() {
  const user = useUser();
  const {
    data: user_role,
    isLoading: isPending,
    fetchStatus,
  } = useQuery({
    queryKey: ["role", user.user.id], 
    queryFn: () => getUserRole(user.user.id), 
    enabled: !!user.user.id, 
  });

  console.log(user_role);

  console.log(user_role)
  return {
    user_role,
    isPending,
    isAdmin: user_role === 1,
    fetchStatus,
  };
}
