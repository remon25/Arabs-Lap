import { useQuery } from "@tanstack/react-query";
import { getLabSingleReport } from "../../services/apiLabReport";
import { useParams } from "react-router-dom";

export function useGetLabSingleReport() {
  const { id } = useParams();

  const queryFn = () => getLabSingleReport(Number(id));

  const {
    isLoading,
    data: labReport,
    error,
  } = useQuery({
    queryKey: ["lab-report", id],
    queryFn,
    retry: false,
  });

  console.log("Query status:", { id, isLoading, labReport, error });

  return { isLoading, labReport, error };
}
