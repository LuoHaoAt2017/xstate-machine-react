import { Input } from "antd";

export function FormInput({ control }: { control: IControlItem }) {
  return (
    <div
      className="flex"
      style={{
        flexDirection: "column",
      }}
    >
      <label>{control.controlName}</label>
      <Input value={control.controlValue}></Input>
    </div>
  );
}
