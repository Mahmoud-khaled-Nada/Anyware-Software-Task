import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { postLoginThunk } from "./userThunk";
import toast from "react-hot-toast";
import { setCookie } from "@/utils/helper/useCookie";
import { User, UserStateType } from "@/utils/types";

const initialState: UserStateType = {
  data: null,
  token: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    providerUserInfo: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(postLoginThunk.fulfilled, (state, action) => {
        setCookie("token", action.payload.token, 50);
        location.href = "/dashboard";
      })
      .addCase(postLoginThunk.rejected, (state, action) => {
        if (action.error) {
          toast.error("Invalid username or password");
        }
      }),
});

export const { providerUserInfo } = userSlice.actions;

export default userSlice.reducer;


