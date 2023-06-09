import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  gender: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.gender = action.payload.gender;
    },
    updateUserName: (state, action) => {
      console.log(action.payload);
      state.name = action.payload.name;
    },
    resetState: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, resetState, updateUserName } = userSlice.actions;

export default userSlice.reducer;
