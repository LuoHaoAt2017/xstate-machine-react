import { Select } from "antd";

export function FormSelect({ control }: { control: IControlItem }) {
  return (
    <div
      className="flex"
      style={{
        flexDirection: "column",
      }}
    >
      <label>{control.controlName}</label>
      <Select
        value={control.controlValue}
        options={control.controlOpts.options}
      ></Select>
    </div>
  );
}
