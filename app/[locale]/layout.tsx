import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "./dictionaries";
import { siteUrl } from "@/lib/json-ld";
import { siteConfig } from "@/lib/content/site-config";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.defaultTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        // Vers quoi pointer un visiteur dont la langue ne correspond a aucune
        // des deux. Sans x-default, Google choisit lui-meme.
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      title: dict.meta.defaultTitle,
      description: dict.meta.description,
      siteName: siteConfig.name,
      url: `/${locale}`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      // Sans images explicites, les crawlers retombent sur og:image, que
      // app/[locale]/opengraph-image.tsx genere deja pour chaque locale.
      card: "summary_large_image",
      title: dict.meta.defaultTitle,
      description: dict.meta.description,
    },
  };
}

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground font-sans"
      >
        {children}
      </body>
    </html>
  );
}
