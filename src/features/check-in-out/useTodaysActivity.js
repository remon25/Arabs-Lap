import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodaysActivity() {
  const { isLoading, data: todaysActivity } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { isLoading, todaysActivity };
}
