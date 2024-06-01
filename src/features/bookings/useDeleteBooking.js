import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success(`Booking deleted Successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Something went wrong while deleting");
    },
  });

  return { deleteBooking, isDeleting };
}
