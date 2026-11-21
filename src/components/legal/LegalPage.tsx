import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

type Props = { title: string; paragraphs: string[] };

/** Спільний шаблон для юридичних сторінок */
export function LegalPage({ title, paragraphs }: Props) {
  return (
    <>
      <Header homeHref="/" />
      <main className="flex flex-col bg-light py-12 max-sm:py-8">
        <article className="container-x flex max-w-[960px] flex-col gap-4">
          <nav aria-label="Хлібні крихти" className="text-[13px] text-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-brand">
                  Головна
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                {title}
              </li>
            </ol>
          </nav>
          <h1 className="h-section my-5 text-ink">{title}</h1>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-lead">
              {p}
            </p>
          ))}
        </article>
        <Link
          href="/"
          className="mx-auto mt-10 flex w-full max-w-[220px] items-center justify-center rounded-full bg-ink px-5 py-[15px] text-center text-white transition-[background-color,translate] duration-200 hover:-translate-y-0.5 hover:bg-[#333]"
        >
          На головну
        </Link>
      </main>
      <Footer homeHref="/" withOrder={false} />
    </>
  );
}
