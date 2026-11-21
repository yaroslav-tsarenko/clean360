export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.clean360.site").replace(/\/$/, "");

export const site = {
  name: "Clean360°",
  shortName: "Clean360",
  url: SITE_URL,
  title: "Клінінгова компанія Clean360° — професійне прибирання квартир, будинків та офісів",
  description:
    "Клінінг-сервіс Clean360°: генеральне та підтримуюче прибирання, прибирання після ремонту, миття вікон і фасадів, прибирання офісів, хімчистка диванів, матраців і килимів. Професійна хімія Kiehl, виїзд у день звернення.",
  keywords: [
    "клінінг",
    "клінінгова компанія",
    "клінінг-сервіс",
    "прибирання квартир",
    "генеральне прибирання",
    "підтримуюче прибирання",
    "прибирання після ремонту",
    "миття вікон",
    "миття фасадів",
    "прибирання офісів",
    "хімчистка дивану",
    "хімчистка матраців",
    "хімчистка килимів",
    "хімчистка меблів",
    "Clean360",
  ],
  email: "clean360.ua@gmail.com",
  phones: [
    { display: "+38 093 007 72 79", href: "tel:+380930077279", e164: "+380930077279" },
    { display: "+38 098 700 84 37", href: "tel:+380987008437", e164: "+380987008437" },
  ],
  instagram: "https://www.instagram.com/clean360.ua",
  telegram: "https://t.me/clean_360",
} as const;

export const nav = [
  { href: "#benefits-section", label: "Переваги" },
  { href: "#services-section", label: "Послуги" },
  { href: "#prices-section", label: "Ціни" },
  { href: "#testimonials-section", label: "Відгуки" },
] as const;
