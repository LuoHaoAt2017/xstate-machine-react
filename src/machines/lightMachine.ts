import { createMachine } from "xstate";

const lightMachine = createMachine({
  id: "light",
  initial: "green",
  context: {},
  states: {
    green: {
      on: {
        toggle: {
          target: "yellow",
        },
      },
      // after: {
      //   5000: {
      //     target: 'yellow'
      //   }
      // }
    },
    yellow: {
      on: {
        toggle: {
          target: "red",
        },
      },
      // after: {
      //   2000: {
      //     target: 'red'
      //   }
      // }
    },
    red: {
      type: "parallel",
      states: {
        crosswalkNorth: {
          initial: "walk",
          states: {
            walk: {
              on: {
                PED_WAIT: {
                  target: "wait",
                },
              },
            },
            wait: {
              on: {
                PED_STOP: {
                  target: "stop",
                },
              },
            },
            stop: {
              type: "final",
            },
          },
          onDone: {
            actions: "stopCrosswalkNorth",
          },
        },
        crosswalkEast: {
          initial: "walk",
          states: {
            walk: {
              on: {
                PED_WAIT: {
                  target: "wait",
                },
              },
            },
            wait: {
              on: {
                PED_STOP: {
                  target: "stop",
                },
              },
            },
            stop: {
              type: "final",
            },
          },
          onDone: {
            actions: "stopCrosswalkEast",
          },
        },
      },
      onDone: {
        target: "green",
      },
      on: {
        toggle: {
          target: "green",
        },
      },
      // after: {
      //   3000: {
      //     target: 'green'
      //   }
      // }
    },
  },
});

lightMachine.withConfig({
  actions: {
    stopCrosswalkNorth() {
      console.log("===stopCrosswalkNorth===");
    },
    stopCrosswalkEast() {
      console.log("===stopCrosswalkEast===");
    },
  },
  delays: {},
  guards: {},
  services: {},
});

lightMachine.withContext({
  elapsed: 1000,
  direction: 'north'
});

export default lightMachine;
