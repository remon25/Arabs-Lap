import { useQuery } from "@tanstack/react-query";
import { getOperationSingleReport } from "../../services/apiOperationReport";
import { useParams } from "react-router-dom";

export function useGetOperationSingleReport() {
  const { id } = useParams();

  const queryFn = () => getOperationSingleReport(Number(id));

  const {
    isLoading,
    data: operationReport,
    error,
  } = useQuery({
    queryKey: ["operation-report", id],
    queryFn,
    retry: false,
  });

  console.log("Query status:", { id, isLoading, operationReport, error });

  return { isLoading, operationReport, error };
}
