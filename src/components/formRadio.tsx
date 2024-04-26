import { Radio } from "antd";

export function FormRadio({ control }: { control: IControlItem }) {
  return <div className="flex" style={{
    flexDirection: 'column'
  }}>
    <label>{ control.controlName }</label>
    <Radio value={control.controlValue}></Radio>
  </div>
}
