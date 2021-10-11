import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import quizReducer from "../features/appSlice";
import { questionApi } from "../api/questionsApi";
const theReducer = combineReducers({
  quiz: quizReducer,
  [questionApi.reducerPath]: questionApi.reducer,
});

const store = configureStore({
  reducer: theReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([questionApi.middleware]),
});

export type AppState = ReturnType<typeof theReducer>;

export default store;
