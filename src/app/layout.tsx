import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Selva Agashu — Backend Engineer (Java · Spring Boot · Cloud · AI Agents)",
  description:
    "Backend Software Engineer building Spring Boot microservices, secure REST APIs, AWS/GCP/Azure integrations, cloud cost ETL pipelines, and AI agents with LangGraph and MCP servers.",
  keywords: [
    "Selva Agashu",
    "Backend Engineer",
    "Software Engineer",
    "Java",
    "Spring Boot",
    "Microservices",
    "Python",
    "LangGraph",
    "MCP Servers",
    "AI Agents",
    "AWS",
    "GCP",
    "Azure",
    "REST APIs",
    "OAuth 2.0",
    "JWT",
    "Portfolio",
  ],
  authors: [{ name: "Selva Agashu", url: "https://github.com/selva21092003" }],
  openGraph: {
    title: "Selva Agashu | Backend Software Engineer",
    description:
      "Backend engineer shipping Spring Boot microservices, multi-cloud integrations, and AI agents with LangGraph and MCP servers.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selva Agashu | Backend Software Engineer",
    description:
      "Spring Boot microservices, AWS/GCP/Azure integrations, and AI agents with MCP servers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
