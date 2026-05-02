"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FolderOpen, GitBranch, ExternalLink, ChevronRight } from "lucide-react";

const projects = [
  {
    id: "project-multi-cloud",
    title: "Multi-Cloud Cost Monitoring System",
    description:
      "A full-stack cloud observability product with a Next.js dashboard backed by Spring Boot, aggregating and visualizing real-time billing and usage data across AWS and GCP.",
    bullets: [
      "Implemented IAM roles and AWS STS AssumeRole for secure, credential-less cross-account cloud access — eliminating static key exposure.",
      "Designed provider-agnostic RESTful APIs for fetching, normalizing, and aggregating multi-cloud billing metrics, built for extensibility.",
      "Focused on scalability, real-time data ingestion, and security-first design throughout the product architecture.",
    ],
    tags: ["Next.js", "Spring Boot", "AWS STS", "GCP Billing API", "IAM", "REST APIs"],
    github: "https://github.com/selva21092003/cloud-pilot-backend",
    featured: true,
    gradient: "from-blue-500/10 to-purple-500/10",
  },
  {
    id: "project-auth-service",
    title: "Authentication & Authorization Service (SCIM + JWT)",
    description:
      "An enterprise-grade auth product using Spring Security, JWT, and SCIM 2.0-based automated user provisioning, significantly reducing manual onboarding overhead.",
    bullets: [
      "Designed permission-based RBAC authorization for multi-tenant API access with dynamic role evaluation at the API gateway layer.",
      "Implemented full token lifecycle management — issuance, refresh, and revocation — following industry-standard secure storage best practices.",
      "Automated user provisioning via SCIM 2.0 reducing onboarding overhead significantly.",
    ],
    tags: ["Spring Security", "JWT", "SCIM 2.0", "RBAC", "Multi-tenant", "Java"],
    github: "https://github.com/selva21092003/my-spring-security",
    featured: true,
    gradient: "from-green-500/10 to-teal-500/10",
  },
  {
    id: "project-ecommerce",
    title: "Full-Stack E-Commerce Platform",
    description:
      "A complete end-to-end e-commerce product with a Spring Boot backend and React.js + Tailwind CSS responsive frontend covering the full shopping lifecycle.",
    bullets: [
      "Optimized database query patterns and REST API response times, reducing average endpoint latency.",
      "Implemented full user lifecycle: registration, JWT-secured sessions, product browsing, and order placement.",
      "Delivered a complete product catalog, cart, and order workflow backend.",
    ],
    tags: ["Spring Boot", "React.js", "Tailwind CSS", "JWT", "REST APIs", "MySQL"],
    github: "https://github.com/selva21092003/my-e-commerce-application",
    featured: false,
    gradient: "from-orange-500/10 to-red-500/10",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FolderOpen className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Projects
            </span>
          </div>
          <h2 id="projects-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Things I&apos;ve{" "}
            <span className="gradient-text">Built</span>
          </h2>
          <Separator className="w-16 mx-auto bg-primary/30 h-0.5" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              id={project.id}
              className={`card-hover border-border/50 flex flex-col overflow-hidden relative ${project.featured ? "md:col-span-1" : ""
                }`}
            >
              {/* Gradient overlay at top */}
              <div
                className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${project.gradient} opacity-50`}
              />

              <CardHeader className="relative z-10 pb-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 id={`${project.id}-title`} className="font-bold text-base leading-tight flex-1">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Badge className="text-[10px] bg-primary/90 hover:bg-primary shrink-0 mt-0.5">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
                  {project.description}
                </p>
              </CardHeader>

              <CardContent className="relative z-10 flex flex-col flex-1 pt-0">
                {/* Bullets */}
                <ul id={`${project.id}-bullets`} className="space-y-1.5 mb-4 flex-1">
                  {project.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                      <ChevronRight className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div id={`${project.id}-tags`} className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[10px] border-primary/20 text-primary bg-primary/5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  <Button
                    id={`${project.id}-github-btn`}
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs h-8 border-primary/20 hover:border-primary hover:bg-primary/5 cursor-pointer"
                    onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                  >
                    <GitBranch className="h-3.5 w-3.5 mr-1.5" />
                    View Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-10">
          <Button
            id="projects-github-cta"
            variant="outline"
            className="border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
            onClick={() => window.open("https://github.com/selva21092003?tab=repositories", "_blank", "noopener,noreferrer")}
          >
            <GitBranch className="h-4 w-4 mr-2" />
            View All on GitHub
            <ExternalLink className="h-3.5 w-3.5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
