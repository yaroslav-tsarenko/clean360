/* eslint-disable @next/next/no-img-element */
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type Props = { variant: "dark" | "white"; className?: string; size?: number };

export function Socials({ variant, className, size = 30 }: Props) {
  const links = [
    { href: site.instagram, label: "Instagram Clean360°", icon: `/images/inst-${variant}.svg`, external: true },
    { href: site.telegram, label: "Telegram Clean360°", icon: `/images/tg-${variant}.svg`, external: true },
    { href: `mailto:${site.email}`, label: `Написати на ${site.email}`, icon: `/images/email-${variant}.svg`, external: false },
  ];
  return (
    <div className={cn("flex items-center", className)}>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          aria-label={l.label}
          {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-flex transition-transform duration-300 ease-out-soft hover:-translate-y-0.5 hover:scale-110"
        >
          <img src={l.icon} alt="" width={size} height={size} style={variant === "dark" ? { width: size, height: size } : undefined} />
        </a>
      ))}
    </div>
  );
}
