import { useMachine } from "@xstate/react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { RootState } from "@/redux";
import toggleMachine from './config';

export default function Chat() {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);
  const [state, send] = useMachine(toggleMachine, {
    context: {
      counter
    },
    actions: {
      doActive() {
        console.log("active");
      },
      doInactive() {
        console.log("inactive");
      }
    }
  });

  const status = state.matches("active") ? 'active' : 'inactive';
  console.log("counter: ", counter);
  console.log("context: ", state.context);
  return <div>
    <Button onClick={() => send({ type: 'TOGGLE' })}>{status}</Button>
    <Button onClick={() => dispatch({ type: 'counter/increment' })}>{counter}</Button>
  </div>
}