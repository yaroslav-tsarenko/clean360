/* eslint-disable @next/next/no-img-element */
import Image, { getImageProps } from "next/image";
import heroBg from "@/assets/hero-bg.png";
import heroMobile from "@/assets/hero-mobile.png";
import { OrderButton } from "@/components/modal/triggers";

const EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function Hero() {
  // Десктопний фон завантажується лише на екранах ≥480px (на мобільних — окреме фото)
  const { props: bg } = getImageProps({ src: heroBg, alt: "", sizes: "100vw", quality: 80 });

  return (
    <section className="relative isolate flex items-center justify-center overflow-hidden bg-light max-sm:bg-[#656565]">
      <picture className="absolute inset-0 -z-10 max-sm:hidden">
        <source media="(min-width: 480px)" srcSet={bg.srcSet} sizes="100vw" />
        <img
          src={EMPTY_GIF}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover object-center animate-fade-in"
        />
      </picture>

      <div className="container-x flex h-full flex-row items-center justify-between gap-16 pt-14 pb-28 max-lg:flex-col max-lg:gap-12 max-lg:pt-10 max-lg:pb-20 max-sm:gap-8 max-sm:bg-light max-sm:px-0 max-sm:pt-6 max-sm:pb-0">
        <div className="flex w-full max-w-[505px] flex-col gap-[18px] max-lg:max-w-none max-lg:items-center max-lg:justify-center max-sm:px-5">
          <p className="eyebrow animate-fade-up max-sm:flex max-sm:justify-center">КЛІНІНГ - СЕРВІС</p>
          <h1
            className="m-0 text-[58px] leading-[1.04] font-semibold tracking-[-0.03em] text-ink animate-fade-up [animation-delay:80ms] max-lg:w-full max-sm:flex max-sm:flex-col max-sm:items-center max-sm:px-2.5 max-sm:text-center max-sm:text-[36px] max-sm:leading-[1.1]"
          >
            Чистота <br className="max-sm:hidden" />
            без компромісів, <br className="max-sm:hidden" />
            <span className="text-brand">на всі 360°</span>
          </h1>
          <p className="mb-2.5 text-[16px] leading-[1.55] font-medium text-gray animate-fade-up [animation-delay:160ms] max-lg:w-full max-sm:text-center">
            <span className="font-bold">
              Замовляйте прибирання вже зараз <br />—
            </span>{" "}
            перетворимо ваш дім на зону <br />
            абсолютної чистоти!
          </p>
          <div className="flex w-[363px] flex-col gap-5 animate-fade-up [animation-delay:240ms] max-lg:w-full max-sm:mx-auto max-sm:w-[266px]">
            <OrderButton />
            <a href="#services-section" className="btn-primary btn-dark">
              Дізнатись ціни
            </a>
          </div>
        </div>

        <div className="flex h-[580px] max-h-[580px] w-full max-w-[720px] min-w-0 items-end justify-center max-lg:h-auto max-lg:max-h-none max-sm:hidden">
          <div className="flex items-stretch gap-4">
            <div className="flex shrink-0 flex-col items-center justify-center gap-4 rounded-[34px] bg-white px-6 pt-8 pb-12 shadow-[0_0_20px_20px_#fff3] animate-fade-up [animation-delay:300ms] transition-transform duration-500 ease-out-soft hover:-translate-y-1.5">
              <img src="/images/discount.svg" alt="" width={38} height={37} />
              <p className="m-0 text-[30px] leading-9 font-semibold tracking-tight text-ink">Бонус</p>
              <p className="flex w-[110px] items-center justify-center text-center text-[14px] leading-5 text-gray">На перше замовлення</p>
            </div>
            <div className="flex w-[clamp(176px,17vw,255px)] flex-col gap-3 rounded-[34px] border border-white bg-[#2c2c2c8f] p-6 backdrop-blur-[8px] animate-fade-up [animation-delay:380ms] transition-transform duration-500 ease-out-soft hover:-translate-y-1.5">
              <p className="m-0 text-[36px] leading-10 font-semibold tracking-tight text-white">98%</p>
              <p className="text-left text-[13px] leading-[1.55] font-light text-white/90">
                наших клієнтів замовляють знову - ми створюємо чистоту, до якої хочеться повертатися
              </p>
              <img src="/images/users.svg" alt="" width={101} height={43} className="w-[101px]" />
            </div>
            <div className="flex w-[clamp(176px,17vw,255px)] flex-col gap-3 rounded-[34px] border border-white bg-[#2c2c2c8f] p-6 backdrop-blur-[8px] animate-fade-up [animation-delay:460ms] transition-transform duration-500 ease-out-soft hover:-translate-y-1.5">
              <div className="flex items-center justify-start gap-[15px] text-white">
                <p className="m-0 text-[36px] leading-10 font-semibold tracking-tight">3</p>
                <p className="text-[15px] leading-5 font-semibold">
                  роки досвіду
                  <br /> спеціалістів
                </p>
              </div>
              <p className="text-left text-[13px] leading-[1.55] font-light text-white/90">
                Наша команда — це експерти з 3-річним досвідом у клінінгу, які працюють для вашого комфорту.
              </p>
              <p className="mt-auto text-[11px] font-medium tracking-[0.32em] text-white/80">CLEAN 360°</p>
            </div>
          </div>
        </div>

        <Image
          src={heroMobile}
          alt="Клінери Clean360° у фірмових фартухах"
          sizes="(max-width: 479px) 100vw, 1px"
          loading="eager"
          className="hidden h-[408px] w-full max-w-[550px] object-cover max-sm:block"
        />
      </div>
    </section>
  );
}
