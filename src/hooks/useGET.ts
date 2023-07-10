import { authInstanceAxios, publicInstanceAxios } from "@/config/axios-instance";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


interface UseGetResult<TData> {
  data?: AxiosResponse<TData>["data"];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const useGET = <TData>(
  url: string,
  withAuth = true
): UseGetResult<TData> => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
  }: UseQueryResult<AxiosResponse<TData>, unknown> = useQuery(url, async () => {
    const axiosInstance = withAuth ? authInstanceAxios : publicInstanceAxios;
    const response = await axiosInstance.get<TData>(url);
    return response;
  });

  return {
    data: data?.data,
    isLoading,
    isSuccess,
    isError,
  };
};
