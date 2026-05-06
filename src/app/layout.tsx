import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Providers } from "@/components/ui/providers";

const siteUrl =
  process.env.NODE_ENV === "production"
    ? "https://postily.com"
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "postily | AI-Powered Marketing & Customer Support Team",
  description:
    "postily is an AI-powered marketing and customer communication platform that acts as an automated marketing and customer service department for your business. Automate content creation, media generation, social media publishing, and customer responses seamlessly.",

  icons: {
    icon: "/assets/images/icon.png",
    shortcut: "/assets/images/Postily-logo.png",
    apple: "/assets/images/Postily-logo.png",
  },

  openGraph: {
    title: "postily | AI-Powered Marketing & Customer Support Team",
    description:
      "Transform your business with postily, the automated AI marketing and customer service platform. Generate content, media, and respond to customers automatically.",
    type: "website",
    url: siteUrl,
    siteName: "postily",
    images: [
      {
        url: "/assets/images/Postily-logo.png",
        width: 1200,
        height: 630,
        alt: "postily Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "postily | AI-Powered Marketing & Customer Support Team",
    description:
      "Automate your marketing and customer support with AI. Content creation, media generation, and social media publishing made simple.",
    images: ["/assets/images/Postily-logo.png"],
  },
};

import { Suspense } from "react";
import RouteLoadingIndicator from "@/components/RouteLoadingIndicator";

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-[#f3f4f8] dark:bg-[#030910] premium-scrollbar darpremium-scrollbar transition-colors">
        <Providers>
          <Suspense fallback={null}>
            <RouteLoadingIndicator>
              {children}
            </RouteLoadingIndicator>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
