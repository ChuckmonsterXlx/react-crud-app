import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface INote {
    title: string;
    content: string;
    id: string;
    userId: string;
}

const initialState: INote[] = [];

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        }
    }
})

export const { setNotes } = noteSlice.actions;
export default noteSlice.reducer;