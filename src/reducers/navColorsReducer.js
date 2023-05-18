import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export const navColorsSlice = createSlice({
  name: "navColors",
  initialState: Cookies.get("navColors")
    ? JSON.parse(Cookies.get("navColors"))
    : {
        color1: "#3F0291",
        color2: "#000000",
        color3: "#000000",
        color4: "#000000",
      },
  reducers: {
    setColor1: (state) => {
      Cookies.set(
        "navColors",
        JSON.stringify({
          color1: "#3F0291",
          color2: "#000000",
          color3: "#000000",
          color4: "#000000",
        })
      );
      return {
        color1: "#3F0291",
        color2: "#000000",
        color3: "#000000",
        color4: "#000000",
      };
    },
    setColor2: (state) => {
      Cookies.set(
        "navColors",
        JSON.stringify({
          color1: "#000000",
          color2: "#3F0291",
          color3: "#000000",
          color4: "#000000",
        })
      );
      return {
        color1: "#000000",
        color2: "#3F0291",
        color3: "#000000",
        color4: "#000000",
      };
    },
    setColor3: (state) => {
      Cookies.set(
        "navColors",
        JSON.stringify({
          color1: "#000000",
          color2: "#000000",
          color3: "#3F0291",
          color4: "#000000",
        })
      );
      return {
        color1: "#000000",
        color2: "#000000",
        color3: "#3F0291",
        color4: "#000000",
      };
    },
    setColor4: (state) => {
      Cookies.set(
        "navColors",
        JSON.stringify({
          color1: "#000000",
          color2: "#000000",
          color3: "#000000",
          color4: "#3F0291",
        })
      );
      return {
        color1: "#000000",
        color2: "#000000",
        color3: "#000000",
        color4: "#3F0291",
      };
    },
  },
});

export const { setColor1, setColor2, setColor3, setColor4 } =
  navColorsSlice.actions;
export default navColorsSlice.reducer;
