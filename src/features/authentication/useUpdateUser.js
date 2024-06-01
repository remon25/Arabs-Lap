import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("تم التحديث بنجاح");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("حدث خطأ ما");
    },
  });

  return { updateUser, isUpdating };
}
