import api from '@/api/axiosInstance';

export const fetchVisitors = async (queryParams?: Record<string, string | number>) => {
  let queryString = '';
  if (queryParams) {
    // Convert all values to string properly, no quotes
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    queryString = '?' + params.toString();
  }

  const { data } = await api.get(`/visitors${queryString}`);
  return data.data.visitors;
};
