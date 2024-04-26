import { Switch } from "antd";

export function FormSwitch({ control }: { control: IControlItem }) {
  return (
    <div
      className="flex"
      style={{
        flexDirection: "column",
      }}
    >
      <label>{control.controlName}</label>
      <Switch checked={control.controlValue}></Switch>
    </div>
  );
}
