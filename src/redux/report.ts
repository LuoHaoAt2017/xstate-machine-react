import { createSlice } from '@reduxjs/toolkit';

export const reportSlice = createSlice({
  name: 'report',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = reportSlice.actions;

export default reportSlice.reducer;