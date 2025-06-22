// src/utils/declension.ts
/**
 * Выбирает нужную форму слова в зависимости от числа.
 * @param n — любое целое число
 * @param forms — массив из трёх форм: ['1-я форма', '2–4-я форма', '5+ форма']
 */
export function declOfNum(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100;
  const lastDigit = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (lastDigit > 1 && lastDigit < 5) return forms[1];
  if (lastDigit === 1) return forms[0];
  return forms[2];
}
