import { createMachine } from "xstate";

const lightMachine = createMachine(
  {
    id: "light",
    initial: "green",
    states: {
      green: {
        on: {
          toggle: {
            target: 'yellow'
          }
        },
        after: {
          5000: {
            target: 'yellow'
          }
        }
      },
      yellow: {
        on: {
          toggle: {
            target: 'red'
          }
        },
        after: {
          2000: {
            target: 'red'
          }
        }
      },
      red: {
        on: {
          toggle: {
            target: 'green'
          }
        },
        after: {
          3000: {
            target: 'green'
          }
        }
      },
    },
  },
  {
    actions: {},
    delays: {},
    guards: {},
    services: {},
  }
);

export default lightMachine;