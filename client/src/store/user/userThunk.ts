import { createAsyncThunk } from "@reduxjs/toolkit";

import { postLogin } from "@/utils/api";
import { LoginInput } from "@/utils/types";

export const postLoginThunk = createAsyncThunk(
  "post/login",
  async (data: LoginInput) => {
    const response = await postLogin(data);
    return response.data;
  }
);
