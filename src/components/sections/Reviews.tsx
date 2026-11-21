import { reviews } from "@/data/content";
import { ReviewsSlider } from "./ReviewsSlider";

export function Reviews() {
  return (
    <section
      aria-labelledby="reviews-title"
      className="relative bg-light pt-24 pb-[160px] max-lg:pt-20 max-sm:pt-14 max-sm:pb-[200px]"
    >
      <div id="testimonials-section" className="container-x">
        <div className="mb-12 flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-0 max-sm:mb-8">
          <div className="reveal flex flex-col gap-4 max-sm:gap-3">
            <p className="eyebrow w-fit">Відгуки</p>
            <h2
              id="reviews-title"
              className="h-section m-0 w-fit leading-[1.15] text-brand max-sm:text-ink"
            >
              <span className="text-ink">
                Що про нас кажуть
                <br />
              </span>
              <span className="rounded-full bg-chip-alt px-5 pb-1 max-sm:leading-[1.5]">наші клієнти</span>
            </h2>
          </div>
          <p className="text-lead reveal w-full max-w-[465px] max-lg:mt-4">
            Ми пишаємося тим, що наші клієнти довіряють нам свої простори та залишають щирі відгуки про нашу роботу.
            Кожен відгук – це підтвердження нашої відповідальності, професіоналізму та турботи про комфорт. Дізнайтеся, що
            кажуть про “Сlean360°” ті, хто вже оцінив наші послуги!
          </p>
        </div>

        <ReviewsSlider reviews={reviews} />
      </div>
    </section>
  );
}
