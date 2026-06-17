import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Poppins, Nunito } from "next/font/google";
import { locales, Locale, defaultLocale } from "@/i18n/config";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import frMessages from "@/i18n/messages/fr.json";
import enMessages from "@/i18n/messages/en.json";
import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-heading",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <footer className="h-32" style={{ background: "#1D5D2B" }} />,
  ssr: true,
});

const messages = { fr: frMessages, en: enMessages };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1D5D2B",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const msg = messages[locale as Locale] || messages[defaultLocale];
  const baseUrl = "https://www.bonappetit.cd";

  return {
    title: {
      default: msg.metadata.title,
      template: `%s | Bon Appétit RDC`,
    },
    description: msg.metadata.description,
    keywords: msg.metadata.keywords,
    authors: [{ name: "Bon Appétit RDC" }],
    creator: "Bon Appétit RDC",
    publisher: "Bon Appétit RDC",
    metadataBase: new URL(baseUrl),
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: `${baseUrl}/${locale}/`,
      languages: { fr: `${baseUrl}/fr/`, en: `${baseUrl}/en/`, "x-default": `${baseUrl}/fr/` },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${baseUrl}/${locale}/`,
      siteName: "Bon Appétit RDC",
      title: msg.metadata.title,
      description: msg.metadata.description,
    },
    twitter: {
      card: "summary_large_image",
      title: msg.metadata.title,
      description: msg.metadata.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`h-full antialiased ${poppins.variable} ${nunito.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-[#222222]">
        <LanguageProvider initialLocale={locale as Locale}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
