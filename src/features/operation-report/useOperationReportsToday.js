import { useQuery } from "@tanstack/react-query";
import { getOperationReportsToday } from "../../services/apiOperationReport";

export function useOperationReportActivity() {
  const { isLoading, data: operationReportsToday } = useQuery({
    queryKey: ["operation-reports-activity"],
    queryFn: getOperationReportsToday,
  });

  return { isLoading, operationReportsToday };
}
