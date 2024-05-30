import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const [searchParams] = useSearchParams();
  const queryCl = useQueryClient();

  let statusValue = searchParams.get("status");
  let sortValue = searchParams.get("sortBy") || "startDate-desc";
  let pagevalue = searchParams.get("page") || 1;
  let page = Number(pagevalue);
  const filter =
    !statusValue || statusValue === "all"
      ? null
      : { field: "status", value: statusValue };
  const [field, direction] = sortValue.split("-");

  const sortBy = { field, direction };
  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryCl.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });
  }
  if (page > 1) {
    queryCl.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });
  }

  return { isLoading, bookings, count };
}

export default useBookings;
