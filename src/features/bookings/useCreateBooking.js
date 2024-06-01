import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking as createBookingApi } from "../../services/apiBookings";
export  function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading: isAdding } = useMutation({
    mutationFn : createBookingApi,
    onSuccess: () => {
      toast.success("New Booking Added Successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    }
      
  })

  return { createBooking, isAdding };
}
