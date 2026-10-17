"use client";

import { useState } from "react";
import {
  Layers,
  Shield,
  Cloud,
  Database,
  Cpu,
  Bot,
  KeyRound,
  CheckCircle2,
  Play,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ArchNode {
  id: string;
  title: string;
  subtitle: string;
  category: "Client" | "Security" | "Cloud" | "AI" | "Data";
  icon: React.ComponentType<{ className?: string }>;
  tech: string[];
  specs: string[];
  securityFeature: string;
}

const ARCH_NODES: ArchNode[] = [
  {
    id: "node-client",
    title: "Web Dashboard",
    subtitle: "Next.js / React frontend",
    category: "Client",
    icon: Cpu,
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    specs: [
      "Dashboards for cloud resources and cost reports",
      "Talks only to the Spring Boot REST APIs",
      "Built with Next.js, React and TypeScript",
    ],
    securityFeature: "Every API call carries a short-lived JWT access token",
  },
  {
    id: "node-auth",
    title: "Auth & Identity Service",
    subtitle: "OAuth 2.0 · JWT · RBAC · SCIM 2.0",
    category: "Security",
    icon: KeyRound,
    tech: ["Spring Security", "OAuth 2.0", "JWT", "SCIM 2.0"],
    specs: [
      "Access and refresh token flow with JWT",
      "Permission-based RBAC checked on every API",
      "SCIM 2.0 user provisioning from Okta and Azure AD",
    ],
    securityFeature: "No hardcoded credentials; short-lived signed tokens",
  },
  {
    id: "node-cloud",
    title: "Multi-Cloud Integration",
    subtitle: "AWS · GCP · Azure SDKs",
    category: "Cloud",
    icon: Cloud,
    tech: ["AWS STS (AssumeRole)", "AWS IAM", "GCP Billing API", "Azure SDK"],
    specs: [
      "Cross-account AWS access through STS AssumeRole",
      "Provider-agnostic billing aggregation for AWS and GCP",
      "Cloud operations automated through provider SDKs",
    ],
    securityFeature: "No static IAM keys: temporary STS credentials only",
  },
  {
    id: "node-ai",
    title: "AI Agents & MCP Servers",
    subtitle: "LangGraph agents with tool access",
    category: "AI",
    icon: Bot,
    tech: ["Python", "LangGraph", "LangChain", "MCP", "FastAPI"],
    specs: [
      "Agents plan and execute multi-step cloud operations",
      "Custom MCP servers expose backend and cloud actions as tools",
      "Agents work through the Spring Boot APIs and cloud services",
    ],
    securityFeature: "OAuth 2.0 / JWT validation on MCP and agent calls",
  },
  {
    id: "node-database",
    title: "Data & ETL",
    subtitle: "MySQL + AWS Glue pipelines",
    category: "Data",
    icon: Database,
    tech: ["MySQL", "AWS Glue", "Glue Crawlers", "Athena"],
    specs: [
      "MySQL as the application database",
      "Glue ETL jobs and crawlers prepare cloud cost data",
      "Athena queries power automated cost reports",
    ],
    securityFeature: "Pipeline access scoped through IAM roles",
  },
];

/**
 * Interactive diagram of the Cloud Alpha platform. `embedded` drops the
 * section chrome so it can sit inside the Experience card as a deep dive.
 */
export function ArchitectureVisualizer({ embedded = false }: { embedded?: boolean }) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("node-cloud");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const selectedNode = ARCH_NODES.find((n) => n.id === selectedNodeId) || ARCH_NODES[0];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    ARCH_NODES.forEach((node, index) => {
      setTimeout(() => {
        setSimStep(index);
        setSelectedNodeId(node.id);
        if (index === ARCH_NODES.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
          }, 1200);
        }
      }, index * 900);
    });
  };

  return (
    <section
      id="architecture"
      className={embedded ? "relative" : "section-padding bg-muted/30 dark:bg-muted/20 relative z-20"}
    >
      <div className={embedded ? "" : "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"}>
        {/* Section Header */}
        <div className={embedded ? "mb-6" : "text-center mb-12"} data-reveal>
          {!embedded && (
            <>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Layers className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Interactive System Design
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                How My <span className="gradient-text">Multi-Cloud Platform</span> Fits Together
              </h2>
            </>
          )}
          <p
            className={`text-sm text-muted-foreground leading-relaxed ${
              embedded ? "" : "sm:text-base max-w-2xl mx-auto"
            }`}
          >
            Click any part of the system, or run the request flow, to see the stack, design decisions and security model behind it.
          </p>

          <div className={`mt-4 flex ${embedded ? "justify-start" : "justify-center"}`}>
            <Button
              id="sim-arch-flow-btn"
              onClick={runSimulation}
              disabled={isSimulating}
              className="gap-2 text-xs font-semibold px-6 py-2 rounded-full border border-primary/40 bg-primary/10 hover:bg-primary/25 text-primary cursor-pointer transition-all duration-300 hover:scale-105 shadow-xs"
            >
              <Play className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
              {isSimulating ? `Tracing Request: Step ${simStep + 1} of ${ARCH_NODES.length}...` : "Simulate End-to-End Request Flow"}
            </Button>
          </div>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Node Pipeline */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3 h-full">
            {ARCH_NODES.map((node, index) => {
              const Icon = node.icon;
              const isSelected = selectedNodeId === node.id;
              const isSimCurrent = isSimulating && simStep === index;

              return (
                <div
                  key={node.id}
                  id={`arch-node-item-${node.id}`}
                  onClick={() => {
                    setSelectedNodeId(node.id);
                  }}
                  className={`flex-1 min-h-[72px] p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between shadow-xs ${
                    isSelected
                      ? "bg-card border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/40 scale-[1.01]"
                      : "bg-card border-border/80 dark:border-white/15 hover:border-primary/50 hover:bg-card"
                  } ${isSimCurrent ? "ring-2 ring-primary bg-primary/10" : ""}`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-semibold">
                          0{index + 1}
                        </span>
                        <h3 className="text-sm font-bold text-foreground">{node.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">{node.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="hidden sm:inline-flex text-[10px] border-primary/30 text-primary bg-primary/5"
                    >
                      {node.category}
                    </Badge>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? "text-primary translate-x-1" : "text-muted-foreground/50"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Node Deep Dive Inspector */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="h-full flex flex-col justify-between rounded-2xl border border-primary/40 dark:border-white/15 bg-card backdrop-blur-xl p-6 shadow-xl space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0 shadow-xs">
                    <selectedNode.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{selectedNode.title}</h3>
                    <p className="text-xs text-primary font-medium">{selectedNode.subtitle}</p>
                  </div>
                </div>
                <Badge className="bg-primary/15 text-primary hover:bg-primary/25 text-[10px] border border-primary/30 shrink-0">
                  {selectedNode.category}
                </Badge>
              </div>

              {/* Technologies */}
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5 font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-primary" /> Stack &amp; Libraries
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs bg-muted/80 dark:bg-muted/60 border border-border/80 text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Architecture Specifications */}
              <div className="flex-1 flex flex-col justify-center my-0.5">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Key Engineering Decisions
                </div>
                <ul className="space-y-1.5">
                  {selectedNode.specs.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Security & Isolation */}
              <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary mb-1">
                  <Shield className="w-3.5 h-3.5" /> Security &amp; Isolation
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedNode.securityFeature}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
