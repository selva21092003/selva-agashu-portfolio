"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FolderOpen, GitBranch, ExternalLink, ChevronRight, ShieldCheck, Cloud, ShoppingCart, Sparkles, Bot, Lock } from "lucide-react";
import { use3DTilt } from "@/hooks/use-3d-tilt";

interface Project {
  id: string;
  title: string;
  category: "AI & Automation" | "Cloud & Microservices" | "Security & Identity" | "Full-Stack";
  description: string;
  bullets: string[];
  tags: string[];
  /** Public repo, if any — the source button is hidden without one. */
  github?: string;
  featured: boolean;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
}

const projects: Project[] = [
  {
    id: "project-ai-agents",
    title: "AI Agent MCP Platform",
    category: "AI & Automation",
    description:
      "LLM-powered agents that plan and carry out multi-step cloud operations through custom MCP servers and Spring Boot APIs.",
    bullets: [
      "Built agent workflows with LangGraph and LangChain to plan, execute and orchestrate multi-step cloud operations.",
      "Developed custom MCP servers that expose cloud and backend capabilities as secure tools for LLM agents.",
      "Secured MCP and agent traffic with OAuth 2.0 / JWT authentication and token validation.",
    ],
    tags: ["Python", "LangGraph", "LangChain", "MCP", "LLMs", "FastAPI", "Spring Boot"],
    featured: true,
    accent: "from-primary/20 via-primary/10 to-transparent",
    icon: Bot,
  },
  {
    id: "project-multi-cloud",
    title: "Multi-Cloud Cost Monitoring System",
    category: "Cloud & Microservices",
    description:
      "A full-stack cost monitoring platform: a Next.js dashboard over Spring Boot services that aggregate billing data from AWS and GCP.",
    bullets: [
      "Used AWS STS AssumeRole for secure cross-account access without static access keys.",
      "Designed provider-agnostic REST APIs and billing aggregation services that make adding a new cloud straightforward.",
      "Cached historical billing data in Redis, reducing external cloud-API egress costs by 60%.",
    ],
    tags: ["Java", "Spring Boot", "Next.js", "AWS STS", "GCP Billing API", "Redis"],
    github: "https://github.com/selva21092003/cloud-pilot-backend",
    featured: true,
    accent: "from-primary/20 via-primary/10 to-transparent",
    icon: Cloud,
  },
  {
    id: "project-auth-service",
    title: "Auth & SCIM 2.0 Provisioning Service",
    category: "Security & Identity",
    description:
      "An authentication and user-lifecycle service built on Spring Security, JWT and SCIM 2.0 provisioning.",
    bullets: [
      "Permission-based RBAC with tenant-level isolation.",
      "Full token lifecycle: JWT issuance, refresh and revocation.",
      "SCIM 2.0 user lifecycle endpoints for automatic provisioning from identity providers such as Okta and Azure AD.",
    ],
    tags: ["Spring Security", "JWT", "SCIM 2.0", "RBAC", "PostgreSQL"],
    github: "https://github.com/selva21092003/my-spring-security",
    featured: false,
    accent: "from-primary/20 via-primary/10 to-transparent",
    icon: ShieldCheck,
  },
  {
    id: "project-ecommerce",
    title: "E-Commerce Application",
    category: "Full-Stack",
    description:
      "An e-commerce app with a Spring Boot backend and a React frontend covering catalog browsing, cart, inventory and orders.",
    bullets: [
      "Tuned MySQL queries and indexes for the catalog and checkout APIs.",
      "Used transactions and optimistic locking to keep inventory consistent under concurrent orders.",
      "REST endpoints for cart management, JWT authentication and order status workflows.",
    ],
    tags: ["Spring Boot", "React", "Tailwind CSS", "MySQL", "REST APIs"],
    github: "https://github.com/selva21092003/my-e-commerce-application",
    featured: false,
    accent: "from-primary/20 via-primary/10 to-transparent",
    icon: ShoppingCart,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const tiltRef = use3DTilt<HTMLDivElement>({ maxRotation: 6, scale: 1.01 });
  const Icon = project.icon;

  return (
    <div
      ref={tiltRef}
      id={project.id}
      className={`rounded-2xl border border-border/80 dark:border-white/15 bg-card backdrop-blur-xl shadow-md dark:shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 ${
        project.featured ? "md:col-span-1 ring-1 ring-primary/30" : ""
      }`}
    >
      {/* Top Accent Gradient Header */}
      <div className={`h-24 bg-gradient-to-br ${project.accent} p-4 flex items-start justify-between border-b border-border/40`}>
        <div className="w-10 h-10 rounded-xl bg-card border border-border/80 flex items-center justify-center text-primary shadow-xs">
          <Icon className="w-5 h-5" />
        </div>
        {project.featured ? (
          <Badge className="bg-primary text-primary-foreground text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3" /> Featured
          </Badge>
        ) : (
          <Badge variant="outline" className="text-[10px] border-border/80 text-muted-foreground bg-card/80">
            {project.category}
          </Badge>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div>
          <h3 id={`${project.id}-title`} className="font-bold text-lg text-foreground leading-tight">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Architecture Highlights */}
        <div className="flex-1">
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
            Key Architecture Highlights:
          </div>
          <ul id={`${project.id}-bullets`} className="space-y-2">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                <ChevronRight className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div id={`${project.id}-tags`} className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] bg-primary/10 dark:bg-primary/5 text-primary border border-primary/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub Link Button */}
        <div className="pt-2">
          {project.github ? (
            <Button
              id={`${project.id}-github-btn`}
              size="sm"
              variant="outline"
              className="w-full text-xs h-9 border-primary/40 hover:border-primary hover:bg-primary/10 cursor-pointer transition-all"
              onClick={() => {
                window.open(project.github, "_blank", "noopener,noreferrer");
              }}
            >
              <GitBranch className="h-3.5 w-3.5 mr-2 text-primary" />
              Inspect Source Code on GitHub
            </Button>
          ) : (
            <div className="w-full h-9 flex items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5 mr-2" />
              Private repository: walkthrough on request
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "AI & Automation", "Cloud & Microservices", "Security & Identity", "Full-Stack"];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10" data-reveal>
          <div className="flex items-center justify-center gap-2 mb-3">
            <FolderOpen className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Selected Work
            </span>
          </div>
          <h2 id="projects-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            AI agents, multi-cloud tooling and full-stack apps built with Spring Boot, Python and Next.js
          </p>
          <Separator className="w-16 mx-auto bg-primary/40 h-0.5 mt-4" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" data-reveal>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
              }}
              className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                filter === cat
                  ? "bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 scale-105"
                  : "bg-card/70 border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects 3D Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* GitHub Repositories Link */}
        <div className="text-center mt-12" data-reveal>
          <Button
            id="projects-github-cta"
            variant="outline"
            size="lg"
            className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 text-xs cursor-pointer"
            onClick={() => {
              window.open(
                "https://github.com/selva21092003?tab=repositories",
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            <GitBranch className="h-4 w-4 mr-2 text-primary" />
            Explore All Repositories on GitHub
            <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-70" />
          </Button>
        </div>
      </div>
    </section>
  );
}
