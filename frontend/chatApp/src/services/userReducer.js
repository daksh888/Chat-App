import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.loggedIn = true;
    },
    logOut(state) {
      state.name = '';
      state.email = '';
      state.loggedIn = false;
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
