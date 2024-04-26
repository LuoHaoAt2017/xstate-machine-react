import { DatePicker } from "antd";

export function FormDate({ control }: { control: IControlItem }) {
  return (
    <div
      className="flex"
      style={{
        flexDirection: "column",
      }}
    >
      <label>{control.controlName}</label>
      <DatePicker value={control.controlValue}></DatePicker>
    </div>
  );
}
