import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPopUp: false,
  selectedOption: null,
  email: "",
};

const popUpSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    togglePopUp: (state, action) => {
      state.showPopUp = !state.showPopUp;
      state.selectedOption = action.payload.action;
      state.email = action.payload.email;
    },
  },
});

export const { togglePopUp } = popUpSlice.actions;

export default popUpSlice.reducer;
