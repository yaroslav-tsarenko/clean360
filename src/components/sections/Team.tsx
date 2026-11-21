import team from "@/assets/team.png";
import teamMobile from "@/assets/team-mobile.png";
import { bgImage } from "@/lib/bg";
import { OrderButton } from "@/components/modal/triggers";

export function Team() {
  return (
    <section
      aria-labelledby="team-title"
      className="bg-(image:--bg) bg-cover bg-center bg-no-repeat pt-24 pb-[clamp(420px,55vw,800px)] max-lg:pt-20 max-sm:bg-(image:--bg-mobile) max-sm:bg-contain max-sm:bg-[50%_100%] max-sm:pt-14 max-sm:pb-[290px]"
      style={{
        ["--bg" as string]: bgImage(team, 1920, 80),
        ["--bg-mobile" as string]: bgImage(teamMobile, 566),
      }}
    >
      <div className="container-x flex flex-col items-center justify-center gap-5 text-center max-sm:items-start max-sm:justify-start max-sm:text-left">
        <p className="eyebrow reveal">Clean 360°</p>
        <h2 id="team-title" className="h-section reveal m-0 text-ink">
          Наша <span className="text-brand">команда</span>
        </h2>
        <p className="text-lead reveal mb-3 max-w-[640px]">
          Команда Clean360° — це професіонали, для яких чистота — справжня місія. Усі співробітники проходять навчання та
          володіють необхідними навичками для ефективного й безпечного прибирання. Завдяки злагодженій роботі нашої
          команди, ми гарантуємо високу якість послуг та максимальний комфорт для наших клієнтів. Ви можете бути впевнені –
          ваш простір в надійних руках!
        </p>
        <OrderButton className="btn-primary reveal w-fit max-sm:mx-auto" />
      </div>
    </section>
  );
}
