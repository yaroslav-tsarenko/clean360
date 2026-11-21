import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import data from "@/data/privacy.json";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description: "Політика конфіденційності клінінгової компанії Clean360°: які дані ми збираємо, як їх використовуємо та захищаємо.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: { url: "/privacy-policy", title: "Політика конфіденційності | Clean360°" },
};

export default function PrivacyPolicyPage() {
  return <LegalPage title={data.title} paragraphs={data.paragraphs} />;
}
