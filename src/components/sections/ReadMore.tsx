"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** На мобільних ховає другий абзац під «Читати більше» (текст завжди в HTML — для SEO) */
export function ReadMore({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        id="kiehl-more"
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-out-soft sm:grid-rows-[1fr] sm:opacity-100",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <p className="text-lead mb-2.5 overflow-hidden">{children}</p>
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="kiehl-more"
        onClick={() => setOpen((v) => !v)}
        className="hidden w-fit bg-transparent p-0 font-bold text-ink underline underline-offset-2 transition-colors hover:text-brand max-sm:flex"
      >
        {open ? "Читати менше" : "Читати більше"}
      </button>
    </>
  );
}
