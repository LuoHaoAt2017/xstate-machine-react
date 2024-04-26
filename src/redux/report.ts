import { createSlice } from "@reduxjs/toolkit";
import { ControlTypeEnum } from "@/enums";

const initialState: IReportState = {
  fieldList: [
    {
      controlType: ControlTypeEnum.FormCheckBox,
      controlName: "FormCheckBox",
      controlCode: "0001",
      controlOpts: { visible: true, disable: true, options: [] },
      controlValue: "",
    },
    {
      controlType: ControlTypeEnum.FormDate,
      controlName: "FormDatePicker",
      controlCode: "0002",
      controlOpts: { visible: true, disable: true, options: [] },
      controlValue: "",
    },
    {
      controlType: ControlTypeEnum.FormInput,
      controlName: "FormInput",
      controlCode: "0003",
      controlOpts: { visible: true, disable: true, options: [] },
      controlValue: "",
    },
  ],
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    updateFields(state, action) {
      state.fieldList = action.payload;
    },
  },
});

export const { updateFields } = reportSlice.actions;

export default reportSlice.reducer;
