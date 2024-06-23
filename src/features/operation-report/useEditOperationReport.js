import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editOperationreportApi } from "../../services/apiOperationReport";
import toast from "react-hot-toast";

export function useEditOperationReport() {
  const queryClient = useQueryClient();

  const { mutate: editOperationReport, isPending: isEditting } = useMutation({
    mutationFn: ({ editedData, id }) => editOperationreportApi(editedData, id),
    onSuccess: () => {
      toast.success("تم تعديل التقرير بنجاح");
      queryClient.invalidateQueries({ queryKey: ["operation-report"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editOperationReport, isEditting };
}
