import { describe, test, expect } from 'vitest';
import { settingsValidator } from './settingsValidator';
import { startMinutes, endMinutes } from '@testUtils/fixtures';

describe('Тестирование settingsValidator', () => {
  describe('НЕ ОБЪЕКТ', () => {
    test.each([
      ['null', null],
      ['undefined', undefined],
      ['число', 540],
      ['строка', 'settings'],
      ['массив', [{ startMinutes, endMinutes }]],
    ])('%s → null', (_label, value) => {
      expect(settingsValidator(value)).toBeNull();
    });
  });

  describe('ВАЛИДНЫЕ НАСТРОЙКИ', () => {
    test('оба поля числа → настройки', () => {
      expect(settingsValidator({ startMinutes, endMinutes })).toEqual({
        startMinutes,
        endMinutes,
      });
    });

    test('полночь (0) проходит', () => {
      expect(settingsValidator({ startMinutes: 0, endMinutes })).toEqual({
        startMinutes: 0,
        endMinutes,
      });
    });

    test('лишние поля отбрасываются', () => {
      expect(settingsValidator({ startMinutes, endMinutes, legacyField: 'x' })).toEqual({
        startMinutes,
        endMinutes,
      });
    });
  });

  describe('НЕВАЛИДНЫЕ НАСТРОЙКИ', () => {
    test.each([
      ['startMinutes отсутствует', { endMinutes }],
      ['endMinutes отсутствует', { startMinutes }],
      ['оба поля отсутствуют', {}],
      ['startMinutes строкой', { startMinutes: '540', endMinutes }],
      ['endMinutes строкой', { startMinutes, endMinutes: '1080' }],
      ['startMinutes NaN', { startMinutes: NaN, endMinutes }],
      ['endMinutes Infinity', { startMinutes, endMinutes: Infinity }],
      ['null вместо числа', { startMinutes: null, endMinutes }],
    ])('%s → null', (_label, value) => {
      expect(settingsValidator(value)).toBeNull();
    });
  });
});
