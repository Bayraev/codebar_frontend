import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./features/AuthSlice"
import { useDispatch } from "react-redux"
import snippetsSlice from "./features/snippetsSlice"

export const store = configureStore({
    reducer: {
        authorization: AuthSlice,
        snippets: snippetsSlice
    },
})

export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
