import Editor from "./editor";
import Designer from "./designer";
import FieldList from "./controls";
import { Button } from "antd";

function Report() {
  return (
    <div className="w-full h-full">
      <div className="flex justify-end align-middle py-2">
        <Button type="primary">保存</Button>
      </div>
      <div className="flex justify-between gap-2 h-fit">
        <FieldList></FieldList>
        <Designer></Designer>
        <Editor></Editor>
      </div>
    </div>
  );
}

export default Report;
