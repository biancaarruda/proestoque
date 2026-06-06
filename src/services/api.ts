import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = __DEV__
  ? "http://192.168.1.21:3333/api"
  : "https://minha-api.com/api";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@proestoque:token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          await AsyncStorage.getItem(
            "@proestoque:refreshToken"
          );

        if (!refreshToken) {
          throw error;
        }

        const response = await api.post(
          "/auth/refresh",
          {
            refreshToken,
          }
        );

        const novoToken =
          response.data.token;

        await AsyncStorage.setItem(
          "@proestoque:token",
          novoToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${novoToken}`;

        return api(originalRequest);

      } catch (err: any) {
        console.log(
          "ERRO NO REFRESH",
          err?.response?.status,
          err?.response?.data
        );
        await AsyncStorage.multiRemove([
          "@proestoque:token",
          "@proestoque:refreshToken",
          "@proestoque:user",
        ]);
      }
    }

    return Promise.reject(error);
  }
);