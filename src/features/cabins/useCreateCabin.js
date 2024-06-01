import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isAdding } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New Cabin Added Successfully");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isAdding, createCabin };
}
