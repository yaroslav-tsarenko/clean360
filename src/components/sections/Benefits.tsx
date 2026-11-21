/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/cn";

const benefits = [
  {
    icon: "/images/icon-clock.svg",
    title: ["Гарантуємо послуги", "в день звернення"],
    text: "Замовили зранку? Вже ввечері ваше приміщення сяє чистотою. Не треба чекати днями — ми працюємо для вас саме тоді, коли це потрібно.",
    dark: false,
  },
  {
    icon: "/images/icon-checkbox.svg",
    title: ["Тільки професійне", "обладнання нового покоління"],
    text: "Та сертифіковані екологічні мийні засоби. Це означає, що ваша оселя чи офіс не тільки чисті, але й безпечні для здоров’я всієї родини, зокрема дітей і домашніх улюбленців.",
    dark: true,
  },
  {
    icon: "/images/icon-checkmark.svg",
    title: ["Чесні та", "прозорі ціни"],
    text: "Вони підходять для будь-якого бюджету. Оптимальне співвідношення ціни та якості — наша філософія, а ваш комфорт і задоволення — наш пріоритет. Чистота більше не розкіш!",
    dark: false,
  },
];

export function Benefits() {
  return (
    <section
      id="benefits-section"
      aria-labelledby="benefits-title"
      className="section-y bg-off max-sm:flex max-sm:h-fit max-sm:flex-col"
    >
      <div className="container-x relative max-sm:flex max-sm:h-fit max-sm:flex-col">
        <p className="eyebrow mb-4 text-center">Переваги</p>

        {/* Скляні декоративні елементи (з backdrop-blur), як в оригіналі */}
        <img src="/images/glass-1.svg" alt="" aria-hidden className="pointer-events-none absolute top-1/2 bottom-0 left-1/4 block backdrop-blur-[13px] max-sm:top-[71%] max-sm:left-[-22%] max-sm:rounded-[55px] motion-safe:animate-float" />
        <img src="/images/glass-3.svg" alt="" aria-hidden className="pointer-events-none absolute top-[7%] right-[5%] h-[200px] w-[100px] backdrop-blur-[5px] max-sm:hidden motion-safe:animate-float motion-safe:[animation-delay:-2s]" />
        <img src="/images/glass-4.svg" alt="" aria-hidden className="pointer-events-none absolute top-[13%] left-[49px] rounded-[35px] backdrop-blur-[5px] max-lg:top-[56%] max-sm:top-[69%] max-sm:right-[30px] max-sm:left-auto motion-safe:animate-float motion-safe:[animation-delay:-4s]" />
        <img src="/images/glass-2.svg" alt="" aria-hidden className="pointer-events-none absolute top-[89%] left-[59%] rounded-[35px] backdrop-blur-[5px] max-sm:top-[41%] max-sm:right-[30px] motion-safe:animate-float motion-safe:[animation-delay:-1s]" />

        <h2
          id="benefits-title"
          className="h-section m-0 flex items-center justify-center gap-3 text-center text-brand max-lg:flex-col max-lg:gap-2"
        >
          <span className="text-ink">Наші переваги</span>
          <span className="flex items-center gap-3 max-lg:w-fit max-lg:rounded-full max-lg:bg-chip max-lg:px-4 max-lg:pt-0.5 max-lg:pb-1.5">
            — ваш <span className="rounded-full bg-chip px-5 pt-0.5 pb-1.5 max-lg:bg-transparent max-lg:p-0">комфорт</span>
          </span>
        </h2>

        <div className="mt-12 grid h-full grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:mt-8 max-sm:grid-cols-1 max-sm:gap-4">
          {benefits.map((b, i) => (
            <article
              key={b.title.join(" ")}
              style={{ animationDelay: `${i * 90}ms` }}
              className={cn(
                "reveal-scale group flex h-[380px] max-h-[380px] flex-col items-stretch justify-center gap-[120px] rounded-[34px] p-8 text-white transition-[transform,box-shadow] duration-500 ease-out-soft hover:-translate-y-2 hover:shadow-[0_24px_48px_-16px_rgb(15_120_139/0.45)] max-lg:h-auto max-lg:max-h-none max-lg:gap-16 max-sm:gap-6 max-sm:p-6",
                b.dark ? "bg-ink hover:shadow-[0_24px_48px_-16px_rgb(0_0_0/0.45)]" : "bg-brand",
              )}
            >
              <img src={b.icon} alt="" width={37} height={37} className="w-[37px] transition-transform duration-500 ease-out-soft group-hover:scale-110 group-hover:-rotate-6" />
              <div className="flex flex-col gap-3">
                <h3 className="m-0 flex text-[20px] leading-[1.35] font-semibold tracking-[-0.01em]">
                  <span>
                    {b.title[0]}
                    <br /> {b.title[1]}
                  </span>
                </h3>
                <p className="text-[14px] leading-[1.6] font-light text-white/85">{b.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
