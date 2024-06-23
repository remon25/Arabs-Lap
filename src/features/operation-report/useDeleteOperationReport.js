import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOperationReport } from "../../services/apiOperationReport";

export function useDeleteOperationReport() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteOperationReport,
    onSuccess: () => {
      toast.success("تم حذف التقرير بنجاح");
      queryClient.invalidateQueries({ queryKey: ["operation-report"] }); // for immediate deleting without reloading
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, mutate };
}
