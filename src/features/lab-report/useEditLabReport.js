import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditLabReport } from "../../services/apiLabReport";
import toast from "react-hot-toast";

export function useEditLabReport() {
  const queryClient = useQueryClient();

  const { mutate: editLabReport, isPending: isEditting } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditLabReport(newCabinData, id),
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
