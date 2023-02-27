import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IVerifedUser {
    login: boolean;
    idUser: string;
}

const initialState: IVerifedUser = {
    login: false,
    idUser: ''
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