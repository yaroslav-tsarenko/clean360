"use client";

import { useState } from "react";
import { services, type Service } from "@/data/services";
import { bgImage } from "@/lib/bg";
import { cn } from "@/lib/cn";
import { useModal } from "@/components/modal/ModalProvider";
import { OrderButton } from "@/components/modal/triggers";

type Plan = "once" | "subscription";

export function Services() {
  const [plan, setPlan] = useState<Plan>("once");

  return (
    <section aria-labelledby="services-title" className="section-y bg-light">
      <div id="services-section" className="container-x flex flex-col items-center justify-center max-sm:items-start">
        <p className="eyebrow reveal">Послуги</p>
        <h2
          id="services-title"
          className="h-section reveal mt-4 mb-2 text-center leading-[1.15] text-brand max-sm:text-left max-sm:leading-[1.2]"
        >
          <span className="text-ink">Ідеально</span>{" "}
          <span className="rounded-full bg-brand/20 px-4 pb-1">чистий</span> простір{" "}
          <span className="text-ink">
            в<br />
            кожному куточку
          </span>
        </h2>

        <div role="group" aria-label="Тип замовлення" className="reveal mt-8 flex gap-4 max-sm:mt-6 max-sm:w-full max-sm:gap-3">
          {(
            [
              ["once", "Одноразове"],
              ["subscription", "За підпискою"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={plan === value}
              onClick={() => setPlan(value)}
              className={cn(
                "rounded-full px-16 py-[18px] text-[15px] font-medium transition-[background-color,color,box-shadow,transform] duration-300 ease-out-soft active:scale-[0.97] max-sm:flex max-sm:w-full max-sm:items-center max-sm:justify-center max-sm:px-5",
                plan === value
                  ? "bg-dark text-white shadow-[0_8px_24px_-8px_rgb(0_0_0/0.45)]"
                  : "bg-off text-dark hover:bg-white hover:shadow-[0_8px_24px_-12px_rgb(0_0_0/0.25)]",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid w-full grid-cols-3 gap-6 max-lg:grid-cols-2 max-lg:gap-5 max-sm:mt-8 max-sm:grid-cols-1 max-sm:gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} plan={plan} index={i} />
          ))}
        </div>

        <OrderButton className="btn-primary reveal mt-12 w-auto max-sm:mx-auto max-sm:mt-8" />
      </div>
    </section>
  );
}

const bgClass: Record<Service["bg"], string> = {
  cover: "bg-cover bg-center",
  "cover-offset": "bg-cover bg-[55%_58%]",
  "fit-height": "bg-[auto_100%] bg-center bg-no-repeat max-lg:bg-cover",
};

function ServiceCard({ service, plan, index }: { service: Service; plan: Plan; index: number }) {
  const { openService, openOrder } = useModal();
  const price = plan === "subscription" && service.subscriptionPrice ? service.subscriptionPrice : service.price;

  return (
    <article
      style={{ animationDelay: `${(index % 3) * 80}ms` }}
      className={cn(
        "reveal-scale group relative isolate flex h-full min-h-[260px] w-full flex-col gap-8 overflow-hidden rounded-[36px] bg-dark p-8 text-white transition-[box-shadow,translate] duration-500 ease-out-soft hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-20px_rgb(0_0_0/0.55)] max-sm:min-h-[230px] max-sm:p-6",
      )}
    >
      {/* Фон: окремий шар, щоб плавно збільшувати його при наведенні */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 bg-no-repeat transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.06]",
          bgClass[service.bg],
        )}
        style={{ backgroundImage: bgImage(service.image, 640) }}
      />
      {service.shade && <div aria-hidden className="absolute inset-0 -z-10 shadow-[inset_20px_150px_30px_255px_#0003]" />}
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex flex-col gap-[15px]">
        <p className="text-[10px] font-medium tracking-[0.3em] text-white/80">ВИД ПОСЛУГИ</p>
        <h3 className="m-0 text-[24px] leading-[1.2] font-semibold tracking-[-0.015em] max-sm:text-[22px]">
          {service.titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < service.titleLines.length - 1 && <br />}
            </span>
          ))}
        </h3>
      </div>

      <div className="mt-auto flex justify-between gap-2">
        <button
          type="button"
          onClick={() => openService(service.id)}
          aria-haspopup="dialog"
          aria-label={`Детальніше: ${service.name}`}
          className={cn(
            "flex h-fit w-fit rounded-full bg-transparent py-[15px] pr-5 text-white underline underline-offset-2 transition-all duration-300 ease-out-soft hover:bg-off hover:pl-5 hover:text-ink hover:no-underline",
            service.id === "general" ? "pl-2.5" : "pl-0",
          )}
        >
          Детальніше
        </button>
        {price && (
          <button
            type="button"
            onClick={() => openOrder(service.id)}
            aria-haspopup="dialog"
            aria-label={`Замовити: ${service.name}, ${price}`}
            className="flex w-fit items-center justify-center rounded-full bg-brand px-5 py-3 text-[17px] font-semibold whitespace-nowrap text-white transition-[background-color,box-shadow,scale] duration-300 ease-out-soft hover:scale-[1.04] hover:bg-brand-hover hover:shadow-brand active:scale-[0.97] max-sm:text-[15px]"
          >
            <span key={price} className="animate-fade-in">
              {price}
            </span>
          </button>
        )}
      </div>
    </article>
  );
}
