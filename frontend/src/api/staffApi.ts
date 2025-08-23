import api from '@/api/axiosInstance';

// Staff
export const fetchStaffs = async (queryParams?: Record<string, string | number>) => {
  let queryString = '';
  if (queryParams) {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    queryString = '?' + params.toString();
  }
  const { data } = await api.get(`/staffs${queryString}`);
  return data.data.staffs;
};