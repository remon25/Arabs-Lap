import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editLabreportApi } from "../../services/apiLabReport";
import toast from "react-hot-toast";

export function useEditLabReport() {
  const queryClient = useQueryClient();

  const { mutate: editLabReport, isPending: isEditting } = useMutation({
    mutationFn: ({ editedData, id }) => editLabreportApi(editedData, id),
    onSuccess: () => {
      toast.success("تم تعديل التقرير بنجاح");
      queryClient.invalidateQueries({ queryKey: ["lab-report"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editLabReport, isEditting };
}
