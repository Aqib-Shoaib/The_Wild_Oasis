import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const navigate = useNavigate();
  const queryCl = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Checked In ${data.id} Successfully!`);
      queryCl.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error("Checked In Failed");
    },
  });
  return { isLoading, mutate };
}

export default useCheckin;
