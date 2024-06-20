import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOption: null,
};

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    setDropdownOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});



export const { setDropdownOption } = dropdownSlice.actions;

export default dropdownSlice.reducer;

