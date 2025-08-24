import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { type UseQueryResult } from "@tanstack/react-query";

interface StatCardProps<T> {
  title: string;
  icon?: React.ReactNode;
  useDataHook: (
    queryParams?: Record<string, string | number>
  ) => UseQueryResult<T[], unknown>;
  queryParams?: Record<string, string | number>;
  computeValue?: (data: T[]) => number;
}

export function StatCard<T>({
  title,
  icon,
  useDataHook,
  queryParams,
  computeValue,
}: StatCardProps<T>) {
  const query = useDataHook(queryParams);
  if (query.isLoading) return <p>Loading...</p>;
  const value = computeValue
    ? computeValue(query.data || [])
    : query.data?.length || 0;

  return (
    <Card className="bg-background border border-muted shadow-md p-3">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
