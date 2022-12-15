import { configureStore } from "@reduxjs/toolkit";

// reducers
import userReducer from "./user.slice";
import layoutReducer from "./layout.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
  },
});

export default store;
