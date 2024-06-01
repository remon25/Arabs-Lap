import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // 1 - filter`

  const filterValue = searchParams.get("status") || "all";

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // 2 - sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  // 3 - pagination

  const page = Number(searchParams.get("page")) || 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // when filter or sortBy changes it will re-fetch
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const bookings = data?.data;
  const count = data?.count;

  // prefetch
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], // when filter or sortBy changes it will re-fetch
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], // when filter or sortBy changes it will re-fetch
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, bookings, count, error };
}
