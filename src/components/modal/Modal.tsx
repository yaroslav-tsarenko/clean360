"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  /** Класи для внутрішнього контейнера (вирівнювання/відступи) */
  className?: string;
};

/**
 * Базове модальне вікно на нативному <dialog>:
 * фокус-трап, закриття по Esc, клік поза карткою, блокування скролу сторінки (через CSS :has),
 * плавні анімації відкриття/закриття (див. globals.css → dialog.modal).
 */
export function Modal({ open, onClose, labelledBy, children, className }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  // Актуальне значення `open` для обробника нативної події close (вона приходить асинхронно)
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={() => {
        // Синхронізуємо стан лише якщо діалог закрив сам користувач (Esc),
        // а не ми програмно — інакше перехід «Детальніше → Замовити» закривав би нове вікно
        if (openRef.current) onClose();
      }}
      className="modal fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-white/95 p-0 text-body backdrop-blur-[7px]"
    >
      <div
        className={cn("flex min-h-full flex-col items-center justify-center", className)}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {children}
      </div>
    </dialog>
  );
}

export function CloseButton({
  onClick,
  label = "Закрити",
  pinned = false,
}: {
  onClick: () => void;
  label?: string;
  /** Залишається на екрані під час прокрутки довгого вмісту */
  pinned?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group top-5 right-5 z-10 flex rounded-full bg-ink p-5 shadow-lg transition-[background-color,rotate,scale] duration-300 ease-out-soft hover:rotate-90 hover:bg-brand active:scale-90",
        pinned ? "fixed max-sm:top-3 max-sm:right-3" : "absolute",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/close.svg" alt="" width={24} height={24} className="size-6" />
    </button>
  );
}
