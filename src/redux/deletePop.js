import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOption: null,
};

const popUpslice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    toggleDelete: (state, payload) => {
      state.showPopUp = !state.showPopUp;
      state.email = payload.payload;
    },
  },
});

export const { toggleDelete } = popUpslice.actions;

export default popUpslice.reducer;
