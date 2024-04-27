import { createSlice } from "@reduxjs/toolkit";
// import { ControlTypeEnum } from "@/enums";

const initialState: IReportState = {
  fieldList: [],
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    updateFields(state, action) {
      state.fieldList = action.payload;
    },
    addField(state, action) {
      state.fieldList.push(action.payload);
    },
    swapField(state, action) {
      const { originIndex, targetIndex } = action.payload;
      const origin = state.fieldList[originIndex];
      state.fieldList[originIndex] = state.fieldList[targetIndex];
      state.fieldList[targetIndex] = origin;
    },
  },
});

export const { updateFields, addField, swapField } = reportSlice.actions;

export default reportSlice.reducer;
