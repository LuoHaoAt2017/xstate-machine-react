import { useMachine, useActor } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { friendsMachine, friendMachine } from "./config";

function TodoItem({
  friendRef,
  onRemove,
}: {
  friendRef: ActorRefFrom<typeof friendMachine>;
  onRemove: () => void;
}) {
  const [state, send] = useActor(friendRef);

  const handleEdit = () => {
    send({
      type: "EDIT",
    });
  };

  const handleSave = () => {
    send({
      type: "SAVE",
    });
  };

  const handleCancel = () => {
    send({
      type: "CANCEL",
    });
  };

  const handleChange = (evt) => {
    send({
      type: "INPUT",
      value: evt.target.value,
    });
  };

  return (
    <tr
      className="mb-2 border w-full"
      style={{
        opacity: state.matches("saveing") ? 0.5 : 1,
      }}
    >
      <td className="p-2 w-3/4">
        <input
          value={state.context.curName}
          onChange={handleChange}
          disabled={!state.hasTag("form")}
        ></input>
      </td>
      <td className="p-2">
        <div className="flex gap-4">
          {state.hasTag("form") && (
            <>
              <button
                className="px-4 border min-w-36"
                disabled={state.hasTag("save")}
                onClick={handleSave}
              >
                保存
              </button>
              <button
                className="px-4 border min-w-36"
                disabled={state.hasTag("save")}
                onClick={handleCancel}
              >
                取消
              </button>
            </>
          )}
          {state.hasTag("read") && (
            <>
              <button
                className="px-4 border min-w-36"
                disabled={state.hasTag("save")}
                onClick={handleEdit}
              >
                编辑
              </button>
              <button
                className="px-4 border min-w-36 text-red-600"
                disabled={state.hasTag("save")}
                onClick={onRemove}
              >
                删除
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

function TodoList() {
  const [state, send] = useMachine(friendsMachine);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    send({
      type: "FRIEND_ADD",
      name: state.context.newFriendName,
    });
  };

  const handleDelete = (i) => {
    send({
      type: "FRIEND_DELETE",
      index: i,
    });
  };

  const handleChange = (evt) => {
    send({
      type: "FRIEND_EDIT",
      name: evt.target.value,
    });
  };

  return (
    <>
      <table className="mb-4 w-full">
        <thead>
          <tr>
            <th className="w-full">通讯录</th>
          </tr>
        </thead>
        <tbody>
          {state.context.friends.map((item, i) => (
            <TodoItem
              key={item.id}
              friendRef={item}
              onRemove={() => handleDelete(i)}
            />
          ))}
        </tbody>
      </table>
      <form className="mb-4 p-2 w-full border" onSubmit={handleSubmit}>
        <input
          className="px-4 rounded border w-3/4"
          placeholder="请输入"
          value={state.context.newFriendName}
          onChange={handleChange}
        />
        <button className="ml-4 border px-4 rounded">提交</button>
      </form>
    </>
  );
}

export default TodoList;
