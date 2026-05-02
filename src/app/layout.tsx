import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Selva Agashu | Backend Software Engineer",
  description:
    "Backend-focused Software Engineer specializing in scalable microservices, secure REST APIs, OAuth 2.0, JWT, and multi-cloud integrations (AWS, GCP, Azure) using Java and Spring Boot.",
  keywords: [
    "Selva Agashu",
    "Backend Engineer",
    "Software Engineer",
    "Java",
    "Spring Boot",
    "Microservices",
    "AWS",
    "GCP",
    "Cloud Engineer",
    "REST APIs",
    "OAuth 2.0",
    "JWT",
    "Portfolio",
  ],
  authors: [{ name: "Selva Agashu", url: "https://github.com/selvaagashu" }],
  openGraph: {
    title: "Selva Agashu | Backend Software Engineer",
    description:
      "Backend-focused Software Engineer with production experience in Spring Boot microservices, cloud integrations, and security-first engineering.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selva Agashu | Backend Software Engineer",
    description:
      "Building scalable microservices and cloud-integrated systems with Java, Spring Boot, and AWS.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
