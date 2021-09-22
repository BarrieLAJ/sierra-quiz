import { combineReducers, configureStore } from '@reduxjs/toolkit';
import quizReducer from '../features/appSlice'

const theReducer = combineReducers({quiz: quizReducer})

const store = configureStore({
  reducer: theReducer,
});

export type AppState = ReturnType<typeof theReducer>


export default store
