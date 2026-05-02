"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Calendar } from "lucide-react";

const education = [
  {
    id: "edu-be",
    degree: "B.E. in Computer Science & Engineering",
    institution: "Anna University Affiliated College",
    period: "2021 – 2025",
    score: "GPA: 8.5 / 10",
    scoreType: "GPA",
    highlight: true,
  },
  {
    id: "edu-class12",
    degree: "Class 12th",
    institution: "Tamil Nadu State Board",
    period: "2020",
    score: "85%",
    scoreType: "Percentage",
    highlight: false,
  },
  {
    id: "edu-class10",
    degree: "Class 10th",
    institution: "Tamil Nadu State Board",
    period: "2018",
    score: "85%",
    scoreType: "Percentage",
    highlight: false,
  },
];

export function EducationSection() {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Education
            </span>
          </div>
          <h2 id="education-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Academic{" "}
            <span className="gradient-text">Background</span>
          </h2>
          <Separator className="w-16 mx-auto bg-primary/30 h-0.5" />
        </div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={edu.id} id={edu.id} className="relative flex gap-6">
                {/* Timeline dot */}
                <div className="hidden sm:flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      edu.highlight
                        ? "bg-primary text-primary-foreground glow"
                        : "bg-card border-2 border-primary/30 text-primary"
                    }`}
                  >
                    <GraduationCap className="h-5 w-5" />
                  </div>
                </div>

                {/* Card */}
                <Card
                  className={`card-hover flex-1 border-border/50 ${
                    edu.highlight ? "border-primary/30 bg-primary/5" : "bg-card/50"
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h3 id={`${edu.id}-degree`} className="font-bold text-base">
                          {edu.degree}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-0.5">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{edu.period}</span>
                        </div>
                        <Badge
                          id={`${edu.id}-score`}
                          className={
                            edu.highlight
                              ? "bg-primary/90 hover:bg-primary text-primary-foreground text-xs"
                              : "bg-secondary text-secondary-foreground text-xs"
                          }
                        >
                          {edu.score}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
