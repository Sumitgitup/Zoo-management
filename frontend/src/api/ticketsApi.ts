import api from "./axiosInstance";

export const fetchTickets = async (queryParams?: Record<string, string | number>) => {
  let queryString = '';
  if (queryParams) {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    queryString = '?' + params.toString();
  }
  const { data } = await api.get(`/tickets${queryString}`);
  return data.data.tickets;
};