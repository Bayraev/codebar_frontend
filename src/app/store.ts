import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/AuthSlice";
import { useDispatch } from "react-redux";
import snippetsSlice from "./features/snippetsSlice";
import uiSlice from "./features/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    authorization: AuthSlice,
    snippets: snippetsSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>; // type the State type https://redux-toolkit.js.org/usage/usage-with-typescript
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
