import { describe, test, expect } from 'vitest';
import { snapshotValidator } from './snapshotValidator';
import { machineState } from '@core/constants/machine.const';
import { restKind } from '@core/constants/segment.const';
import { rangeStart, rangeEnd } from '@testUtils/fixtures';
import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';

const segmentStart = convertHoursToTimestamp(15);

describe('Тестирование snapshotValidator', () => {
  describe('НЕ ОБЪЕКТ', () => {
    test.each([
      ['null', null],
      ['undefined', undefined],
      ['число', 42],
      ['строка', 'snapshot'],
      ['массив', [{ state: machineState.SETUP }]],
    ])('%s → null', (_label, value) => {
      expect(snapshotValidator(value)).toBeNull();
    });
  });

  describe('НЕВАЛИДНОЕ ПОЛЕ state', () => {
    test.each([
      ['поле отсутствует', { rangeStart, rangeEnd }],
      ['неизвестное значение', { state: 'paused' }],
      ['число вместо строки', { state: 1 }],
      ['null', { state: null }],
    ])('%s → null', (_label, value) => {
      expect(snapshotValidator(value)).toBeNull();
    });
  });

  describe('SETUP', () => {
    test('валидный снимок → SETUP', () => {
      expect(snapshotValidator({ state: machineState.SETUP })).toEqual({
        state: machineState.SETUP,
      });
    });

    test('лишние поля отбрасываются', () => {
      expect(
        snapshotValidator({ state: machineState.SETUP, rangeStart, legacyField: 'x' }),
      ).toEqual({
        state: machineState.SETUP,
      });
    });
  });

  describe('PENDING', () => {
    test('валидный снимок → PENDING', () => {
      expect(snapshotValidator({ state: machineState.PENDING, rangeStart, rangeEnd })).toEqual({
        state: machineState.PENDING,
        rangeStart,
        rangeEnd,
      });
    });

    test.each([
      ['rangeStart отсутствует', { state: machineState.PENDING, rangeEnd }],
      ['rangeEnd отсутствует', { state: machineState.PENDING, rangeStart }],
      ['строка вместо числа', { state: machineState.PENDING, rangeStart: '9:00', rangeEnd }],
      ['NaN', { state: machineState.PENDING, rangeStart: NaN, rangeEnd }],
      ['Infinity', { state: machineState.PENDING, rangeStart, rangeEnd: Infinity }],
      ['null вместо числа', { state: machineState.PENDING, rangeStart: null, rangeEnd }],
    ])('%s → null', (_label, value) => {
      expect(snapshotValidator(value)).toBeNull();
    });
  });

  describe('WORK', () => {
    const valid = {
      state: machineState.WORK,
      rangeStart,
      rangeEnd,
      segmentStart,
      workSegmentCount: 2,
    };

    test('валидный снимок → WORK', () => {
      expect(snapshotValidator(valid)).toEqual(valid);
    });

    test('workSegmentCount = 0 проходит', () => {
      expect(snapshotValidator({ ...valid, workSegmentCount: 0 })).toEqual({
        ...valid,
        workSegmentCount: 0,
      });
    });

    test.each([
      ['segmentStart отсутствует', { ...valid, segmentStart: undefined }],
      ['workSegmentCount отсутствует', { ...valid, workSegmentCount: undefined }],
      ['rangeStart строкой', { ...valid, rangeStart: '9:00' }],
      ['workSegmentCount строкой', { ...valid, workSegmentCount: '2' }],
      ['segmentStart NaN', { ...valid, segmentStart: NaN }],
    ])('%s → null', (_label, value) => {
      expect(snapshotValidator(value)).toBeNull();
    });
  });

  describe('REST', () => {
    const valid = {
      state: machineState.REST,
      rangeStart,
      rangeEnd,
      segmentStart,
      workSegmentCount: 3,
      restKind: restKind.LONG,
    };

    test.each([
      ['long', restKind.LONG],
      ['short', restKind.SHORT],
    ])('валидный снимок с restKind %s → REST', (_label, kind) => {
      expect(snapshotValidator({ ...valid, restKind: kind })).toEqual({
        ...valid,
        restKind: kind,
      });
    });

    test.each([
      ['restKind отсутствует', { ...valid, restKind: undefined }],
      ['неизвестный restKind', { ...valid, restKind: 'medium' }],
      ['restKind числом', { ...valid, restKind: 5 }],
      ['segmentStart отсутствует', { ...valid, segmentStart: undefined }],
    ])('%s → null', (_label, value) => {
      expect(snapshotValidator(value)).toBeNull();
    });
  });

  describe('FINISHED', () => {
    test('валидный снимок → FINISHED', () => {
      expect(snapshotValidator({ state: machineState.FINISHED, rangeStart, rangeEnd })).toEqual({
        state: machineState.FINISHED,
        rangeStart,
        rangeEnd,
      });
    });

    test.each([
      ['rangeEnd отсутствует', { state: machineState.FINISHED, rangeStart }],
      ['rangeStart строкой', { state: machineState.FINISHED, rangeStart: '9:00', rangeEnd }],
    ])('%s → null', (_label, value) => {
      expect(snapshotValidator(value)).toBeNull();
    });
  });
});
