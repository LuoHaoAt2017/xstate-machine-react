import { createMachine, assign } from "xstate";

const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlgBcB7AB0gGIBlAFQEEAlJgbQAYBdRUNUqxc5XJXwCQAD0QAmAIwAOEgDYFAFgCsAdiVaNcpUo2qAzABoQAT0QKzcknPOqlmnRoWulqgL6+rNCw8QlIAJwBXfHwCKEYmAHkABR5+JBAhETEJKVkERS0SHXNuOWKATlVyo1KrW3yykjNK0w1DOS0HJX9AjBwCYhJI6Ni6JgBJAGEAaVSpTNFxSXS8nW4Sat03D2azJTNLG0Q3JrkjcuMlHQVufZ6QIP7QoaiY-Di59IXs5dA8gqKJTKVSqNTkdTsSkc3GKCh0DmcezM8P8ARA+EoEDgUkeIWI82EixyK0QAFoFBCEKS-GjcQNSBQaJACVklrlEA5ykUNPCdDo5Bo9nytJTlI4NOUFFopW44QpJd1aX08eFXrEWUTfjJEDzRSctvYjILuK4zFpUb4gA */
  id: "timerMachine",
  context: {
    counter: 0
  },
  initial: "stoped",
  states: {
    stoped: {
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
          target: 'stoped'
        },
        TICK: {
          actions: assign({
            counter: (ctx) => ctx.counter + 1
          })
        }
      },
      always: {
        cond: (ctx) => ctx.counter === 10,
        target: "stoped"
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