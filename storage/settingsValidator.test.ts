import { describe, test, expect } from 'vitest';
import { settingsValidator } from './settingsValidator';
import { startTimestamp, endTimestamp } from '@testUtils/fixtures';

describe('Тестирование settingsValidator', () => {
  describe('НЕ ОБЪЕКТ', () => {
    test.each([
      ['null', null],
      ['undefined', undefined],
      ['число', startTimestamp],
      ['строка', 'settings'],
      ['массив', [{ startTimestamp, endTimestamp }]],
    ])('%s → null', (_label, value) => {
      expect(settingsValidator(value)).toBeNull();
    });
  });

  describe('ВАЛИДНЫЕ НАСТРОЙКИ', () => {
    test('оба поля числа → настройки', () => {
      expect(settingsValidator({ startTimestamp, endTimestamp })).toEqual({
        startTimestamp,
        endTimestamp,
      });
    });

    test('полночь (0) проходит', () => {
      expect(settingsValidator({ startTimestamp: 0, endTimestamp })).toEqual({
        startTimestamp: 0,
        endTimestamp,
      });
    });

    test('лишние поля отбрасываются', () => {
      expect(settingsValidator({ startTimestamp, endTimestamp, legacyField: 'x' })).toEqual({
        startTimestamp,
        endTimestamp,
      });
    });
  });

  describe('НЕВАЛИДНЫЕ НАСТРОЙКИ', () => {
    test.each([
      ['startTimestamp отсутствует', { endTimestamp }],
      ['endTimestamp отсутствует', { startTimestamp }],
      ['оба поля отсутствуют', {}],
      ['startTimestamp строкой', { startTimestamp: String(startTimestamp), endTimestamp }],
      ['endTimestamp строкой', { startTimestamp, endTimestamp: String(endTimestamp) }],
      ['startTimestamp NaN', { startTimestamp: NaN, endTimestamp }],
      ['endTimestamp Infinity', { startTimestamp, endTimestamp: Infinity }],
      ['null вместо числа', { startTimestamp: null, endTimestamp }],
    ])('%s → null', (_label, value) => {
      expect(settingsValidator(value)).toBeNull();
    });
  });
});
