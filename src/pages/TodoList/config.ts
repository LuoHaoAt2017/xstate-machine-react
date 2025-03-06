import { spawn, ActorRefFrom } from "xstate";
import { createModel } from "xstate/lib/model";

const friendModel = createModel({
  curName: '',
  preName: '',
}, {
  events: {
    EDIT: () => ({}),
    SAVE: () => ({}),
    CANCEL: () => ({}),
    INPUT: (value: string) => ({ value })
  }
});

export const friendMachine = friendModel.createMachine({
  id: "friend",
  context: {
    curName: '',
    preName: '',
  },
  initial: "reading",
  states: {
    reading: {
      tags: ['read'],
      on: {
        EDIT: {
          target: 'editing',
          actions: [
            friendModel.assign({
              preName: (ctx) => ctx.curName,
            })
          ]
        }
      }
    },
    editing: {
      tags: ['form'],
      on: {
        SAVE: {
          target: 'saveing',
        },
        INPUT: {
          actions: [
            friendModel.assign({
              curName: (_, evt) => evt.value
            })
          ]
        },
        CANCEL: {
          target: 'reading',
          actions: [
            friendModel.assign({
              curName: (ctx) => ctx.preName
            })
          ]
        }
      }
    },
    saveing: {
      tags: ['form', 'save'],
      after: {
        2000: {
          target: 'reading'
        }
      }
    }
  }
});

const friendsModel = createModel({
  friends: [] as ActorRefFrom<typeof friendMachine>[],
  newFriendName: '',
}, {
  events: {
    "FRIEND_ADD": (name: string) => ({ name }),
    "FRIEND_EDIT": (name: string) => ({ name }),
    "FRIEND_DELETE": (index: number) => ({ index }),
  }
});

export const friendsMachine = friendsModel.createMachine({
  id: 'friends',
  on: {
    "FRIEND_ADD": {
      actions: [
        friendsModel.assign({
          friends: (ctx, evt) => {
            const newFriend = friendMachine.withContext({
              preName: '',
              curName: evt.name,
            });
            const friendId = `firend-${ctx.friends.length + 1}`;
            return ctx.friends.concat(spawn(newFriend, friendId))
          },
          newFriendName: '',
        })
      ]
    },
    "FRIEND_EDIT": {
      actions: [
        friendsModel.assign({
          newFriendName: (_, evt) => evt.name
        })
      ]
    },
    "FRIEND_DELETE": {
      actions: [
        friendsModel.assign({
          friends: (ctx, evt) => ctx.friends.filter((_, index) => index !== evt.index)
        })
      ]
    }
  }
});