/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {
  AddQuizInput,
  AnnouncementInput,
  EditAnnouncementInput,
  LoginInput,
  RegisterInput,
  SolveQuiz,
} from "./types";
import { ApiRouters } from "./contant";
import { getCookie } from "./helper/useCookie";

const API_URL = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    if (
      originalConfig.url !== "/auth/login" &&
      error.response &&
      error.response.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      try {
        window.location.href = "/login";
        //! I can added api refresh() token
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

// start api authentication
export const postRegister = (data: RegisterInput) =>
  api.post(`/${ApiRouters.AUTH}/register`, data);

export const postLogin = (data: LoginInput) =>
  api.post(`/${ApiRouters.AUTH}/login`, data);

export const getUserProfile = () => api.get(`/${ApiRouters.AUTH}/user`);

export const getLogout = () => api.post(`/${ApiRouters.AUTH}/logout`);

export const getAllLogout = async () => {
  const response = await api.get(`/${ApiRouters.AUTH}/all/user`)
  return response.data.users
};


// announcement api
export const createAnnouncement = async (data: AnnouncementInput) => {
  const response = await api.post(`/${ApiRouters.ANNOUNCEMENT}/create`, data);
  return response;
};

export const getAnnouncement = async () => {
  const response = await api.get(`/${ApiRouters.ANNOUNCEMENT}`);
  return response.data.data;
};

export const getAnnouncementById = async (id: string | undefined) => {
  const response = await api.get(`/${ApiRouters.ANNOUNCEMENT}/edit/${id}`);
  return response.data;
};

export const updateAnnouncementById = async (
  id: string | undefined,
  data: EditAnnouncementInput | any
) => {
  const response = await api.put(
    `/${ApiRouters.ANNOUNCEMENT}/update/${id}`,
    data
  );
  return response.data;
};

export const deleteAnnouncementById = async (id: string | undefined) => {
  const response = await api.delete(`/${ApiRouters.ANNOUNCEMENT}/delete/${id}`);
  return response.data;
};

// Quiz api ...

export const createQuiz = (data: AddQuizInput) =>
  api.post(`/${ApiRouters.QUIZ}/create`, data);

export const getQuizzes = async () => api.get(`/${ApiRouters.QUIZ}`);

export const getQuizById = (id: string | undefined) =>
  api.get(`/${ApiRouters.QUIZ}/get/${id}`);

export const updateQuizById = async (
  id: string | undefined,
  data: AddQuizInput | any
) => {
  const response = await api.put(`/${ApiRouters.QUIZ}/update/${id}`, data);
  return response.data;
};

export const deleteQuizById = async (id: string | undefined) => {
  const response = await api.delete(`/${ApiRouters.QUIZ}/delete/${id}`);
  return response.data;
};

export const solveQuizById = async (id: string| undefined, data: SolveQuiz) => {
  const response = await api.post(`/${ApiRouters.QUIZ}/solve/${id}`, data);
  return response.data;
};

