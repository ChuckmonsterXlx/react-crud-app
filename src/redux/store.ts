import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slices/notes/index"

const store = configureStore({
    reducer: {
        note: noteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store