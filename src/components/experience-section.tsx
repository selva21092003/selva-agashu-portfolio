"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

const experience = [
  {
    id: "exp-cloud-alpha",
    role: "Software Engineer",
    company: "Cloud Alpha Solutions",
    period: "June 2025 – Present",
    type: "Full-time",
    bullets: [
      "Architected and delivered ~50% of core backend services from scratch for an enterprise multi-cloud platform, owning the full lifecycle from design to production deployment.",
      "Engineered Spring Boot microservices following clean architecture and SOLID principles, improving system scalability by 40% and significantly reducing inter-service coupling.",
      "Built and hardened production REST APIs with comprehensive input validation and centralized exception handling, cutting runtime API errors by 30%.",
      "Implemented OAuth 2.0 + JWT-based authentication with token refresh and revocation flows, securing all inter-service API communication.",
      "Designed fine-grained, permission-based authorization (RBAC) enabling role and resource-level access control across enterprise APIs.",
      "Integrated backend services with AWS, GCP, and Azure SDKs to automate cloud resource provisioning workflows; leveraged IAM roles and STS AssumeRole for secure cross-account access.",
      "Built a multi-cloud cost monitoring system (Next.js + Spring Boot): designed aggregation APIs for real-time AWS & GCP billing data.",
      "Collaborated on a microfrontend architecture, defining secure communication contracts between frontend modules and backend microservices.",
    ],
    tags: ["Java", "Spring Boot", "OAuth 2.0", "JWT", "RBAC", "AWS", "GCP", "Azure", "Microservices"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Work Experience
            </span>
          </div>
          <h2 id="experience-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Software Product{" "}
            <span className="gradient-text">Development</span>
          </h2>
          <Separator className="w-16 mx-auto bg-primary/30 h-0.5" />
        </div>

        <div className="space-y-6">
          {experience.map((job) => (
            <Card
              key={job.id}
              id={job.id}
              className="card-hover border-border/50 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-primary via-accent-foreground/50 to-transparent" />
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 id={`${job.id}-role`} className="text-xl font-bold">{job.role}</h3>
                    <p className="text-primary font-semibold mt-0.5">{job.company}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{job.period}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs w-fit">
                      {job.type}
                    </Badge>
                  </div>
                </div>

                {/* Bullets */}
                <ul id={`${job.id}-bullets`} className="space-y-2.5 mb-6">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div id={`${job.id}-tags`} className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
