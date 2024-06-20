import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLabReport } from "../../services/apiLabReport";

export function useDeleteLabReport() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteLabReport,
    onSuccess: () => {
      toast.success("تم حذف التقرير بنجاح");
      queryClient.invalidateQueries({ queryKey: ["lab-report"] }); // for immediate deleting without reloading
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, mutate };
}
