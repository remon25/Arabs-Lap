import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditLabReport } from "../../services/apiLabReport";
import toast from "react-hot-toast";

export function useCreateLabReport() {
  const queryClient = useQueryClient();
  const { mutate: createLabReport, isPending: isAdding } = useMutation({
    mutationFn: createEditLabReport,
    onSuccess: () => {
      toast.success("تم إضافة التقرير بنجاح");
      queryClient.invalidateQueries({ queryKey: ["lab-report"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAdding, createLabReport };
}
