import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./dropdownSlice";
import popupReducer from "./popUpSlice";
import deletePopReducer from "./deletePop";

const store = configureStore({
  reducer: {
    dropdown: dropdownReducer,
    popup: popupReducer,
    deletePop: deletePopReducer,

  },
});

export default store;
