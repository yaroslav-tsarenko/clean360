import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header homeHref="/" />
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-12 px-5 text-center">
        <h1 className="flex flex-col items-center gap-3 text-[55px] leading-tight max-sm:text-[35px]">
          <span className="rounded-full bg-chip px-5 text-brand">404</span>
          Сторінку не знайдено
        </h1>
        <Link href="/" className="btn-primary w-fit px-10">
          На головну
        </Link>
      </main>
    </>
  );
}
