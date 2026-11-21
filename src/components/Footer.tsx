/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { nav, site } from "@/lib/site";
import { OrderButton } from "@/components/modal/triggers";
import { Socials } from "./Socials";

const year = new Date().getFullYear();

const legal = [
  { href: "/privacy-policy", label: "Політика конфіденційності" },
  { href: "/public-offert", label: "Договір оферти" },
];

const linkClass = "w-fit text-white transition-opacity duration-300 hover:opacity-70";

function Phones({ className }: { className?: string }) {
  return (
    <>
      {site.phones.map((p, i) => (
        <a key={p.href} href={p.href} aria-label={`Зателефонувати ${p.display}`} className={`flex w-fit transition-opacity hover:opacity-75 ${className ?? ""}`}>
          <img src={`/images/phone${i + 1}-white.svg`} alt={p.display} width={214} height={20} loading="lazy" />
        </a>
      ))}
    </>
  );
}

export function Footer({ homeHref = "", withOrder = true }: { homeHref?: string; withOrder?: boolean }) {
  const copyright = <p className="mb-2.5 text-white max-sm:text-center">© “Clean 360°”, 2024–{year}</p>;

  return (
    <footer className="bg-brand py-20 max-sm:py-14">
      {/* Десктоп / планшет */}
      <div className="container-x grid grid-cols-4 gap-16 max-lg:grid-cols-2 max-lg:gap-12 max-sm:hidden">
        <div className="flex flex-col gap-12">
          <img src="/images/logo-white.svg" alt="Clean360°" width={800} height={150} loading="lazy" className="h-auto w-full" />
          <div className="flex flex-col gap-6">
            <Socials variant="white" className="gap-3" size={38} />
            {copyright}
          </div>
        </div>

        <nav aria-label="Навігація у футері" className="flex flex-col gap-4">
          <p className="m-0 text-[18px] leading-6 font-semibold text-white">Навігація</p>
          {nav.map((item) => (
            <a key={item.href} href={`${homeHref}${item.href}`} className={linkClass}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-4">
          <p className="m-0 text-[18px] leading-6 font-semibold text-white">Юридичні документи</p>
          {legal.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
          {withOrder && (
            <OrderButton className="btn-primary mt-2 w-fit bg-white px-8 py-5 whitespace-nowrap text-brand shadow-none hover:bg-white hover:text-brand-hover" />
          )}
        </div>

        <div className="flex flex-col items-start gap-4">
          <Phones />
          <a
            href="#header"
            className="group flex w-fit items-center justify-center gap-4 rounded-full bg-dark px-9 py-6 text-white transition-[background-color,translate] duration-300 ease-out-soft hover:-translate-y-1 hover:bg-[#2a2a2a]"
          >
            <span className="text-[17px] font-semibold">Вгору</span>
            <img src="/images/arrow-up.svg" alt="" width={29} height={16} className="transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>

      {/* Мобільна версія */}
      <div className="container-x hidden flex-col gap-12 max-sm:flex">
        <div className="flex flex-col items-center justify-center gap-8">
          <img src="/images/logo-white.svg" alt="Clean360°" width={800} height={150} loading="lazy" className="h-auto w-full max-w-[320px] px-5" />
          <Socials variant="white" className="gap-3" size={38} />
          <div className="flex flex-col items-center gap-5">
            <Phones />
          </div>
        </div>
        <nav aria-label="Навігація у футері" className="flex flex-col items-center gap-4 text-center text-white">
          <p className="m-0 text-[18px] leading-6 font-semibold">Навігація</p>
          {nav.map((item) => (
            <a key={item.href} href={`${homeHref}${item.href}`} className={linkClass}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center gap-4 text-center text-white">
          <p className="m-0 text-[18px] leading-6 font-semibold">Юридичні документи</p>
          {legal.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </div>
        {copyright}
      </div>
    </footer>
  );
}

/** Плаваюча кнопка дзвінка (мобільні) */
export function FloatingCall() {
  return (
    <a
      href={site.phones[0].href}
      aria-label={`Зателефонувати ${site.phones[0].display}`}
      className="fixed right-0 bottom-0 z-[999] mr-5 mb-5 hidden w-fit items-center justify-center rounded-full bg-brand p-5 shadow-brand transition-[opacity,scale] duration-300 hover:opacity-80 active:scale-90 max-sm:flex"
    >
      <span aria-hidden className="absolute inset-0 rounded-full bg-brand motion-safe:animate-ping motion-safe:[animation-duration:2.4s] opacity-40" />
      <img src="/images/phone-icon.svg" alt="" width={51} height={51} className="relative w-[51px]" />
    </a>
  );
}
