import { test, describe, expect } from 'vitest';
import { nextDayEndTimestamp, nextDayStartTimestamp } from '@testUtils/fixtures';
import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';
import {
  setupSnapshot,
  pendingSnapshot,
  workSnapshot,
  restLongSnapshot,
  restShortSnapshot,
  finishedSnapshot,
} from '@testUtils/snapshots';
import {
  nowMsList,
  eveningWorkStart,
  eveningRestLongStart,
  eveningRestShortStart,
  endRangeNotification,
  startRangeNotification,
  workEndNotification,
  workSoonNotification,
  restEndNotification,
} from '@testUtils/notificationFixtures';
import type { TSnapshot } from '@core/types/snapshot.type';
import type { TScheduleNotification } from '@notifications/notifications.type';
import { getNotificationsDataList } from '@notifications/utils/getNotificationsDataList';

type TCase = [string, number, TSnapshot, TScheduleNotification[]];

const runCases = (cases: TCase[]) =>
  test.each(cases)('%s', (_, nowMs, snapshot, expected) => {
    expect(getNotificationsDataList(snapshot, nowMs)).toStrictEqual(expected);
  });

describe('Тестирование getNotificationsDataList', () => {
  describe('SETUP', () => {
    runCases([
      ['08:00 — диапазон не задан: уведомлений нет', nowMsList[0], setupSnapshot, []],
      ['09:01 — диапазон не задан: уведомлений нет', nowMsList[1], setupSnapshot, []],
      ['09:27 — диапазон не задан: уведомлений нет', nowMsList[2], setupSnapshot, []],
      ['17:40 — диапазон не задан: уведомлений нет', nowMsList[3], setupSnapshot, []],
      ['18:01 — диапазон не задан: уведомлений нет', nowMsList[4], setupSnapshot, []],
    ]);
  });

  describe('PENDING', () => {
    runCases([
      [
        '08:00 — до начала диапазона: конец дня и старт работы',
        nowMsList[0],
        pendingSnapshot,
        [endRangeNotification, startRangeNotification],
      ],
      [
        '09:01 — начало пропущено: только конец дня',
        nowMsList[1],
        pendingSnapshot,
        [endRangeNotification],
      ],
      [
        '09:27 — начало пропущено: только конец дня',
        nowMsList[2],
        pendingSnapshot,
        [endRangeNotification],
      ],
      [
        '17:40 — начало пропущено: только конец дня',
        nowMsList[3],
        pendingSnapshot,
        [endRangeNotification],
      ],
      [
        '18:01 — диапазон на завтра: конец дня и старт работы',
        nowMsList[4],
        { ...pendingSnapshot, rangeStart: nextDayStartTimestamp, rangeEnd: nextDayEndTimestamp },
        [
          { ...endRangeNotification, date: nextDayEndTimestamp },
          { ...startRangeNotification, date: nextDayStartTimestamp },
        ],
      ],
    ]);
  });

  describe('WORK', () => {
    const workEnd = convertHoursToTimestamp(9, 30);
    const workSoon = convertHoursToTimestamp(9, 25);

    runCases([
      [
        '08:00 — сегмент впереди: конец дня, конец сегмента и предупреждение',
        nowMsList[0],
        workSnapshot,
        [endRangeNotification, workEndNotification(workEnd), workSoonNotification(workSoon)],
      ],
      [
        '09:01 — сегмент идёт: конец дня, конец сегмента и предупреждение',
        nowMsList[1],
        workSnapshot,
        [endRangeNotification, workEndNotification(workEnd), workSoonNotification(workSoon)],
      ],
      [
        '09:27 — предупреждение уже в прошлом: только конец дня и конец сегмента',
        nowMsList[2],
        workSnapshot,
        [endRangeNotification, workEndNotification(workEnd)],
      ],
      [
        '17:40 — сегмент выходит за диапазон: только конец дня',
        nowMsList[3],
        { ...workSnapshot, segmentStart: eveningWorkStart },
        [endRangeNotification],
      ],
      [
        '18:01 — диапазон истёк: уведомлений нет',
        nowMsList[4],
        { ...workSnapshot, segmentStart: eveningWorkStart },
        [],
      ],
    ]);
  });

  describe('REST LONG', () => {
    const restEnd = convertHoursToTimestamp(9, 7);
    const eveningRestEnd = convertHoursToTimestamp(17, 46);

    runCases([
      [
        '08:00 — отдых впереди: конец дня и конец отдыха',
        nowMsList[0],
        restLongSnapshot,
        [endRangeNotification, restEndNotification(restEnd)],
      ],
      [
        '09:01 — отдых идёт: конец дня и конец отдыха',
        nowMsList[1],
        restLongSnapshot,
        [endRangeNotification, restEndNotification(restEnd)],
      ],
      [
        '09:27 — отдых уже закончился: только конец дня',
        nowMsList[2],
        restLongSnapshot,
        [endRangeNotification],
      ],
      [
        '17:40 — вечерний отдых внутри диапазона: конец дня и конец отдыха',
        nowMsList[3],
        { ...restLongSnapshot, segmentStart: eveningRestLongStart },
        [endRangeNotification, restEndNotification(eveningRestEnd)],
      ],
      [
        '18:01 — диапазон истёк: уведомлений нет',
        nowMsList[4],
        { ...restLongSnapshot, segmentStart: eveningRestLongStart },
        [],
      ],
    ]);
  });

  describe('REST SHORT', () => {
    const restEnd = convertHoursToTimestamp(9, 3);
    const eveningRestEnd = convertHoursToTimestamp(17, 42);

    runCases([
      [
        '08:00 — отдых впереди: конец дня и конец отдыха',
        nowMsList[0],
        restShortSnapshot,
        [endRangeNotification, restEndNotification(restEnd)],
      ],
      [
        '09:01 — отдых идёт: конец дня и конец отдыха',
        nowMsList[1],
        restShortSnapshot,
        [endRangeNotification, restEndNotification(restEnd)],
      ],
      [
        '09:27 — отдых уже закончился: только конец дня',
        nowMsList[2],
        restShortSnapshot,
        [endRangeNotification],
      ],
      [
        '17:40 — вечерний отдых внутри диапазона: конец дня и конец отдыха',
        nowMsList[3],
        { ...restShortSnapshot, segmentStart: eveningRestShortStart },
        [endRangeNotification, restEndNotification(eveningRestEnd)],
      ],
      [
        '18:01 — диапазон истёк: уведомлений нет',
        nowMsList[4],
        { ...restShortSnapshot, segmentStart: eveningRestShortStart },
        [],
      ],
    ]);
  });

  describe('FINISHED', () => {
    runCases([
      ['08:00 — день завершён: уведомлений нет', nowMsList[0], finishedSnapshot, []],
      ['09:01 — день завершён: уведомлений нет', nowMsList[1], finishedSnapshot, []],
      ['09:27 — день завершён: уведомлений нет', nowMsList[2], finishedSnapshot, []],
      ['17:40 — день завершён: уведомлений нет', nowMsList[3], finishedSnapshot, []],
      ['18:01 — день завершён: уведомлений нет', nowMsList[4], finishedSnapshot, []],
    ]);
  });
});
