type ControlType = "FormInput" & "FormSelect" & "FormCheckBox";

interface ControlOption {
  visible: boolean;
}

type ControlMap = Record<ControlType, ControlOption>;

const ControlMaps: ControlMap[] = [
  {
    FormInput: {
      visible: false,
    },
  },
  {
    FormSelect: {
      visible: false,
    },
  },
  {
    FormCheck: {
      visible: false,
    },
  },
];

export function getControl(controlType: ControlType): ControlMap {
  return ControlMaps[controlType];
}
