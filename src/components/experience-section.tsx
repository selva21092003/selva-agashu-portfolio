"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Calendar, ChevronRight, ChevronDown, Building, Shield, Cloud, Server, Bot, Layers } from "lucide-react";
import { ArchitectureVisualizer } from "@/components/architecture-visualizer";

const experience = [
  {
    id: "exp-cloud-alpha",
    role: "Software Engineer",
    company: "Cloud Alpha Solutions",
    location: "Enterprise Cloud Engineering",
    period: "June 2025 – Present",
    type: "Full-time",
    metrics: [
      { label: "Scalability Boost", val: "40%" },
      { label: "Runtime Error Cut", val: "30%" },
    ],
    pillars: [
      {
        category: "Microservices & REST APIs",
        icon: Server,
        bullets: [
          "Architected and delivered about half of the core backend services for an enterprise multi-cloud platform, improving scalability by 40% with Spring Boot microservices and clean architecture.",
          "Added centralized exception handling, request validation and standardized DTO contracts across the REST APIs, cutting runtime API errors by 30%.",
        ],
      },
      {
        category: "Security, Auth & Identity",
        icon: Shield,
        bullets: [
          "Implemented OAuth 2.0 / JWT authentication with refresh tokens, permission-based RBAC, and SCIM 2.0 provisioning from Okta and Azure AD.",
          "Secured inter-service communication and enforced tenant- and resource-level access across the platform's APIs.",
        ],
      },
      {
        category: "Multi-Cloud, Data & DevOps",
        icon: Cloud,
        bullets: [
          "Integrated AWS, GCP and Azure services through provider SDKs, using IAM roles and STS AssumeRole for cross-account access without static keys.",
          "Built ETL pipelines with AWS Glue, Crawlers, Athena and MySQL for automated cloud cost reporting.",
          "Containerized services with Docker and set up CI/CD deployment pipelines.",
        ],
      },
      {
        category: "AI Agents & MCP Servers",
        icon: Bot,
        bullets: [
          "Developed AI agent workflows in Python with LangGraph and LangChain, connecting LLMs to backend APIs and cloud services to automate cloud operations.",
          "Built custom Model Context Protocol (MCP) servers that securely expose backend and cloud capabilities as tools for AI agents.",
        ],
      },
    ],
    tags: [
      "Java",
      "Spring Boot",
      "Python",
      "LangGraph",
      "MCP",
      "OAuth 2.0",
      "JWT",
      "RBAC",
      "SCIM 2.0",
      "AWS",
      "GCP",
      "Azure",
      "AWS Glue",
      "MySQL",
      "Docker",
    ],
  },
];

export function ExperienceSection() {
  const [showDetails, setShowDetails] = useState(false);
  const [showArch, setShowArch] = useState(false);

  // The command palette's "Architecture" entry opens the deep dive from anywhere.
  useEffect(() => {
    const open = () => {
      setShowArch(true);
      setTimeout(() => {
        document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    };
    window.addEventListener("open-architecture", open);
    return () => window.removeEventListener("open-architecture", open);
  }, []);

  return (
    <section id="experience" className="section-padding bg-muted/20 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12" data-reveal>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Career Trajectory
            </span>
          </div>
          <h2 id="experience-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Production Software <span className="gradient-text">Engineering</span>
          </h2>
          <Separator className="w-16 mx-auto bg-primary/40 h-0.5" />
        </div>

        <div className="space-y-8">
          {experience.map((job) => (
            <div
              key={job.id}
              id={job.id}
              className="rounded-2xl border border-border/80 dark:border-white/15 bg-card backdrop-blur-xl shadow-md dark:shadow-xl overflow-hidden"
              data-reveal
            >
              {/* Top Accent Gradient Line */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-primary/60 to-primary" />

              <div className="p-6 sm:p-8 space-y-6">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-border/60 pb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                      <h3 id={`${job.id}-role`} className="text-xl sm:text-2xl font-extrabold text-foreground">
                        {job.role}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      <Building className="w-4 h-4" />
                      <span>{job.company}</span>
                      <span className="text-muted-foreground font-normal">• {job.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/80 dark:bg-muted/60 px-3 py-1 rounded-full border border-border/80 dark:border-white/10">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{job.period}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/30">
                      {job.type}
                    </Badge>
                  </div>
                </div>

                {/* Impact Stat Badges */}
                <div className="grid grid-cols-2 gap-3">
                  {job.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-muted/60 dark:bg-muted/60 border border-border/70 dark:border-white/10 text-center shadow-xs">
                      <div className="text-xl font-bold gradient-text">{m.val}</div>
                      <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Categorized Impact Pillars */}
                <div className="space-y-5">
                  {job.pillars.map((pillar, idx) => {
                    const PillarIcon = pillar.icon;
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                          <PillarIcon className="w-4 h-4" />
                          <span>{pillar.category}</span>
                        </div>
                        <ul className="space-y-2 pl-1">
                          {(showDetails ? pillar.bullets : pillar.bullets.slice(0, 1)).map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Expand / deep-dive toggles */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    id={`${job.id}-details-btn`}
                    variant="outline"
                    size="sm"
                    aria-expanded={showDetails}
                    className="text-xs border-primary/40 hover:border-primary hover:bg-primary/10 cursor-pointer"
                    onClick={() => {
                      setShowDetails((v) => !v);
                    }}
                  >
                    {showDetails
                      ? "Show less"
                      : `Show details (${job.pillars.reduce((n, p) => n + p.bullets.length - 1, 0)} more)`}
                    <ChevronDown className={`h-3.5 w-3.5 ml-1.5 transition-transform ${showDetails ? "rotate-180" : ""}`} />
                  </Button>
                  <Button
                    id={`${job.id}-architecture-btn`}
                    variant="outline"
                    size="sm"
                    aria-expanded={showArch}
                    className="text-xs border-primary/40 hover:border-primary hover:bg-primary/10 cursor-pointer"
                    onClick={() => {
                      setShowArch((v) => !v);
                    }}
                  >
                    <Layers className="h-3.5 w-3.5 mr-1.5 text-primary" />
                    {showArch ? "Hide platform architecture" : "Explore the platform architecture"}
                  </Button>
                </div>

                {showArch && (
                  <div className="pt-6 border-t border-border/60">
                    <ArchitectureVisualizer embedded />
                  </div>
                )}

                {/* Tech Tags */}
                <div className="pt-4 border-t border-border/60">
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
                    Technologies &amp; Tools Used:
                  </div>
                  <div id={`${job.id}-tags`} className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-primary/30 text-primary bg-primary/10 dark:bg-primary/5 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
