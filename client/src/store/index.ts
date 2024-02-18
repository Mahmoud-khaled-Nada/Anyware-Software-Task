import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice'
import quizSlice from './quiz/quizSlice'

export const store = configureStore({
  reducer: {
    user : userSlice,
    quiz : quizSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch