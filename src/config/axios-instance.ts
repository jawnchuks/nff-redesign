import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { backendApiURL } from "./index";

const instanceSettings: AxiosRequestConfig = {
  baseURL: backendApiURL,
  timeout: 300000,
};

const jwt: string | false = false;
// const token = useSelector((state: RootState) => state.authSlice)

console.log(backendApiURL);

const onRequestError = (error: any) => Promise.reject(error?.response);
const onResponseError = onRequestError;

const authHeaders = jwt ? { Authorization: `Bearer ${jwt}` } : undefined;

const createAxiosInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance: AxiosInstance = axios.create(config);
  instance.interceptors.response.use(null, onResponseError);
  instance.interceptors.request.use(null, onRequestError);
  return instance;
};

const publicInstanceAxios: AxiosInstance = createAxiosInstance({
  ...instanceSettings,
});

const authInstanceAxios: AxiosInstance = createAxiosInstance({
  ...instanceSettings,
  headers: authHeaders,
});

export { publicInstanceAxios, authInstanceAxios };
