import { configureStore } from "@reduxjs/toolkit";
import { isEnvDev } from "../utils";
import searchReducer from "./modules/search";
import detailReducer from "./modules/detail";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    detail: detailReducer,
  },
  devTools: isEnvDev(),
});
