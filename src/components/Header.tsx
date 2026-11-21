/* eslint-disable @next/next/no-img-element -- дрібні SVG-іконки не потребують оптимізації next/image */
import Link from "next/link";
import { nav, site } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";
import { Socials } from "./Socials";

export function Header({ homeHref = "" }: { homeHref?: string }) {
  return (
    <header id="header" className="w-full bg-light py-5 max-lg:py-3">
      {/* Десктоп */}
      <div className="container-x flex items-center justify-between gap-6 animate-fade-in max-lg:hidden">
        <Link href="/" aria-label="Clean360° — на головну" className="transition-opacity hover:opacity-80">
          <img src="/images/logo.svg" alt="Clean360°" width={124} height={62} className="h-auto w-[124px]" />
        </Link>
        <nav aria-label="Основна навігація" className="flex gap-[clamp(20px,3.6vw,70px)]">
          {nav.map((item) => (
            <a
              key={item.href}
              href={`${homeHref}${item.href}`}
              className="relative font-bold text-gray transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform after:duration-300 hover:text-brand after:hover:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href={site.phones[1].href} aria-label={`Зателефонувати ${site.phones[1].display}`} className="shrink-0 transition-opacity hover:opacity-70 max-[1240px]:hidden">
          <img src="/images/phone2-blue.svg" alt={site.phones[1].display} width={214} height={20} className="h-auto w-[clamp(170px,14vw,214px)]" />
        </a>
        <a href={site.phones[0].href} aria-label={`Зателефонувати ${site.phones[0].display}`} className="shrink-0 transition-opacity hover:opacity-70">
          <img src="/images/phone1-blue.svg" alt={site.phones[0].display} width={214} height={20} className="h-auto w-[clamp(170px,14vw,214px)]" />
        </a>
        <Socials variant="dark" className="shrink-0 gap-[clamp(16px,2vw,36px)]" />
      </div>

      {/* Мобільна версія */}
      <div className="container-x hidden items-center justify-between py-2 max-lg:flex">
        <Link href="/" aria-label="Clean360° — на головну">
          <img src="/images/logo.svg" alt="Clean360°" width={86} height={43} className="h-auto w-[86px]" />
        </Link>
        <MobileMenu homeHref={homeHref} />
      </div>
    </header>
  );
}
