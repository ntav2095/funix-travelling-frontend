import { createSlice } from "@reduxjs/toolkit";

// user: { username, role }
const initialState = {
  user: null,
  isExpiredSession: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isExpiredSession = false;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
