/** Локальна частина номера (10 цифр після +38), напр. "0971234567" */
export function phoneDigits(value: string): string {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("38")) d = d.slice(2);
  return d.slice(0, 10);
}

/** Форматує ввід у вигляд «+38 097 123 45 67» (без хвостових пробілів — Backspace працює природно) */
export function formatPhone(value: string): string {
  const d = phoneDigits(value);
  if (!d) return "";
  const parts = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 8), d.slice(8, 10)].filter(Boolean);
  return `+38 ${parts.join(" ")}`;
}

export function isValidPhone(value: string): boolean {
  return /^0\d{9}$/.test(phoneDigits(value));
}
