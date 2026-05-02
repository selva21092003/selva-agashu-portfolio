"use client";

import { GitBranch, Link2, Mail, Phone, ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center hero-gradient"
    >
      {/* Decorative background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-accent/15 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Available badge */}
        <div className="flex justify-center mb-6">
          <Badge
            id="hero-status-badge"
            variant="outline"
            className="px-4 py-1.5 text-xs font-medium border-primary/30 bg-primary/5 text-primary gap-1.5"
          >
            <Sparkles className="h-3 w-3" />
            Available for Backend / Cloud Engineering roles
          </Badge>
        </div>

        {/* Name */}
        <h1
          id="hero-title"
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 animate-fade-in-up"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Selva Agashu</span>
        </h1>

        {/* Role */}
        <p
          id="hero-role"
          className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Backend-focused Software Engineer
        </p>

        {/* Summary */}
        <p
          id="hero-summary"
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Building scalable microservices, secure REST APIs, and cloud-integrated systems
          with <span className="text-primary font-medium">Java</span>,{" "}
          <span className="text-primary font-medium">Spring Boot</span>, and{" "}
          <span className="text-primary font-medium">AWS</span>.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            id="hero-contact-btn"
            size="lg"
            className="glow hover:scale-105 transition-all duration-300 font-semibold px-8"
          >
            <a href="#contact">Get In Touch</a>
          </Button>
          <Button
            id="hero-projects-btn"
            size="lg"
            variant="outline"
            className="hover:scale-105 transition-all duration-300 font-semibold px-8 border-primary/30 hover:border-primary hover:bg-primary/5"
          >
            <a href="#projects">View Projects</a>
          </Button>
        </div>

        {/* Social Links */}
        <div
          className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            id="hero-github-link"
            href="https://github.com/selva21092003"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-border bg-card hover:border-primary hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <GitBranch className="h-4 w-4" />
          </a>
          <a
            id="hero-linkedin-link"
            href="https://www.linkedin.com/in/selva-agashu-051851292/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-border bg-card hover:border-primary hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <Link2 className="h-4 w-4" />
          </a>
          <a
            id="hero-email-link"
            href="mailto:selvaagashu@gmail.com"
            className="w-10 h-10 rounded-full border border-border bg-card hover:border-primary hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            id="hero-phone-link"
            href="tel:+919345839879"
            className="w-10 h-10 rounded-full border border-border bg-card hover:border-primary hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Phone"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Scroll indicator — positioned relative to the section, not the inner content div */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#about"
          id="hero-scroll-indicator"
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          <span className="text-xs font-medium">Scroll down</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
