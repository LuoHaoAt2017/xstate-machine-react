import { configureStore } from '@reduxjs/toolkit';
import globalSlice from "./global";
import reportSlice from "./report";

export default configureStore({
  reducer: {
    global: globalSlice,
    report: reportSlice,
  },
});