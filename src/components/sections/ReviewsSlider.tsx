"use client";

/* eslint-disable @next/next/no-img-element */
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import type { Review } from "@/data/content";
import { cn } from "@/lib/cn";

/** Нескінченний слайдер відгуків (свайп, клавіатура, стрілки) — заміна Webflow-слайдера */
export function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "start", duration: 28 });
  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <div
      className="relative h-[300px] max-sm:h-fit"
      role="region"
      aria-roledescription="carousel"
      aria-label="Відгуки клієнтів"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
    >
      <div ref={viewportRef} className="reveal h-full overflow-hidden bg-light">
        <ul className="flex h-full touch-pan-y">
          {reviews.map((r, i) => (
            <li
              key={r.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} з ${reviews.length}`}
              className="mr-[5%] h-full min-w-0 flex-[0_0_30%] max-lg:mr-[6%] max-lg:flex-[0_0_47%] max-sm:mr-0 max-sm:h-[325px] max-sm:flex-[0_0_100%]"
            >
              <figure className="flex h-[300px] flex-col gap-5 rounded-[36px] bg-white p-8 leading-5 transition-shadow duration-500 hover:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.35)] max-sm:h-[325px] max-sm:p-6">
                <figcaption className="flex items-center gap-4">
                  <img src={r.avatar} alt="" width={59} height={59} className="size-[59px] shrink-0" loading="lazy" />
                  <div className="flex flex-col gap-1.5">
                    <p className="m-0 text-[18px] leading-6 font-semibold tracking-[-0.01em] text-ink max-sm:text-[16px]">{r.name}</p>
                    <img
                      src={`/images/stars-${r.stars}.svg`}
                      alt={`Оцінка ${r.stars} з 5`}
                      width={91}
                      height={18}
                      className="w-[91px]"
                      loading="lazy"
                    />
                  </div>
                </figcaption>
                <blockquote className="text-[14px] leading-[1.65] text-muted">{r.text}</blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <ArrowButton direction="left" onClick={prev} className="left-[43%] max-sm:left-[30%] max-sm:mr-2.5" />
      <ArrowButton direction="right" onClick={next} className="left-1/2 max-sm:left-[51%] max-sm:ml-2.5" />
    </div>
  );
}

function ArrowButton({ direction, onClick, className }: { direction: "left" | "right"; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Попередній відгук" : "Наступний відгук"}
      className={cn(
        "group absolute -bottom-[32%] flex size-fit items-center justify-center rounded-full bg-arrow p-[30px] text-white transition-[background-color,scale] duration-300 ease-out-soft hover:bg-brand active:scale-90 max-sm:-bottom-[45%] max-sm:text-[#353535] max-sm:hover:bg-arrow",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn(
          "size-6 transition-transform duration-300",
          direction === "left" ? "group-hover:-translate-x-0.5" : "rotate-180 group-hover:translate-x-0.5",
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        aria-hidden
      >
        <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
