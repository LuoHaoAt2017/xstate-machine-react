import { useInterpret } from "@xstate/react";
import { useDispatch } from "react-redux";
import toggleMachine from './config';


export default function Chat() {
  const dispatch = useDispatch();
  const service = useInterpret(toggleMachine);

  service.onTransition((state) => {
    dispatch({
      type: ''
    })
  });
  return <>chat</>
}