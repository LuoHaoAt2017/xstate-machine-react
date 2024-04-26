import { Slider } from "antd";

export function FormSlider({ control }: { control: IControlItem }) {
  return <div className="flex" style={{
    flexDirection: 'column'
  }}>
    <label>{ control.controlName }</label>
    <Slider value={control.controlValue}></Slider>
  </div>
}
