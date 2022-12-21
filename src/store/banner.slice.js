import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeSliders: null,

  // tours
  vnTours: null,
  euTours: null,

  // guides
  guides: null,
  experience: null,
  destination: null,
  diary: null,
  handbook: null,

  // detail
  tourDetail: null,
  articleDetail: null,
};

const banner = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateBanner(state, action) {
      const { type, bannerItem } = action.payload; // bannerItem: { _id, banner: url }
      state[type] = bannerItem;
    },
    setBanners(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateBanner, setBanners } = banner.actions;
export default banner.reducer;
