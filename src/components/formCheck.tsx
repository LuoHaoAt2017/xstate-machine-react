import { Checkbox } from "antd";

export function FormCheck({ control }: { control: IControlItem }) {
  return (
    <div
      className="flex"
      style={{
        flexDirection: "column",
      }}
    >
      <label>{control.controlName}</label>
      <Checkbox checked={control.controlValue}></Checkbox>
    </div>
  );
}
