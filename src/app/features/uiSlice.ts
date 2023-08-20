import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// declaring variable type
interface uiSliceState {
  isAuthWindowOpen: boolean;
}

// declaring an initial state of a variable
const initialState = {
  isAuthWindowOpen: false,
};

// creating a global function to toggle the auth window
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleAuthWindowOpen: (state) => {
      state.isAuthWindowOpen = !state.isAuthWindowOpen;
      console.log("окно закрывается ыгыгы");
    },
  },
});

// exporting
export const { toggleAuthWindowOpen } = uiSlice.actions; // Exporting actions
export default uiSlice.reducer; // Exporting the reducer
