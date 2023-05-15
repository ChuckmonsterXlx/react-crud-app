import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfileImg, IRole } from '../verifedUser';

export interface IUser {
    email: string;
    password: string;
    id: string;
    name: string;
    lastName: string;
    role: IRole;
    roleEditing: string;
    profileImg: IProfileImg;
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