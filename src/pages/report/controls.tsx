import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { ControlTypeEnum } from "@/enums";
import {
  FormCheck,
  FormDate,
  FormInput,
  FormRadio,
  FormSelect,
  FormSlider,
  FormSwitch,
} from "@/components";
import { FieldOptions } from "@/constants";

export function ReportControls() {
  const fieldList = useSelector((state: RootState) => state.report.fieldList);
  return (
    <div className="">
      {fieldList.map((item) => (
        <ControlRender key={item.controlCode} field={item} />
      ))}
    </div>
  );
}

function ControlRender({ field }: { field: IControlItem }) {
  const ControlMap = [
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormInput,
      render: (control: IControlItem) => <FormInput control={control} />,
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormSwitch,
      render: (control: IControlItem) => <FormSwitch control={control} />,
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormCheckBox,
      render: (control: IControlItem) => <FormCheck control={control} />,
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormRadio,
      render: (control: IControlItem) => <FormRadio control={control} />,
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormSelect,
      render: (control: IControlItem) => <FormSelect control={control} />,
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormDate,
      render: (control: IControlItem) => <FormDate control={control} />,
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormSlider,
      render: (control: IControlItem) => <FormSlider control={control} />,
    },
  ];
  return (
    ControlMap.find((elem) => elem.guard(field.controlType))?.render(field) || (
      <></>
    )
  );
}

function FieldItem({ item }: { item: IControlItem }) {
  return (
    <div className="px-4 py-2 bg-gray-100 w-full h-full cursor-grab">
      {item.controlName}
    </div>
  );
}

export default function FieldList() {
  return (
    <ul className="flex flex-col gap-4">
      {FieldOptions.map((item) => (
        <li key={item.controlCode} className="rounded">
          <FieldItem item={item} />
        </li>
      ))}
    </ul>
  );
}
