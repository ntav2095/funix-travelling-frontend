import { configureStore } from "@reduxjs/toolkit";

// reducers
import userReducer from "./user.slice";
import layoutReducer from "./layout.slice";
import bannerReducer from './banner.slice'
const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
    banner: bannerReducer,
  },
});

export default store;
