import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
    email: string;
    password: string;
    id: string;
}

const initialState: IUser[] = [];

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        }
    }
})

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;