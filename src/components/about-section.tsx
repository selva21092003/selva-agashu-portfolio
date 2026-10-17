"use client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Globe, Shield, Terminal, CheckCircle2, Server, Bot, GraduationCap } from "lucide-react";
import { use3DTilt } from "@/hooks/use-3d-tilt";

const highlights = [
  {
    icon: Server,
    title: "Scalable Microservices",
    description: "Spring Boot microservices and REST APIs built with clean architecture, deployed with Docker and CI/CD.",
    tag: "Backend",
    id: "highlight-performance",
  },
  {
    icon: Shield,
    title: "Secure Auth & Identity",
    description: "OAuth 2.0, JWT with refresh tokens, permission-based RBAC, and SCIM 2.0 provisioning from Okta and Azure AD.",
    tag: "Security",
    id: "highlight-security",
  },
  {
    icon: Globe,
    title: "Multi-Cloud Integration",
    description: "AWS, GCP and Azure automated through provider SDKs, IAM roles and STS AssumeRole, with no static keys.",
    tag: "Cloud",
    id: "highlight-cloud",
  },
  {
    icon: Bot,
    title: "AI Agents & MCP Servers",
    description: "LangGraph / LangChain agents and custom MCP servers that automate multi-step cloud operations.",
    tag: "AI",
    id: "highlight-architecture",
  },
];

export function AboutSection() {
  const tiltCardRef = use3DTilt<HTMLDivElement>({ maxRotation: 6, scale: 1.01 });

  return (
    <section id="about" className="section-padding relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12" data-reveal>
          <div className="flex items-center justify-center gap-2 mb-3">
            <User className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              About &amp; Education
            </span>
          </div>
          <h2 id="about-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Building Cloud Products{" "}
            <span className="gradient-text">End to End</span>
          </h2>
          <Separator className="w-16 mx-auto bg-primary/40 h-0.5" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Bio Story & Engineering Mindset */}
          <div className="lg:col-span-7 flex flex-col h-full" data-reveal>
            <div
              ref={tiltCardRef}
              className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card border border-border/80 dark:border-white/15 shadow-md dark:shadow-xl backdrop-blur-xl space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold">
                  <Terminal className="w-4 h-4" />
                  <span>engineering_profile.json</span>
                </div>

                <p className="text-foreground/90 text-sm sm:text-base leading-relaxed">
                  I am a <span className="text-primary font-semibold">Backend Software Engineer</span> who works across the
                  whole product: <strong className="text-foreground">Spring Boot microservices</strong>,{" "}
                  <strong className="text-foreground">React / Next.js frontends</strong>,{" "}
                  <strong className="text-foreground">multi-cloud integrations</strong>, data pipelines, and{" "}
                  <strong className="text-foreground">AI agents</strong>.
                </p>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  At <span className="text-foreground font-semibold">Cloud Alpha Solutions</span> I designed and built core
                  backend services for an enterprise multi-cloud platform, from design to production: OAuth 2.0 / JWT auth
                  with RBAC, SCIM 2.0 user provisioning, AWS STS cross-account access, AWS Glue ETL jobs for cost reporting,
                  and LangGraph agents backed by custom MCP servers.
                </p>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Outside work I keep my fundamentals sharp: <span className="text-foreground font-medium">600+ DSA problems</span>{" "}
                  solved on GeeksforGeeks, ranked <span className="text-foreground font-medium">#1 in my institute</span>.
                </p>

                {/* Education (merged in from its own section) */}
                <div
                  id="education"
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 rounded-xl bg-muted/50 dark:bg-muted/30 border border-border/60"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground">B.E. Computer Science &amp; Engineering</div>
                    <div className="text-xs text-muted-foreground">
                      Maria College of Engineering and Technology (Anna University) · 2021 – 2025
                    </div>
                  </div>
                  <Badge className="bg-primary text-primary-foreground text-xs shrink-0 self-start sm:self-center">
                    CGPA 8.5 / 10
                  </Badge>
                </div>
              </div>

              {/* Core Tenets */}
              <div className="pt-3 border-t border-border/60 mt-auto">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2.5 font-semibold">
                  Core Engineering Principles:
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  {[
                    "No static cloud keys (IAM roles + STS)",
                    "Idempotent API endpoint design",
                    "Stateless horizontal microservices",
                    "Clean architecture & SOLID",
                  ].map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-foreground/85 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Highlights 3D Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3 h-full" data-reveal>
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="flex-1 flex items-center p-3.5 sm:p-4 rounded-xl border border-border/80 dark:border-white/15 bg-card hover:border-primary/50 shadow-xs hover:shadow-md backdrop-blur-md transition-all duration-300 hover:translate-x-1 group"
                >
                  <div className="flex items-start gap-3.5 w-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 transition-colors shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                        <Badge variant="outline" className="text-[10px] border-primary/30 text-primary bg-primary/5">
                          {item.tag}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
