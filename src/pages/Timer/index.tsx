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
  const chartRef = useRef<Chart>();
  const [state, send] = useMachine(timerMachine, {
    context: {
      total: 10,
      counter: 0
    }
  });
  const total = state.context.total;
  const counter = state.context.counter;

  useEffect(() => {
    if (!watchRef.current) {
      return;
    }

    if (!chartRef.current) {
      const chart = new Chart({
        container: watchRef.current,
        autoFit: true,
      });

      chart
        .gauge()
        .data({
          value: {
            target: total - counter,
            total: total,
          },
        })
        .legend(false);

      chart.render();
      chartRef.current = chart;
    }
    chartRef.current.changeData({
      value: {
        target: total - counter,
        total: total,
      },
    });
  }, [counter, total]);

  return <div className="flex flex-col justify-center">
    <div ref={watchRef}></div>
    <div className="flex justify-center align-middle gap-2">
      <Button onClick={() => send({ type: "START" })}>开始</Button>
      <Button onClick={() => send({ type: "PAUSE" })}>暂停</Button>
      <Button onClick={() => send({ type: "STOP" })}>重置</Button>
    </div>
  </div>
}

export default Timer;