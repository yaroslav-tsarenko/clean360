"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { Socials } from "./Socials";

/** Повноекранне мобільне меню на <dialog>: Esc, фокус-трап, блок скролу, закриття при переході за якорем */
export function MobileMenu({ homeHref = "" }: { homeHref?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // Закриваємо меню, якщо екран став десктопним
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Спершу закриваємо меню (знімаємо блок скролу), потім плавно скролимо до секції
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    ref.current?.close(); // одразу знімає блок скролу; onClose синхронізує стан
    if (homeHref) return; // на інших сторінках — звичайний перехід на головну
    e.preventDefault();
    requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", hash);
    });
  };

  return (
    <>
      <button
        type="button"
        aria-label="Відкрити меню"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="rounded-full p-1 transition-transform active:scale-90"
      >
        <img src="/images/burger.svg" alt="" width={25} height={24} />
      </button>

      <dialog
        id="mobile-menu"
        ref={ref}
        aria-label="Меню"
        onClose={() => setOpen(false)}
        className="modal group fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-brand p-0 text-white max-sm:bg-brand-alt"
      >
        <div className="modal-card flex h-full flex-col items-center justify-around overflow-y-auto px-10 py-[60px]">
          <img src="/images/logo-white.svg" alt="Clean360°" width={800} height={150} className="block h-auto w-full max-w-[400px]" />

          <nav aria-label="Мобільна навігація" className="flex flex-col items-center justify-center gap-[39px] text-center max-sm:gap-[30px]">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={`${homeHref}${item.href}`}
                onClick={(e) => goTo(e, item.href)}
                style={{ animationDelay: `${120 + i * 70}ms` }}
                className="w-fit text-[18px] text-white transition-opacity hover:opacity-75 group-open:animate-fade-up"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-center justify-center gap-[26px] max-sm:gap-10">
            <a href={site.phones[0].href} aria-label={`Зателефонувати ${site.phones[0].display}`}>
              <img src="/images/phone1-white.svg" alt={site.phones[0].display} width={214} height={20} />
            </a>
            <a href={site.phones[1].href} aria-label={`Зателефонувати ${site.phones[1].display}`}>
              <img src="/images/phone2-white.svg" alt={site.phones[1].display} width={214} height={20} />
            </a>
            <Socials variant="white" className="gap-[13px]" size={38} />
          </div>

          <button
            type="button"
            aria-label="Закрити меню"
            onClick={() => setOpen(false)}
            className="mx-auto flex w-fit rounded-full bg-ink p-5 transition-[opacity,transform] duration-300 hover:rotate-90 hover:opacity-80 active:scale-90"
          >
            <img src="/images/close.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </dialog>
    </>
  );
}
