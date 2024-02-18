import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createQuizThunk, getQuizByIdThunk, getQuizThunk } from "./quizThunk";
import { AddQuizInput, QuizStateType } from "@/utils/types";
import toast from "react-hot-toast";

const initialState: QuizStateType = {
  data: null,
  quiz: null
};

export const quizSlice = createSlice({
  name: "quizSlice",
  initialState,
  reducers: {
    providerUserInfo: (state, action: PayloadAction<AddQuizInput>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createQuizThunk.fulfilled, (state, action) => {
        // console.log("createQuizThunk.fulfilled");
        toast.success(action.payload.message);
      })
      .addCase(createQuizThunk.rejected, (state, action) => {
        console.log("createQuizThunk.rejected");
        console.log(action.error);
        toast.error("Please try again");
        location.replace("/dashboard");
      })
      .addCase(getQuizThunk.fulfilled, (state, action) => {
        // console.log("createQuizThunk.fulfilled");
        console.log(action.payload);
        state.data = action.payload.quizzes;
      })
      .addCase(getQuizThunk.rejected, (state, action) => {
        console.log("createQuizThunk.rejected");
        console.log(action.error);
      })
      .addCase(getQuizByIdThunk.fulfilled, (state, action) => {
        console.log("createQuizThunk.fulfilled");
        state.quiz = action.payload.quiz;
      })
      .addCase(getQuizByIdThunk.rejected, (state, action) => {
        console.log("createQuizThunk.rejected");
        console.log(action.error);
      }),
});

// export const { providerUserInfo } = quizSlice.actions;

export default quizSlice.reducer;
