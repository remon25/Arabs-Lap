import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["cabin"] }); // for immediate deleting without reloading
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, mutate };
}
