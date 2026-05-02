"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Zap, Globe, Shield } from "lucide-react";

const highlights = [
  {
    icon: Zap,
    title: "Performance-First",
    description: "40% scalability improvement via clean microservices architecture",
    id: "highlight-performance",
  },
  {
    icon: Shield,
    title: "Security-Minded",
    description: "OAuth 2.0, JWT, RBAC, SCIM 2.0 — end-to-end secured APIs",
    id: "highlight-security",
  },
  {
    icon: Globe,
    title: "Multi-Cloud",
    description: "Hands-on AWS, GCP & Azure SDK integrations in production",
    id: "highlight-cloud",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <User className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              About Me
            </span>
          </div>
          <h2 id="about-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Crafting robust backends that{" "}
            <span className="gradient-text">scale</span>
          </h2>
          <Separator className="w-16 mx-auto bg-primary/30 h-0.5" />
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Bio Text */}
          <div id="about-bio" className="lg:col-span-3 space-y-4">
            <p className="text-muted-foreground text-base leading-relaxed">
              I&apos;m a <span className="text-foreground font-semibold">Backend-focused Software Engineer</span> with
              hands-on production experience building enterprise-grade platforms. I specialize in
              designing scalable microservices, crafting hardened REST APIs, and integrating complex
              cloud workflows.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              At <span className="text-primary font-semibold">Cloud Alpha Solutions</span>, I architected ~50%
              of core backend services from scratch for a multi-cloud enterprise platform — owning the
              full lifecycle from design to production deployment. I care deeply about{" "}
              <span className="text-foreground font-semibold">clean architecture</span>,{" "}
              <span className="text-foreground font-semibold">security-first engineering</span>, and{" "}
              <span className="text-foreground font-semibold">system scalability</span>.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              I hold a B.E. in Computer Science &amp; Engineering (GPA: 8.5/10) and am actively seeking
              backend / cloud engineering roles at product-based companies where I can drive real impact.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: "50%", label: "Core services built from scratch", id: "stat-services" },
                { value: "40%", label: "System scalability improvement", id: "stat-scalability" },
                { value: "30%", label: "Runtime API error reduction", id: "stat-errors" },
              ].map((stat) => (
                <div
                  key={stat.id}
                  id={stat.id}
                  className="text-center p-4 rounded-xl bg-card border border-border"
                >
                  <div className="text-2xl font-extrabold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlight Cards */}
          <div id="about-highlights" className="lg:col-span-2 space-y-4">
            {highlights.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                className="card-hover border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
