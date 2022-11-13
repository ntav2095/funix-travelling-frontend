import { createSlice } from "@reduxjs/toolkit";
import i18n from "../services/languages/i18n";

const initialState = {
  lang: "vi", // en | vi
};

const languageSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isExpiredSession = false;
    },
  },
});

export const { setUser, removeUser, setIsExpiredSession } =
  languageSlice.actions;
export default languageSlice.reducer;
