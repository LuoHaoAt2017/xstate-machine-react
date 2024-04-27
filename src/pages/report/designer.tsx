import { DragEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { RootState } from "@/redux";
import { addField } from "@/redux/reportReducer";

/**
 * 在拖放目标上触发事件 (目标元素):
 * ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
 * ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
 * ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
 * ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
 */
function ReportDesigner() {
  const dispatch = useDispatch();
  /**
   * dragenter 或 dragover 事件默认处理是不允许放置。
   * 如果你想要允许放置，你必须取消 dragenter 和 dragover 事件来阻止默认的处理。
   * 在 dragenter 和 dragover 事件中调用 preventDefault() 方法将表明在该位置允许放置。
   */
  const onDragEnter = (evt: DragEvent) => {
    if (evt.dataTransfer.types.includes("text/control")) {
      evt.preventDefault();
    } else {
      console.warn("拖拽的数据类型不符合要求，不允许放置。");
    }
    (evt.target as HTMLDivElement).classList.toggle("canDrop");
  };

  /**
   * 离开拖放区域时，删除接收效果。
   */
  const onDragLeave = (evt: DragEvent) => {
    (evt.target as HTMLDivElement).classList.toggle("canDrop");
  };

  /**
   * 在 dragenter 和 dragover 事件监听程序中，你使用拖拽数据的类型来检查是否允许放置（drop）。
   */
  const onDragOver = (evt: DragEvent) => {
    evt.preventDefault();
  };

  const onDrop = (evt: DragEvent) => {
    (evt.target as HTMLDivElement).classList.toggle("canDrop");
    const transferData = evt.dataTransfer.getData("text/control");
    dispatch(addField(JSON.parse(transferData)));
  };

  return (
    <div
      className="grow-[2] border dropzone"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <ReportControls />
    </div>
  );
}

function ReportControls() {
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

export default ReportDesigner;
