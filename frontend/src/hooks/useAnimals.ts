import { fetchAnimals } from "@/api/animalsApi";
import { useQuery } from "@tanstack/react-query";

// Animals hook
export const useAnimals = (queryParams?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ['animals', queryParams],
    queryFn: () => fetchAnimals(queryParams),
  });
};
// const { data: ticketData } = useTickets({ date: '2025-08-23' }); how to use 

// const { data, isLoading, isError, error } = useVisitors({ ageGroup: 'Child' });

// if (isLoading) return <p>Loading...</p>;
// if (isError) return <p>Error: {error?.message}</p>;

// console.log(data); // filtered visitors array 
// with loading,error and other stuff like that 