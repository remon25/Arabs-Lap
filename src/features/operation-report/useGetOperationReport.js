import { useQuery } from "@tanstack/react-query";
import { getOperationReport, getUserId } from "../../services/apiOperationReport";

export function useGetOperationReport() {
  const {
    isLoading,
    data: operationReports,
    error,
  } = useQuery({
    queryKey: ["operation-report"],
    queryFn: getOperationReport,
  });
console.log("operationReports",operationReports)
  return { isLoading, operationReports, error };
}
export function useGetUserId() {
  const {
    isLoading,
    data: userId,
    error,
  } = useQuery({
    queryKey: ["user-id"],
    queryFn: getUserId,
  });
  return { isLoading, userId, error };
}
