import { DragEvent } from "react";
import { FieldOptions } from "@/constants";

function FieldItem({ item }: { item: IControlItem }) {
  return (
    <div className="px-4 py-2 bg-gray-100 w-full h-full">
      {item.controlName}
    </div>
  );
}

/**
 * 在拖动目标上触发事件 (源元素):
 * ondragstart - 用户开始拖动元素时触发
 * ondrag - 元素正在拖动时触发
 * ondragend - 用户完成元素拖动后触发
 */
export default function FieldList() {

  /**
   * 在 dragstart 事件中，你可以指定拖拽数据、反馈图像和拖拽效果
   */
  const onDragStart = (evt: DragEvent, item: IControlItem) => {
    evt.dataTransfer.setData("text/control", JSON.stringify(item));
    evt.dataTransfer.effectAllowed = "copy";
  }

  return (
    <ul className="flex flex-col gap-4 w-64">
      {FieldOptions.map((item) => (
        <li
          key={item.controlCode}
          className="rounded cursor-grab"
          draggable={true}
          onDragStart={(evt) => onDragStart(evt, item)}
        >
          <FieldItem item={item} />
        </li>
      ))}
    </ul>
  );
}
