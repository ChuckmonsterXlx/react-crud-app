import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slices/notes/index"
import userReducer from "./slices/users/index"


const store = configureStore({
    reducer: {
        notes: noteReducer,
        users: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store