import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phoneNumber: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    resetState: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, resetState } = userSlice.actions;

export default userSlice.reducer;
