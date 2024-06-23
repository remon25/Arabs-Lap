import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditOperationReport } from "../../services/apiOperationReport";
import toast from "react-hot-toast";

export function useCreateOpertaionReport() {
  const queryClient = useQueryClient();
  const { mutate: createOperationReport, isPending: isAdding } = useMutation({
    mutationFn: createEditOperationReport,
    onSuccess: () => {
      toast.success("تم إضافة التقرير بنجاح");
      queryClient.invalidateQueries({ queryKey: ["operation-report"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAdding, createOperationReport };
}
