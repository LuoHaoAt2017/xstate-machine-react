import { createMachine, cancel, send } from "xstate";

const machine = createMachine({
  initial: "fanOff",
  states: {
    fanOff: {
      on: {
        POWER: {
          target: "fanOn.hist",
        },
      },
    },
    fanOn: {
      initial: "first",
      states: {
        first: {
          on: {
            SWITCH: { target: "second" },
          },
        },
        second: {
          on: {
            SWITCH: { target: "third" },
          },
        },
        third: {
          // on: {
          //   SWITCH: { target: "hist" },
          // },
        },
        hist: {
          type: "history",
          history: "shallow",
        },
      },
      on: {
        POWER: {
          target: "fanOff",
        },
      },
    },
  },
});

export default machine;
