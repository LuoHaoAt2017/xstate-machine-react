import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalReducer";
import reportSlice from "./reportReducer";

const store = configureStore({
  reducer: {
    global: globalSlice,
    report: reportSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ReturnType<typeof store.dispatch>;

export default store;