/* eslint-disable @next/next/no-img-element */
import bgMobile from "@/assets/bg-additional-mobile.png";
import { additionalServices, keysDelivery, type AddService } from "@/data/content";
import { bgImage } from "@/lib/bg";
import { cn } from "@/lib/cn";

function Price({ s, accent = "text-accent" }: { s: AddService; accent?: string }) {
  return (
    <>
      {s.prefix && <>{s.prefix} </>}
      <span className={accent}>{s.price}</span>
      {s.suffix}
    </>
  );
}

export function AdditionalServices() {
  return (
    <section
      aria-labelledby="additional-title"
      className="bg-[url(/images/bg-additional.svg)] bg-cover bg-center bg-no-repeat section-y max-sm:flex max-sm:flex-row max-sm:bg-(image:--bg-mobile) max-sm:bg-contain max-sm:bg-[50%_90%]"
      style={{ ["--bg-mobile" as string]: bgImage(bgMobile, 560) }}
    >
      <div id="prices-section" className="container-x flex flex-col gap-4 max-lg:gap-0">
        <div className="mb-12 flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-0 max-sm:mb-8">
          <div className="reveal flex flex-col gap-4 max-sm:gap-3">
            <p className="eyebrow w-fit">Послуги</p>
            <h2
              id="additional-title"
              className="h-section m-0 w-fit text-brand max-sm:text-ink"
            >
              Додаткові послуги
            </h2>
          </div>
          <p className="text-lead reveal w-full max-w-[465px] max-lg:mt-4"> 
            Ми пропонуємо широкий спектр додаткових послуг, щоб забезпечити максимальний комфорт нашим клієнтам.
            Завжди готові підлаштувати наші послуги під ваші індивідуальні потреби!
          </p>
        </div>

        {/* Десктоп: дві колонки «пілюль» з цінами */}
        <ul className="grid grid-flow-row-dense grid-cols-2 items-center gap-x-8 gap-y-4 max-lg:hidden">
          {additionalServices.map((s, i) => (
            <li key={s.label} className="reveal" style={{ animationDelay: `${(i % 2) * 60}ms` }}>
              <AddServicePill s={s} />
            </li>
          ))}
        </ul>
        <div className="reveal max-lg:hidden">
          <AddServicePill s={keysDelivery} center />
        </div>

        {/* Мобільна версія: горизонтальна прокрутка карток */}
        <ul className="scroll-x-thin hidden snap-x snap-mandatory scroll-px-8 grid-cols-[repeat(3,233px)] gap-4 overflow-x-auto overflow-y-hidden bg-white py-5 max-lg:-mx-8 max-lg:grid max-lg:px-8 max-sm:-mx-5 max-sm:scroll-px-5 max-sm:px-5">
          {additionalServices.map((s) => (
            <li
              key={s.label}
              className="relative flex w-[233px] snap-start flex-col gap-4 rounded-[34px] bg-dark px-5 pt-5 pb-10 text-white max-sm:px-[30px]"
            >
              <p className="mb-2.5 text-center text-[15px] leading-5 font-semibold">{s.label}</p>
              <p className="absolute inset-x-0 top-[70%] mx-auto flex h-fit w-fit items-center justify-center gap-[5px] rounded-full border border-white bg-[#3434348a] px-3.5 py-2 text-[15px] font-semibold whitespace-nowrap backdrop-blur-[5px]">
                <Price s={s} />
              </p>
            </li>
          ))}
        </ul>
        <img src="/images/scrollable.svg" alt="" aria-hidden width={46} height={46} className="mx-auto mt-2.5 hidden w-[46px] max-sm:block motion-safe:animate-pulse" />
      </div>
    </section>
  );
}

function AddServicePill({ s, center }: { s: AddService; center?: boolean }) {
  return (
    <div
      className={cn(
        "group relative flex h-[70px] items-center gap-4 rounded-full bg-dark pr-44 pl-8 text-white transition-[background-color,box-shadow] duration-300 ease-out-soft hover:bg-[#2b2b2b] hover:shadow-[0_16px_32px_-14px_rgb(0_0_0/0.5)]",
        center ? "w-[calc(100%-15px)] justify-center pr-8" : "w-[calc(100%-15px)] justify-between",
      )}
    >
      <p className="flex w-fit items-center justify-center text-[15px] font-semibold">{s.label}</p>
      <p className="absolute top-1/2 right-[-15px] ml-auto w-fit -translate-y-1/2 rounded-full border border-[#7a7a7a] px-6 py-[15px] text-[17px] font-semibold backdrop-blur-[10px] transition-[border-color,translate] duration-300 ease-out-soft group-hover:-translate-x-1 group-hover:border-accent">
        <Price s={s} />
      </p>
    </div>
  );
}
