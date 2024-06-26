import { useQuery } from "@tanstack/react-query";
import { getLapReportsToday } from "../../services/apiLabReport";

export function useLapReportsActivity() {
  const { isLoading, data: lapReportsToday } = useQuery({
    queryKey: ["lap-reports-activity"],
    queryFn: getLapReportsToday,
  });

  return { isLoading, lapReportsToday };
}
