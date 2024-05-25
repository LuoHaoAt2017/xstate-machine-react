interface IControl {
  control_name: string;
  control_code: string;
}

const controls: IControl[] = [
  {
    control_name: "申请科室",
    control_code: "apply_dept",
  },
];

// type MyReadonly<T> = {
//   readonly [p in keyof T]: T[p]
// }

// type MyPartial<T> = {
//   [p in keyof T]?: T[p]
// }

// Readonly 是 TypeScript 内置的一个映射类型，它将给定类型的所有属性变为只读。
function testReadonly(controls: Readonly<IControl>[]) {
  if (controls.length > 0) {
    // controls[0].control_name = ""
  }
}

// Partial 是另一个内置的映射类型，它将给定类型的所有属性变为可选。
function testPartial(controls: Partial<IControl>[]) {
  if (controls.length > 0) {
    controls[0].control_name = ""
  }
}

// Pick 是一个映射类型，它从给定类型中选择一部分属性来创建新类型。
type SimpleControl = Pick<IControl, "control_code">;

function testPick(controls: SimpleControl[]) {
  controls[0].control_code = "";
}

type Weekday = "Monday" | "Tuesday" | "Wendnesday" | "Thursday" | "Friday";

// 它根据指定的键类型和值类型创建一个新的对象类型。
type WeekdayHours = Record<Weekday, string>;

const hours: WeekdayHours = {
  Monday: "09:00",
  Tuesday: "10:00",
  Wendnesday: "12:00",
  Thursday: "14:00",
  Friday:"16:00",
}

console.log(hours);