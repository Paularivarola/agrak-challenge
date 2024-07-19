import axios, { AxiosRequestConfig } from "axios";
import { AxiosInterceptor } from "./interceptors/axios.interceptor";

export const callApi = async ({
  url,
  method = "get",
  params,
  data,
}: AxiosRequestConfig) => {
  AxiosInterceptor();
  const api = "https://635017b9df22c2af7b630c3e.mockapi.io/"
  const source = axios.CancelToken.source();

  try {
    const response = await axios({
      url,
      baseURL: api,
      method,
      data,
      params,
      cancelToken: source.token,
      timeout: 10000,
    });

    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request canceled");
    }
    throw error;
  } finally {
    source.cancel("Cleanup");
  }
};
