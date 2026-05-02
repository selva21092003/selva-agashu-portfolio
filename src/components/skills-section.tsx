"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code2 } from "lucide-react";

const skillGroups = [
  {
    id: "skills-languages",
    category: "Languages",
    icon: "⚡",
    skills: ["Java", "JavaScript", "TypeScript"],
  },
  {
    id: "skills-backend",
    category: "Backend",
    icon: "🔧",
    skills: [
      "Spring Boot",
      "Spring Security",
      "REST APIs",
      "Microservices",
      "Distributed Systems",
      "Clean Architecture",
      "SOLID Principles",
    ],
  },
  {
    id: "skills-security",
    category: "Security",
    icon: "🔐",
    skills: [
      "OAuth 2.0",
      "JWT",
      "SCIM 2.0",
      "RBAC",
      "IAM",
      "STS AssumeRole",
      "API Gateway Security",
    ],
  },
  {
    id: "skills-cloud",
    category: "Cloud & DevOps",
    icon: "☁️",
    skills: [
      "AWS (EC2, S3, IAM, STS)",
      "GCP (Billing APIs)",
      "Azure SDK",
      "Docker",
    ],
  },
  {
    id: "skills-frontend",
    category: "Frontend",
    icon: "🎨",
    skills: ["React.js", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    id: "skills-tools",
    category: "Tools & Practices",
    icon: "🛠️",
    skills: [
      "Git",
      "Postman",
      "IntelliJ IDEA",
      "System Design",
      "Service Isolation",
      "Performance Optimization",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Technical Skills
            </span>
          </div>
          <h2 id="skills-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Tools & Technologies I{" "}
            <span className="gradient-text">Work With</span>
          </h2>
          <Separator className="w-16 mx-auto bg-primary/30 h-0.5" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group) => (
            <Card
              key={group.id}
              id={group.id}
              className="card-hover border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-xl">{group.icon}</span>
                  <h3 className="font-bold text-sm uppercase tracking-wide text-foreground">
                    {group.category}
                  </h3>
                </div>
                <Separator className="mb-4 bg-border/60" />
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs font-medium px-2.5 py-1 hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default"
                    >
                      {skill}
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
