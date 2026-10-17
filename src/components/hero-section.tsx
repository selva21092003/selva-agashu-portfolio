"use client";

import { useRef } from "react";
import {
  Mail,
  Phone,
  ArrowDown,
  Sparkles,
  ArrowRight,
  Download,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { HeroAvatar } from "@/components/hero-avatar";
import { headlineStats as stats } from "@/lib/metrics";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Ambient accent glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-[560px] h-[560px] rounded-full bg-primary/15 blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[420px] h-[420px] rounded-full bg-primary/10 blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6 backdrop-blur-md animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <Sparkles className="w-3.5 h-3.5" />
              Available for Backend &amp; Cloud Engineering Roles
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 animate-fade-in-up [animation-delay:100ms]">
              Hi, I&apos;m{" "}
              <span className="gradient-text">Selva Agashu</span>
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-foreground/90 mb-4 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up [animation-delay:200ms]">
              Backend engineer building multi-cloud products with Java, Spring Boot &amp; AI agents
            </p>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in-up [animation-delay:300ms]">
              I build cloud products end to end: <span className="text-foreground font-semibold">Spring Boot</span> microservices
              and REST APIs, <span className="text-foreground font-semibold">React / Next.js</span> dashboards,{" "}
              <span className="text-foreground font-semibold">AWS, GCP &amp; Azure</span> integrations, AWS Glue ETL jobs,
              and <span className="text-foreground font-semibold">AI agents</span> with LangGraph and MCP servers.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-9 animate-fade-in-up [animation-delay:400ms]">
              <Button
                id="hero-contact-btn"
                size="lg"
                className="glow hover:scale-105 transition-all duration-300 font-semibold px-6 h-11 cursor-pointer"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <Button
                id="hero-resume-btn"
                size="lg"
                variant="outline"
                className="hover:scale-105 transition-all duration-300 font-semibold px-6 h-11 border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
                onClick={() => {
                  window.open("/selva_agashu_resume.pdf", "_blank", "noopener,noreferrer");
                }}
              >
                <Download className="w-4 h-4 mr-1.5 text-primary" />
                Résumé
              </Button>

              <a
                id="hero-projects-btn"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-1.5 px-2 h-11 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                View projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 animate-fade-in-up [animation-delay:500ms]">
              <span className="text-xs text-muted-foreground">Connect with me</span>
              <span className="hidden sm:block w-px h-4 bg-border" />
              {[
                { id: "hero-github-link", href: "https://github.com/selva21092003", label: "GitHub", icon: GithubIcon },
                { id: "hero-linkedin-link", href: "https://www.linkedin.com/in/selva-agashu-051851292/", label: "LinkedIn", icon: LinkedinIcon },
                { id: "hero-email-link", href: "mailto:selvaagashu@gmail.com", label: "Email", icon: Mail },
                { id: "hero-phone-link", href: "tel:+919345839879", label: "Phone", icon: Phone },
              ].map((social) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={social.label}
                    id={social.id}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="w-10 h-10 rounded-full border border-border bg-card hover:border-primary hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 text-foreground"
                    aria-label={social.label}
                  >
                    <SocialIcon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: 3D avatar */}
          <div className="lg:col-span-5 animate-fade-in-up [animation-delay:300ms]">
            <HeroAvatar />
          </div>
        </div>

        {/* Metrics strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-border animate-fade-in-up [animation-delay:600ms]">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-extrabold gradient-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#experience"
            id="hero-scroll-indicator"
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            <span className="text-[11px] uppercase tracking-widest opacity-70">Explore Portfolio</span>
            <ArrowDown className="h-4 w-4 animate-bounce text-primary" />
          </a>
        </div>
      </div>
    </section>
  );
}
