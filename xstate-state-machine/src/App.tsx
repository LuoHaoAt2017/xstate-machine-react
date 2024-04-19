import { createActor, assign, setup } from "xstate";
import "./App.css";

function App() {
  const machine = setup({
    types: {} as {
      context: {
        maxCount: number;
        count: number;
      };
    },
    actions: {
      goSleep: () => {},
      greet: ({ context, event }, params: { count: number }) => {
        console.log("greet:", params.count);
      },
    },
  }).createMachine({
    id: "toggle",
    context: ({ input }: any) => ({
      count: 0,
      maxCount: input.maxCount,
    }), // 状态机内部状态流转需要的变量
    initial: "Inactive",
    states: {
      Inactive: {
        entry: assign({
          count: ({ context }) => context.count + 1,
        }),
        on: {
          toggle: {
            guard: ({ context }) => context.count < context.maxCount,
            target: "Active",
          },
        },
      },
      Active: {
        on: { toggle: "Inactive" },
        after: {
          3000: {
            target: "Inactive",
            actions: "goSleep",
          },
        },
        entry: {
          type: "greet",
          params: ({ context }) => ({
            count: context.count,
          }),
        },
        exit: assign(({ context }) => ({
          count: context.count + 1,
        })),
      },
    },
  });

  const actor = createActor(machine, {
    input: {
      maxCount: 4,
    },
  });

  actor.subscribe((snapshot) => {
    console.log("Value:", snapshot.value);
  });

  actor.start();

  const onClick = () => {
    actor.send({ type: "toggle" });
  };

  return (
    <>
      <button onClick={onClick}>toggle</button>
    </>
  );
}

export default App;
