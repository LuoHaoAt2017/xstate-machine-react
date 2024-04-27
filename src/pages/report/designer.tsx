import { DragEvent, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ControlTypeEnum } from "@/enums";
import { RootState } from "@/redux";
import { addField, swapField } from "@/redux/reportReducer";
import {
  FormCheck,
  FormDate,
  FormInput,
  FormRadio,
  FormSelect,
  FormSlider,
  FormSwitch,
  FormLayout,
} from "@/components";

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
    if (evt.dataTransfer.effectAllowed === "copy") {
      dispatch(addField(JSON.parse(transferData)));
    }
  };

  return (
    <div
      className="grow-[2] border"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
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

function CommonControl({
  children,
  field,
}: {
  children: ReactNode;
  field: IControlItem;
}) {
  const dispatch = useDispatch();
  const fieldList = useSelector((state: RootState) => state.report.fieldList);

  const onDragStart = (evt: DragEvent) => {
    evt.dataTransfer.setData("text/control", JSON.stringify(field));
    evt.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (evt: DragEvent) => {
    evt.preventDefault();
  };

  const onDragEnter = (evt: DragEvent) => {
    if (evt.dataTransfer.types.includes("text/control")) {
      evt.preventDefault();
    } else {
      console.warn("拖拽的数据类型不符合要求，不允许放置。");
    }
  };

  const onDrop = (evt: DragEvent) => {
    const transferData = evt.dataTransfer.getData("text/control");
    const origin = (transferData && JSON.parse(transferData)) || null;
    if (!origin) {
      return;
    }
    const target = field;
    const originIndex = fieldList.findIndex(
      (elem) => elem.controlCode === origin.controlCode
    );
    const targetIndex = fieldList.findIndex(
      (elem) => elem.controlCode === target.controlCode
    );
    if (originIndex === -1 || targetIndex === -1) {
      console.error(
        "originIndex: ",
        originIndex,
        " targetIndex: ",
        targetIndex
      );
      return;
    }
    if (originIndex === targetIndex) {
      return;
    }
    console.log("origin control: ", origin);
    if (evt.dataTransfer.dropEffect === "move") {
      dispatch(swapField({ originIndex, targetIndex }));
    } else if (evt.dataTransfer.dropEffect === "copy") {
      console.log("左侧拖拽元素到当前控件上");
    }
    // 任何元素放置到普通元素上（包含布局元素），交换两个元素的位置。
    // dispatch(addField(JSON.parse(transferData)));
  };

  return (
    <div
      draggable={true}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
}

function LayoutControl({
  children,
  field,
}: {
  children: ReactNode;
  field: IControlItem;
}) {
  const onDragStart = (evt: DragEvent) => {
    evt.dataTransfer.setData("text/control", JSON.stringify(field));
  };
  const onDragEnter = (evt: DragEvent) => {
    if (evt.dataTransfer.types.includes("text/control")) {
      evt.preventDefault();
    } else {
      console.warn("拖拽的数据类型不符合要求，不允许放置。");
    }
    (evt.target as HTMLDivElement).classList.toggle("canDrop");
  };

  const onDragOver = (evt: DragEvent) => {
    evt.preventDefault();
  };

  const onDrop = (evt: DragEvent) => {
    const transferData = evt.dataTransfer.getData("text/control");
    const control = transferData && JSON.parse(transferData);
    console.log("control: ", control);
    // 布局元素放置到布局元素上，交换两个布局元素的位置。
    // 普通元素放置到布局元素上，将普通元素放置在布局元素中。
    // dispatch(addField(JSON.parse(transferData)));
  };

  return (
    <div
      draggable={true}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
}

function ControlRender({ field }: { field: IControlItem }) {
  const ControlMap = [
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormInput,
      render: (control: IControlItem) => (
        <CommonControl
          field={field}
          children={<FormInput control={control} />}
        />
      ),
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormSwitch,
      render: (control: IControlItem) => (
        <CommonControl
          field={field}
          children={<FormSwitch control={control} />}
        />
      ),
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormCheckBox,
      render: (control: IControlItem) => (
        <CommonControl
          field={field}
          children={<FormCheck control={control} />}
        />
      ),
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormRadio,
      render: (control: IControlItem) => (
        <CommonControl
          field={field}
          children={<FormRadio control={control} />}
        />
      ),
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormSelect,
      render: (control: IControlItem) => (
        <CommonControl
          field={field}
          children={<FormSelect control={control} />}
        />
      ),
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormDate,
      render: (control: IControlItem) => (
        <CommonControl
          field={field}
          children={<FormDate control={control} />}
        />
      ),
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormSlider,
      render: (control: IControlItem) => (
        <CommonControl
          field={field}
          children={<FormSlider control={control} />}
        />
      ),
    },
    {
      guard: (controlType: ControlTypeEnum) =>
        controlType === ControlTypeEnum.FormLayout,
      render: (control: IControlItem) => (
        <LayoutControl
          field={field}
          children={<FormLayout control={control} />}
        />
      ),
    },
  ];
  return (
    ControlMap.find((elem) => elem.guard(field.controlType))?.render(field) || (
      <></>
    )
  );
}

export default ReportDesigner;
