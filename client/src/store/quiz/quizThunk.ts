import { createAsyncThunk } from "@reduxjs/toolkit";

import { createQuiz, getQuizzes, getQuizById } from "@/utils/api";
import { AddQuizInput } from "@/utils/types";

export const createQuizThunk = createAsyncThunk(
  "create/quiz",
  async (data: AddQuizInput) => {
    const response = await createQuiz(data);
    return response.data;
  }
);

export const getQuizThunk = createAsyncThunk("get/quiz", async () => {
  const response = await getQuizzes();
  return response.data;
});

export const getQuizByIdThunk = createAsyncThunk(
  "get/quiz/by/id",
  async (id: string | undefined) => {
    const response = await getQuizById(id);
    return response.data;
  }
);



