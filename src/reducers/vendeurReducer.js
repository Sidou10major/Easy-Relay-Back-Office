import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export const vendeurSlice = createSlice({
  name: "vendeur",
  initialState: Cookies.get("vendeur")
    ? JSON.parse(Cookies.get("vendeur"))
    : null,
  reducers: {
    loginVendeur: (state, action) => {
      return action.payload;
    },
    logoutVendeur: (state) => {
      return null;
    },
  },
});

export const { loginVendeur, logoutVendeur } = vendeurSlice.actions;
export default vendeurSlice.reducer;
