import { useMachine } from "@xstate/react";
import { Button } from "antd";
import lightMachine from "@/machines/lightMachine";

function Light() {
  const [state, send] = useMachine(lightMachine);
  const onClick = () => {
    send({
      type: "toggle",
    });
  };

  return (
    <>
      {state.matches("green")
        ? "绿灯行"
        : state.matches("red")
        ? "红灯停"
        : state.matches("yellow")
        ? "黄灯紧"
        : "非法灯光"}
      <Button onClick={onClick}>Toggle</Button>
    </>
  );
}

export default Light;
