import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeAdmin } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useCreateAdmin() {
  const queryClient = useQueryClient();
  const { mutate: createAdmin, isPending: isAdding } = useMutation({
    mutationFn: makeAdmin,
    onSuccess: () => {
      toast.success("تم اضافة ادمن بنجاح");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAdding, createAdmin };
}
