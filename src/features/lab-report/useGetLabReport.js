import { useQuery } from "@tanstack/react-query";
import { getLabReport, getUserId } from "../../services/apiLabReport";

export function useGetLabReport() {
  const {
    isLoading,
    data: labReports,
    error,
  } = useQuery({
    queryKey: ["lab-report"],
    queryFn: getLabReport,
  });
console.log("labReports",labReports)
  return { isLoading, labReports, error };
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
