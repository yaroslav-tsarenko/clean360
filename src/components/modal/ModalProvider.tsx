"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { ServiceId } from "@/data/services";
import { OrderModal } from "./OrderModal";
import { ServiceModal } from "./ServiceModal";

type ModalState = { kind: "none" } | { kind: "order"; serviceId?: ServiceId } | { kind: "service"; serviceId: ServiceId };

type ModalApi = {
  openOrder: (serviceId?: ServiceId) => void;
  openService: (serviceId: ServiceId) => void;
  close: () => void;
};

const ModalContext = createContext<ModalApi | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside <ModalProvider>");
  return ctx;
}

/**
 * Єдине джерело стану для всіх попапів сайту.
 * Одночасно відкрите лише одне вікно; останні дані зберігаються, щоб анімація закриття не «блимала».
 */
export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>({ kind: "none" });
  const [lastServiceId, setLastServiceId] = useState<ServiceId>("general");
  const [orderServiceId, setOrderServiceId] = useState<ServiceId | undefined>();
  const [orderNonce, setOrderNonce] = useState(0);

  const openOrder = useCallback((serviceId?: ServiceId) => {
    setOrderServiceId(serviceId);
    setOrderNonce((n) => n + 1);
    setState({ kind: "order", serviceId });
  }, []);

  const openService = useCallback((serviceId: ServiceId) => {
    setLastServiceId(serviceId);
    setState({ kind: "service", serviceId });
  }, []);

  const close = useCallback(() => setState({ kind: "none" }), []);

  const api = useMemo(() => ({ openOrder, openService, close }), [openOrder, openService, close]);

  return (
    <ModalContext.Provider value={api}>
      {children}
      <ServiceModal
        open={state.kind === "service"}
        serviceId={lastServiceId}
        onClose={close}
        onOrder={() => openOrder(lastServiceId)}
      />
      <OrderModal open={state.kind === "order"} serviceId={orderServiceId} nonce={orderNonce} onClose={close} />
    </ModalContext.Provider>
  );
}
