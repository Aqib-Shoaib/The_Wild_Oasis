import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryCl = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Checked Out ${data.id} Successfully!`);
      queryCl.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Checked out Failed");
    },
  });
  return { isLoading, mutate };
}

export default useCheckout;
