import { useEffect, useRef } from "react";
import { Button } from "antd";
import { Chart } from "@antv/g2";
import { useMachine } from "@xstate/react";
import timerMachine from "./config";
/**
 * 状态机中，从状态A切换到状态B，通常是由事件触发的。
 * 某些情况下，希望状态机在运行的过程中，当满足某种条件时，不依赖于内部事件，能自动切换到下一个状态。
 * 这种场景就是无事件转换。
 */
function Timer() {
  const watchRef = useRef(null);
  const [state, send] = useMachine(timerMachine);
  const counter = state.context.counter;
  console.log("counter", counter);
  useEffect(() => {
    if (!watchRef.current) {
      return;
    }
    const chart = new Chart({
      container: watchRef.current,
      autoFit: true,
    });

    chart
      .gauge()
      .data({
        value: {
          target: counter,
          total: 10,
          name: 'score',
        },
      })
      .legend(false);

    chart.render();
  }, [counter]);

  return <div className="flex flex-col justify-center align-middle">
    <div ref={watchRef}></div>
    <Button.Group>
      <Button onClick={() => send({ type: "START" })}>开始</Button>
      <Button onClick={() => send({ type: "STOP" })}>停止</Button>
    </Button.Group>
  </div>
}

export default Timer;