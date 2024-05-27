import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();

  let statusValue = searchParams.get("status");
  let sortValue = searchParams.get("sortBy") || "startDate-desc";
  const filter =
    !statusValue || statusValue === "all"
      ? null
      : { field: "status", value: statusValue };
  const [field, direction] = sortValue.split("-");

  const sortBy = { field, direction };
  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings(filter, sortBy),
  });

  return { isLoading, bookings };
}

export default useBookings;
