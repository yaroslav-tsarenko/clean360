"use client";

import type { ReactNode } from "react";
import type { ServiceId } from "@/data/services";
import { useModal } from "./ModalProvider";

type TriggerProps = { className?: string; children?: ReactNode; serviceId?: ServiceId };

/** Кнопка «Замовити прибирання» — відкриває форму заявки */
export function OrderButton({ className = "btn-primary", children = "Замовити прибирання", serviceId }: TriggerProps) {
  const { openOrder } = useModal();
  return (
    <button type="button" className={className} onClick={() => openOrder(serviceId)} aria-haspopup="dialog">
      {children}
    </button>
  );
}

/** Посилання «Детальніше» — відкриває попап з переліком робіт */
export function DetailsButton({ serviceId, className, children = "Детальніше" }: TriggerProps & { serviceId: ServiceId }) {
  const { openService } = useModal();
  return (
    <button type="button" className={className} onClick={() => openService(serviceId)} aria-haspopup="dialog">
      {children}
    </button>
  );
}
