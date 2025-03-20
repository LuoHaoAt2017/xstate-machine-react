import { createMachine, assign } from "xstate";

type TimerContext = {
  counter: number,
  total: number,
}

const machine = createMachine<TimerContext>({
  id: "timerMachine",
  initial: "idle",
  states: {
    idle: {
      entry: assign({
        counter: (ctx) => ctx.total
      }),
      on: {
        START: {
          target: 'running'
        }
      }
    },
    running: {
      invoke: {
        src: 'tick'
      },
      on: {
        STOP: {
          target: 'idle',
        },
        TICK: {
          actions: assign({
            counter: (ctx) => ctx.counter - 1
          })
        },
        PAUSE: {
          target: "pause"
        },
      },
      always: {
        cond: (ctx) => ctx.counter < 0,
        target: "idle"
      }
    },
    pause: {
      on: {
        START: {
          target: "running"
        },
        STOP: {
          target: "idle"
        }
      }
    }
  }
}, {
  services: {
    tick: () => callback => {
      setInterval(() => callback("TICK"), 1000);
    }
  }
});

export default machine;