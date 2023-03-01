import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IVerifedUser {
    login: boolean;
    userId: string;
    name: string;
    lastName: string;
    email: string;
}

const initialState: IVerifedUser = {
    login: false,
    userId: '',
    name: '',
    lastName: '',
    email: ''
};

const verifedUserSlice = createSlice({
    name: 'verifedUser',
    initialState,
    reducers: {
        setVerifedUser: (state, action: PayloadAction<IVerifedUser>) => {
            return action.payload
        }
    }
})

export const { setVerifedUser } = verifedUserSlice.actions;
export default verifedUserSlice.reducer;