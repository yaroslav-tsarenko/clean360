"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitLead, type LeadState } from "@/app/actions";
import { getService, type ServiceId } from "@/data/services";
import { formatPhone } from "@/lib/phone";
import { CloseButton, Modal } from "./Modal";

type Props = {
  open: boolean;
  serviceId?: ServiceId;
  /** Змінюється при кожному відкритті — форма скидається до початкового стану */
  nonce: number;
  onClose: () => void;
};

export function OrderModal({ open, serviceId, nonce, onClose }: Props) {
  const titleId = "order-modal-title";
  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId} className="px-[30px] py-10 max-sm:px-4">
      <div className="modal-card relative flex w-full max-w-[476px] flex-col items-center justify-center gap-4 rounded-[28px] bg-white p-12 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.25)] ring-1 ring-black/5 max-sm:px-6 max-sm:pt-16 max-sm:pb-8">
        <CloseButton onClick={onClose} />
        <OrderForm key={nonce} serviceId={serviceId} titleId={titleId} onDone={onClose} />
      </div>
    </Modal>
  );
}

const inputClass =
  "block w-full rounded-full border-0 bg-light px-[30px] py-5 text-[14px] leading-5 text-ink outline-none ring-2 ring-transparent transition-[box-shadow,background-color] duration-200 placeholder:text-[#999] hover:bg-[#e6e6e6] focus:bg-white focus:ring-brand aria-invalid:ring-red-500";

function OrderForm({ serviceId, titleId, onDone }: { serviceId?: ServiceId; titleId: string; onDone: () => void }) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const service = serviceId ? getService(serviceId) : undefined;
  const errors = state.status === "error" ? state.fieldErrors : undefined;

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-5 py-6 text-center animate-fade-up" role="status">
        <div className="flex size-16 items-center justify-center rounded-full bg-chip">
          <svg viewBox="0 0 24 24" className="size-8 text-brand" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 id={titleId} className="text-[28px] leading-9 font-semibold tracking-tight text-ink">
          Дякуємо!
        </h2>
        <p className="max-w-[320px] font-bold text-brand">
          Ваші дані було отримано! Наш менеджер звʼяжеться з вами найближчим часом.
        </p>
        <button type="button" onClick={onDone} className="btn-primary mt-2 w-auto px-10 py-5">
          Добре
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 id={titleId} className="mt-2 text-[32px] leading-10 font-semibold tracking-tight text-ink max-sm:text-[28px]">
        Ваші дані
      </h2>
      <p className="max-w-[340px] text-center text-[14px] leading-[1.6] text-gray">
        Заповніть коротку форму, та наш менеджер звʼяжеться з вами для уточнення деталей
      </p>
      {service && (
        <p className="rounded-full bg-chip px-4 py-1.5 text-center text-[13px] font-semibold text-brand">
          {service.name}
        </p>
      )}

      <form action={action} noValidate className="mt-1 flex w-full flex-col items-center justify-center gap-[9px]">
        {service && <input type="hidden" name="service" value={service.id} />}
        {/* Honeypot від спаму — приховане від людей поле */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Компанія
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <label htmlFor="lead-name" className="sr-only">
          Ваше імʼя
        </label>
        <input
          id="lead-name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          placeholder="Ваше імʼя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-autofocus
          aria-invalid={!!errors?.name || undefined}
          aria-describedby={errors?.name ? "lead-name-error" : undefined}
          className={inputClass}
        />
        {errors?.name && <FieldError id="lead-name-error">{errors.name}</FieldError>}

        <label htmlFor="lead-phone" className="sr-only">
          Ваш номер телефону
        </label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="Ваш номер телефону"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          onFocus={() => !phone && setPhone("+38 ")}
          onBlur={() => phone.trim() === "+38" && setPhone("")}
          aria-invalid={!!errors?.phone || undefined}
          aria-describedby={errors?.phone ? "lead-phone-error" : undefined}
          className={inputClass}
        />
        {errors?.phone && <FieldError id="lead-phone-error">{errors.phone}</FieldError>}

        <button
          type="submit"
          disabled={pending}
          className="btn-primary mt-1 px-[15px] py-5 shadow-none hover:shadow-brand disabled:pointer-events-none disabled:opacity-70"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
              Обробка...
            </span>
          ) : (
            "Відправити"
          )}
        </button>

        {state.status === "error" && !errors && (
          <p role="alert" className="text-center text-[13px] font-semibold text-red-600">
            {state.message}
          </p>
        )}
      </form>

      <p className="max-w-[370px] text-center text-[12px] text-[#7d7d7d]">
        Натискаючи на кнопку “Відправити”, ви погоджуєтесь <br />
        на{" "}
        <Link href="/privacy-policy" className="font-bold text-brand underline hover:no-underline" onClick={onDone}>
          обробку персональних даних
        </Link>
      </p>
    </>
  );
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className="-mt-1 w-full px-[30px] text-[12px] font-semibold text-red-600">
      {children}
    </p>
  );
}
