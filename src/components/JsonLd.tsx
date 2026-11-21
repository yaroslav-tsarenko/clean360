import { services } from "@/data/services";
import { site } from "@/lib/site";

/** Структуровані дані Schema.org: організація, сайт, каталог послуг з цінами */
export function JsonLd() {
  const businessId = `${site.url}/#business`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": businessId,
        name: site.name,
        alternateName: ["Clean360", "Clean 360", "Клін 360"],
        description: site.description,
        url: site.url,
        logo: `${site.url}/images/logo.svg`,
        image: `${site.url}/opengraph-image.jpg`,
        email: site.email,
        telephone: site.phones[0].e164,
        contactPoint: site.phones.map((p) => ({
          "@type": "ContactPoint",
          telephone: p.e164,
          contactType: "customer service",
          availableLanguage: ["uk", "ru"],
          areaServed: "UA",
        })),
        sameAs: [site.instagram, site.telegram],
        areaServed: { "@type": "Country", name: "Україна" },
        priceRange: "₴₴",
        currenciesAccepted: "UAH",
        knowsAbout: ["Клінінг", "Прибирання після ремонту", "Хімчистка меблів", "Миття вікон"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Клінінгові послуги",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            priceCurrency: "UAH",
            ...(s.priceFrom
              ? {
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: s.priceFrom,
                    minPrice: s.priceFrom,
                    priceCurrency: "UAH",
                    ...(s.priceUnit ? { unitText: s.priceUnit } : {}),
                  },
                }
              : {}),
            itemOffered: {
              "@type": "Service",
              name: s.name,
              description: s.description,
              serviceType: s.name,
              provider: { "@id": businessId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "uk-UA",
        publisher: { "@id": businessId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Екрануємо "<", щоб уникнути XSS через вміст JSON
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
