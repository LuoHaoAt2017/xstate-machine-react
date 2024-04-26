interface IControlItem {
  controlType: number;
  controlName: string;
  controlCode: string;
  controlOpts: IControlOption;
  controlValue: any;
}

interface IControlOption {
  visible: boolean;
  disable: boolean;
  options: { label: string; value: string }[];
  layout?: IControlLayout
}

interface IControlLayout {
  direction: string
}

interface IReportState {
  fieldList: IControlItem[];
}
