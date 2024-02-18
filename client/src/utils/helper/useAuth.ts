/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./useCookie";
import { getUserProfile } from "../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { providerUserInfo } from "@/store/user/userSlice";

export function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { data, isError, isLoading } = useQuery({
    queryKey: ["AuthUser"],
    queryFn: async () => {
      const response = await getUserProfile();
      return response.data;
    },
  });

  const Token = getCookie("token");

  useEffect(() => {
    dispatch(providerUserInfo(data));
    if (!Token) {
      navigate("/login");
    }
  }, [data, dispatch, Token, navigate]);

  return useMemo(
    () => ({ data, isError, isLoading }),
    [data, isError, isLoading]
  );
}
