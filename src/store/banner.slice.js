import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: {
    home: {
      trongNuoc: "",
      chauAu: "",
    },
    tourdetail: {
      id: "",
      image: "",
    },
    articledetail: {
      id: "",
      image: "",
      // title:''
    },
  },
};

const banner = createSlice({
  name: "user",
  initialState,
  reducers: {
    homesliderTrongNuoc(state, action) {
      state.image.home.trongNuoc = action.payload;
    },
    homesliderChauAu(state, action) {
      state.image.home.chauAu = action.payload;
    },
    tourdetail(state, action) {
      state.image.tourdetail = action.payload;
    },
    articleDetail(state, action) {
      state.image.articledetail = action.payload;
    },
  },
});

export const { homesliderTrongNuoc, homesliderChauAu, tourdetail, articleDetail } =
  banner.actions;
export default banner.reducer;
