"use server";

import { services } from "@/data/services";
import { formatPhone, isValidPhone } from "@/lib/phone";

export type LeadState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: { name?: string; phone?: string } };

/**
 * Відправка заявки в Telegram. Токен бота живе лише на сервері (env), а не в браузері, як було раніше.
 * Потрібні змінні оточення: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
 */
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot: це поле бачать тільки боти
  if (String(formData.get("company") ?? "").trim()) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim().slice(0, 100);
  const phone = String(formData.get("phone") ?? "").trim();
  const serviceId = String(formData.get("service") ?? "");
  const service = services.find((s) => s.id === serviceId);

  const fieldErrors: { name?: string; phone?: string } = {};
  if (name.length < 2) fieldErrors.name = "Вкажіть, будь ласка, ваше імʼя";
  if (!isValidPhone(phone)) fieldErrors.phone = "Введіть номер у форматі +38 097 777 77 77";
  if (fieldErrors.name || fieldErrors.phone) {
    return { status: "error", message: "Перевірте правильність заповнення полів", fieldErrors };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("[lead] TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не задані");
    return { status: "error", message: "Не вдалося надіслати заявку. Зателефонуйте нам, будь ласка." };
  }

  const text = [
    "✅ Нова заявка з Clean360",
    `👤 Імʼя: ${name}`,
    `📞 Телефон: ${formatPhone(phone)}`,
    service ? `🧹 Послуга: ${service.name}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[lead] Telegram error", res.status, await res.text());
      return { status: "error", message: "Помилка при відправці. Спробуйте ще раз або зателефонуйте нам." };
    }
    return { status: "success" };
  } catch (error) {
    console.error("[lead] Network error", error);
    return { status: "error", message: "Не вдалося зʼєднатися. Спробуйте ще раз." };
  }
}
