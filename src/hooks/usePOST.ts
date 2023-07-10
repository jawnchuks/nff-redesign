import { authInstanceAxios, publicInstanceAxios } from "@/config/axios-instance";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// import { ToastContainer, toast } from "react-toastify";

interface UsePostResult<TData> {
  mutate: UseMutationResult<AxiosResponse<TData>, unknown, unknown, unknown>["mutate"];
  data?: AxiosResponse<TData>["data"];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const usePOST = <TData>(
  url: string,
  withAuth = true,
  postCallBack?: (response: AxiosResponse<TData>) => void
    ): UsePostResult<TData> => {
  const {
        mutate,
        data,
        isLoading,
        isSuccess,
        isError,
  } = useMutation<AxiosResponse<TData>, unknown, unknown, unknown>({
        mutationFn: async (values) => {
      const axiosInstance = withAuth ? authInstanceAxios : publicInstanceAxios;
        const response = await axiosInstance.post<TData>(url, values);
          return response?.data;
    },

    onSuccess: (successResponse) => {
            postCallBack && postCallBack(successResponse);
      // toast.success(successResponse?.data || 'Created successfully', {
            //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00923F" ><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"></path></svg>
            // })
          },
    onError: (errorResponse) => {
            console.log(errorResponse);
      // toast.error(errorResponse?.data);
    },
  });

          return {
            mutate,
            data,
            isLoading,
            isSuccess,
            isError,
  };
};
