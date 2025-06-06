import { configureStore } from "@reduxjs/toolkit";
import citasReducer from "../features/citas/citaSlice";
import loggerMiddleware from "../middleware/loggerMiddleware";

export const store = configureStore({
  reducer: {
    citas: citasReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;