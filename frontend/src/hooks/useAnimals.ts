import { fetchAnimals } from "@/api/animalsApi";
import { useQuery } from "@tanstack/react-query";

// Animals hook
export const useAnimals = (queryParams?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ['animals', queryParams],
    queryFn: () => fetchAnimals(queryParams),
  });
};
