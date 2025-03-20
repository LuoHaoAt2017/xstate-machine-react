import { createMachine } from "xstate";

const websiteMachine = createMachine({
  id: "website",
  initial: "unauthorized",
  states: {
    unauthorized: {
      on: {
        LOGIN: {
          target: 'authenticated'
        }
      }
    },
    authenticated: {
      initial: "active",
      on: {
        LOGOUT: {
          target: 'unauthorized'
        }
      },
      states: {
        active: {
          on: {
            CLICK: {
              target: 'active',
            }
          },
          after: {
            10000: {
              target: 'locked',
              actions: ['lock']
            }
          }
        },
        locked: {
          after: {
            10000: {
              target: "#website.unauthorized",
              actions: ['exit']
            }
          },
          on: {
            UNLOCK: {
              target: 'active',
              actions: ['free']
            },
            LOGOUT: {
              target: "#website.unauthorized",
              actions: ['exit']
            }
          }
        }
      }
    },
  }
});

export default websiteMachine;