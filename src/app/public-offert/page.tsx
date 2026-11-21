import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import data from "@/data/offer.json";

export const metadata: Metadata = {
  title: "Договір публічної оферти",
  description: "Договір публічної оферти клінінгової компанії Clean360°: умови надання та оплати клінінгових послуг.",
  alternates: { canonical: "/public-offert" },
  openGraph: { url: "/public-offert", title: "Договір публічної оферти | Clean360°" },
};

export default function PublicOffertPage() {
  return <LegalPage title={data.title} paragraphs={data.paragraphs} />;
}
