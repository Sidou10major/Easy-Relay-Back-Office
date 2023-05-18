import { configureStore } from "@reduxjs/toolkit";
import vendeurReducer from "./reducers/vendeurReducer";
import navColorsReducer from "./reducers/navColorsReducer";
export default configureStore({
  reducer: {
    vendeur: vendeurReducer,
    navColors: navColorsReducer,
  },
});
