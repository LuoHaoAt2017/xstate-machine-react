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
  },
});

export const { updateFields, addField } = reportSlice.actions;

export default reportSlice.reducer;
