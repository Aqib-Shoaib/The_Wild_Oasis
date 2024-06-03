import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryCl = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Booking Deleted Successfully");
      queryCl.invalidateQueries({ active: true });
    },
    onError: () => toast.error("Error in Deleting the booking"),
  });
  return { isLoading, mutate };
}

export default useDeleteBooking;
