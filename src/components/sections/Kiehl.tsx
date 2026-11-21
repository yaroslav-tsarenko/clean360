import Image from "next/image";
import kiehl from "@/assets/kiehl.png";
import { ReadMore } from "./ReadMore";

export function Kiehl() {
  return (
    <section aria-labelledby="kiehl-title" className="section-y bg-off">
      <div className="container-x flex items-center justify-between gap-12 max-lg:flex-col max-lg:gap-10 max-sm:flex-col-reverse max-sm:gap-6">
        <div className="flex max-w-[585px] flex-1 flex-col gap-3 max-lg:max-w-[680px] max-sm:max-w-none">
          <p className="eyebrow reveal">Професійна хімія</p>
          <h2
            id="kiehl-title"
            className="h-section reveal mt-3 mb-3 text-brand max-sm:m-0"
          >
            <span className="rounded-full bg-brand/15 px-5 pb-1">Професійна</span>
            <br />
            <span className="text-ink">німецька хімія Kiehl у нашій роботі</span>
          </h2>
          <p className="text-lead reveal mb-2.5">
            Продукція Kiehl – це сучасні, високоякісні засоби для прибирання, які гарантують ефективність і безпеку.
            Використовуючи хімію цієї марки, ми забезпечуємо ідеальну чистоту без шкоди для здоров’я та навколишнього
            середовища.
          </p>
          <ReadMore>
            Засоби Kiehl мають спеціально розроблені формули для різних типів поверхонь, що дозволяє досягти
            максимальних результатів при мінімальному використанні. Всі продукти сертифіковані і відповідають
            міжнародним стандартам якості, що робить їх надійним вибором для будь-яких клінінгових потреб.
          </ReadMore>
        </div>
        <Image
          src={kiehl}
          alt="Професійна німецька хімія Kiehl для клінінгу"
          sizes="(max-width: 991px) 90vw, 640px"
          className="reveal-scale h-auto w-1/2 max-w-[640px] max-lg:w-full max-lg:max-w-[560px]"
        />
      </div>
    </section>
  );
}
