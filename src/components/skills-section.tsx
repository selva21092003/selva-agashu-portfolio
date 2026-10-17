"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Code2,
  Server,
  ShieldCheck,
  Cloud,
  Database,
  Layers,
  Sparkles,
  Bot,
} from "lucide-react";
import { use3DTilt } from "@/hooks/use-3d-tilt";

interface SkillItem {
  name: string;
  level: "Advanced" | "Proficient" | "Working Knowledge";
  featured?: boolean;
}

interface SkillGroup {
  id: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  skills: SkillItem[];
}

const skillGroups: SkillGroup[] = [
  {
    id: "skills-backend",
    category: "Backend & Microservices",
    icon: Server,
    description: "Microservices, REST APIs and clean architecture",
    skills: [
      { name: "Java", level: "Advanced", featured: true },
      { name: "Spring Boot", level: "Advanced", featured: true },
      { name: "REST API Design", level: "Advanced", featured: true },
      { name: "Microservices", level: "Proficient", featured: true },
      { name: "Spring Data JPA / Hibernate", level: "Proficient" },
      { name: "Clean Architecture & SOLID", level: "Proficient" },
    ],
  },
  {
    id: "skills-ai",
    category: "AI Agents & Automation",
    icon: Bot,
    description: "LLM agents, MCP servers and Python services",
    skills: [
      { name: "Python", level: "Proficient", featured: true },
      { name: "LangGraph", level: "Proficient", featured: true },
      { name: "LangChain", level: "Proficient" },
      { name: "MCP Servers", level: "Proficient", featured: true },
      { name: "LLM Integration", level: "Proficient" },
      { name: "FastAPI", level: "Working Knowledge" },
    ],
  },
  {
    id: "skills-security",
    category: "Security, Auth & Identity",
    icon: ShieldCheck,
    description: "Authentication, authorization and user provisioning",
    skills: [
      { name: "Spring Security", level: "Advanced", featured: true },
      { name: "OAuth 2.0", level: "Proficient", featured: true },
      { name: "JWT & Refresh Tokens", level: "Advanced" },
      { name: "RBAC", level: "Proficient" },
      { name: "SCIM 2.0", level: "Proficient" },
    ],
  },
  {
    id: "skills-cloud",
    category: "Cloud & DevOps",
    icon: Cloud,
    description: "AWS, GCP and Azure integrations, ETL and containers",
    skills: [
      { name: "AWS IAM & STS AssumeRole", level: "Proficient", featured: true },
      { name: "AWS Glue, Crawlers & Athena", level: "Proficient", featured: true },
      { name: "GCP Cloud Billing API", level: "Proficient" },
      { name: "Azure SDKs", level: "Working Knowledge" },
      { name: "Docker", level: "Proficient", featured: true },
      { name: "CI/CD Pipelines", level: "Proficient" },
      { name: "Kubernetes", level: "Working Knowledge" },
    ],
  },
  {
    id: "skills-data",
    category: "Databases & Caching",
    icon: Database,
    description: "Relational databases and caching",
    skills: [
      { name: "MySQL", level: "Proficient", featured: true },
      { name: "PostgreSQL", level: "Proficient" },
      { name: "Redis", level: "Working Knowledge" },
      { name: "Query Optimization & Indexing", level: "Proficient" },
    ],
  },
  {
    id: "skills-frontend",
    category: "Frontend & Tools",
    icon: Layers,
    description: "Web dashboards and everyday tooling",
    skills: [
      { name: "React / Next.js", level: "Proficient", featured: true },
      { name: "TypeScript / JavaScript", level: "Proficient" },
      { name: "Tailwind CSS", level: "Proficient" },
      { name: "Git & GitHub", level: "Proficient" },
      { name: "Postman", level: "Proficient" },
      { name: "Linux & Shell", level: "Working Knowledge" },
    ],
  },
];

function SkillGroupCard({ group }: { group: SkillGroup }) {
  const tiltRef = use3DTilt<HTMLDivElement>({ maxRotation: 5, scale: 1.01 });
  const Icon = group.icon;

  return (
    <div
      ref={tiltRef}
      id={group.id}
      className="p-6 rounded-2xl border border-border/80 dark:border-white/15 bg-card backdrop-blur-xl shadow-md dark:shadow-xl space-y-4 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 flex flex-col"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-xs">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground leading-tight">
            {group.category}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">{group.description}</p>
        </div>
      </div>

      <Separator className="bg-border/60 dark:bg-white/10" />

      <div className="flex flex-wrap gap-1.5 flex-1 items-start">
        {group.skills.map((skill) => (
          <span
            key={skill.name}
            className={`px-2.5 py-1 rounded-lg text-xs transition-all duration-200 cursor-default flex items-center gap-1 ${
              skill.featured
                ? "bg-primary/10 dark:bg-primary/15 text-primary font-semibold border border-primary/30 hover:bg-primary hover:text-primary-foreground shadow-xs"
                : "bg-muted/80 dark:bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted border border-border/70 dark:border-white/10"
            }`}
          >
            {skill.featured && <Sparkles className="w-2.5 h-2.5 text-primary" />}
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-muted/20 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12" data-reveal>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Tech Stack &amp; Skills
            </span>
          </div>
          <h2 id="skills-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            What I <span className="gradient-text">Work With</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            The tools I use day to day across backend, cloud, AI agents and the frontend
          </p>
          <Separator className="w-16 mx-auto bg-primary/40 h-0.5 mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <SkillGroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
