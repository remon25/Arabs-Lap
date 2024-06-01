import { useQuery } from "@tanstack/react-query";
import { getCapins } from "../../services/apiCabins";

export function useGetCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCapins,
  });

  return { isLoading, cabins, error };
}
