import { describe, expect, test } from 'vitest';
import { createMachine, interpret } from 'xstate';
import dayjs from 'dayjs';
import type { Dayjs } from "dayjs";

const dayOfTimeMachine = createMachine<{
  time: Dayjs
}>(
  {
    initial: 'unknown',
    states: {
      unknown: {
        always: [
          {
            target: 'morning',
            cond: 'isBeforeNoon',
          },
          {
            target: 'afternoon',
            cond: 'isBeforeSix',
          },
          {
            target: 'evening',
          },
        ],
      },
      morning: {},
      afternoon: {},
      evening: {},
    },
  },
  {
    guards: {
      isBeforeNoon(ctx) {
        const time = dayjs().startOf('d').add(12, 'h');
        return dayjs(ctx.time).isBefore(time);
      },
      isBeforeSix(ctx) {
        const time = dayjs().startOf('d').add(18, 'h');
        return dayjs(ctx.time).isBefore(time);
      },
    },
  },
);

describe('人机对话状态机测试', function () {
  test('瞬时状态转换', () => {
    const time = dayjs().hour(15);
    interpret(
      dayOfTimeMachine.withContext({
        time: time,
      }),
    )
      .onTransition(function (state) {
        console.log(state.value);
        expect(state.value).toEqual("afternoon");
      })
      .start();
  });
});