import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  userId: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.id;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
