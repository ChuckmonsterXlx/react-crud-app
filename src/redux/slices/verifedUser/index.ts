import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IVerifedUser {
    login: boolean;
    userId: string;
    name: string;
    lastName: string;
    email: string;
    role: string;
    profileImg: IProfileImg;
}
export interface IProfileImg {
    label: string,
    value: string,
    url: string
}

const initialState: IVerifedUser = {
    login: false,
    userId: '',
    name: '',
    lastName: '',
    email: '',
    role: '',
    profileImg: {label: '', value: '', url: ''}
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