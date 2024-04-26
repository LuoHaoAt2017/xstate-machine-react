import { ControlTypeEnum } from "@/enums";

export const FieldOptions: IControlItem[] = [
  {
    controlType: ControlTypeEnum.FormCheckBox,
    controlName: "多选控件",
    controlCode: "0001",
    controlOpts: { visible: true, disable: true, options: [] },
    controlValue: "",
  },
  {
    controlType: ControlTypeEnum.FormDate,
    controlName: "日期控件",
    controlCode: "0002",
    controlOpts: { visible: true, disable: true, options: [] },
    controlValue: "",
  },
  {
    controlType: ControlTypeEnum.FormInput,
    controlName: "文本控件",
    controlCode: "0003",
    controlOpts: { visible: true, disable: true, options: [] },
    controlValue: "",
  },
  {
    controlType: ControlTypeEnum.FormRadio,
    controlName: "单选控件",
    controlCode: "0004",
    controlOpts: { visible: true, disable: true, options: [] },
    controlValue: "",
  },
  {
    controlType: ControlTypeEnum.FormSelect,
    controlName: "选择器控件",
    controlCode: "0005",
    controlOpts: { visible: true, disable: true, options: [] },
    controlValue: "",
  },
  {
    controlType: ControlTypeEnum.FormSlider,
    controlName: "滑动控件",
    controlCode: "0006",
    controlOpts: { visible: true, disable: true, options: [] },
    controlValue: "",
  },
  {
    controlType: ControlTypeEnum.FormLayout,
    controlName: "布局控件",
    controlCode: "0007",
    controlOpts: { visible: true, disable: true, options: [] },
    controlValue: "",
  },
];
