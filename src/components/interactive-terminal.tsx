"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Terminal as TerminalIcon,
  Sparkles,
  CornerDownLeft,
  RotateCcw,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import { headlineStats } from "@/lib/metrics";
import { Separator } from "@/components/ui/separator";

interface CommandOutput {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fullscreenInputRef = useRef<HTMLInputElement>(null);
  const inlineScrollRef = useRef<HTMLDivElement>(null);
  const fullscreenScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initialLog: CommandOutput[] = [
    {
      command: "welcome",
      timestamp: "00:00:01",
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-primary font-bold">
            ⚡ Welcome to Selva Agashu&apos;s Interactive Backend Shell v2.4
          </p>
          <p className="text-slate-600 dark:text-muted-foreground">
            Type <span className="text-primary font-semibold underline decoration-primary/40">help</span> to explore available commands or click the interactive quick actions below.
          </p>
        </div>
      ),
    },
  ];

  const [logs, setLogs] = useState<CommandOutput[]>(initialLog);

  // Auto-scroll ONLY inside the terminal container itself without scrolling the outer page
  useEffect(() => {
    const targetEl = isExpanded ? fullscreenScrollRef.current : inlineScrollRef.current;
    if (targetEl) {
      targetEl.scrollTo({
        top: targetEl.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [logs, isExpanded]);

  // Lock body scroll when terminal is in full screen mode & support ESC key to minimize
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsExpanded(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isExpanded]);

  const handleCommand = useCallback(
    (cmdRaw: string) => {
      const cmd = cmdRaw.trim().toLowerCase();
      if (!cmd) return;

      const time = new Date().toLocaleTimeString();
      let output: React.ReactNode = null;

      switch (cmd) {
        case "help":
          output = (
            <div className="space-y-1.5 text-xs">
              <p className="text-primary font-semibold">Available system commands:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-600 dark:text-muted-foreground">
                <div>
                  <span className="text-slate-900 dark:text-foreground font-mono font-semibold">whoami</span> - Engineer bio &amp; background
                </div>
                <div>
                  <span className="text-slate-900 dark:text-foreground font-mono font-semibold">skills</span> - Stack &amp; technologies matrix
                </div>
                <div>
                  <span className="text-slate-900 dark:text-foreground font-mono font-semibold">projects</span> - Featured projects &amp; repos
                </div>
                <div>
                  <span className="text-slate-900 dark:text-foreground font-mono font-semibold">experience</span> - Cloud Alpha Solutions role
                </div>
                <div>
                  <span className="text-slate-900 dark:text-foreground font-mono font-semibold">metrics</span> - Key engineering impact numbers
                </div>
                <div>
                  <span className="text-slate-900 dark:text-foreground font-mono font-semibold">architecture</span> - ASCII platform architecture
                </div>
                <div>
                  <span className="text-slate-900 dark:text-foreground font-mono font-semibold">contact</span> - Email, Phone, LinkedIn, GitHub
                </div>
                <div>
                  <span className="text-slate-900 dark:text-foreground font-mono font-semibold">matrix</span> - Toggle cybernetic matrix mode
                </div>
                <div>
                  <span className="text-slate-900 dark:text-foreground font-mono font-semibold">clear</span> - Clear terminal logs
                </div>
              </div>
            </div>
          );
          break;

        case "whoami":
          output = (
            <div className="space-y-1 text-xs text-slate-600 dark:text-muted-foreground">
              <p className="text-slate-900 dark:text-foreground font-semibold">
                👤 Selva Agashu — Backend-focused Software Engineer
              </p>
              <p>
                📍 Location: India | Education: B.E. Computer Science &amp; Engineering
              </p>
              <p>
                🎯 Focus: Spring Boot microservices, OAuth 2.0 / JWT / SCIM auth, AWS · GCP · Azure integrations, Glue ETL jobs, and AI agents with LangGraph + MCP servers.
              </p>
            </div>
          );
          break;

        case "skills":
          output = (
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-muted-foreground">
              <p className="text-primary font-semibold">🚀 Technical Proficiencies:</p>
              <p>
                <strong className="text-slate-900 dark:text-foreground">Backend:</strong> Java, Spring Boot, Spring Security, Spring Data JPA, Microservices, REST APIs.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-foreground">AI:</strong> Python, LangGraph, LangChain, MCP servers, LLM integration, FastAPI.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-foreground">Cloud &amp; DevOps:</strong> AWS (IAM, STS AssumeRole, Glue, Athena), GCP (Cloud Billing API), Azure SDKs, Docker, Kubernetes, CI/CD.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-foreground">Security:</strong> OAuth 2.0, JWT &amp; refresh tokens, RBAC, SCIM 2.0.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-foreground">Data &amp; Frontend:</strong> MySQL, PostgreSQL, Redis · React, Next.js, TypeScript.
              </p>
            </div>
          );
          break;

        case "projects":
          output = (
            <div className="space-y-2 text-xs">
              <p className="text-primary font-semibold">📦 Featured Projects:</p>
              <div className="border-l-2 border-primary/60 pl-2 space-y-1">
                <p className="text-slate-900 dark:text-foreground font-semibold">1. AI Agent MCP Platform</p>
                <p className="text-slate-600 dark:text-muted-foreground">Python + LangGraph agents + custom MCP servers + Spring Boot APIs (private repo).</p>
              </div>
              <div className="border-l-2 border-primary/60 pl-2 space-y-1">
                <p className="text-slate-900 dark:text-foreground font-semibold">2. Multi-Cloud Cost Monitoring System</p>
                <p className="text-slate-600 dark:text-muted-foreground">Next.js + Spring Boot + AWS STS AssumeRole + GCP Billing API.</p>
                <a
                  href="https://github.com/selva21092003/cloud-pilot-backend"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  → View GitHub Repo
                </a>
              </div>
              <div className="border-l-2 border-primary/60 pl-2 space-y-1">
                <p className="text-slate-900 dark:text-foreground font-semibold">3. Auth &amp; SCIM 2.0 Provisioning Service</p>
                <p className="text-slate-600 dark:text-muted-foreground">Spring Security + JWT + RBAC + SCIM 2.0 user lifecycle.</p>
                <a
                  href="https://github.com/selva21092003/my-spring-security"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  → View GitHub Repo
                </a>
              </div>
            </div>
          );
          break;

        case "experience":
          output = (
            <div className="space-y-1 text-xs text-slate-600 dark:text-muted-foreground">
              <p className="text-slate-900 dark:text-foreground font-semibold">
                💼 Cloud Alpha Solutions — Software Engineer
              </p>
              <p>
                • Architected about half of the core backend services for an enterprise multi-cloud platform.
              </p>
              <p>
                • Integrated AWS, GCP &amp; Azure with IAM roles and STS AssumeRole (no static keys).
              </p>
              <p>
                • Implemented OAuth 2.0 / JWT auth, RBAC and SCIM 2.0 user provisioning.
              </p>
              <p>
                • Built LangGraph AI agents, custom MCP servers and AWS Glue cost-reporting ETL.
              </p>
            </div>
          );
          break;

        case "metrics":
          output = (
            <div className="grid grid-cols-2 gap-2 text-xs">
              {headlineStats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-2 rounded-lg bg-white dark:bg-muted/40 border border-slate-200 dark:border-border/40 shadow-xs"
                >
                  <div className="text-lg font-bold text-primary">{stat.value}</div>
                  <div className="text-slate-600 dark:text-muted-foreground text-[10px]">{stat.label}</div>
                </div>
              ))}
            </div>
          );
          break;

        case "architecture":
          output = (
            <pre className="font-mono text-[10px] text-primary leading-tight overflow-x-auto p-2.5 bg-white dark:bg-black/40 rounded-lg border border-slate-200 dark:border-primary/20 shadow-xs">
{`+-------------+     +----------------------+     +--------------------+
| Next.js UI  | --> | Spring Boot services | --> | Auth: OAuth2 / JWT |
+-------------+     +----------------------+     | RBAC, SCIM 2.0     |
                        |              |          +--------------------+
                        v              v
          +-------------------+   +------------------------+
          | Multi-cloud SDKs  |   | AI agents (LangGraph)  |
          | AWS STS/GCP/Azure |   | + custom MCP servers   |
          +-------------------+   +------------------------+
                        |
                        v
          +----------------------------+
          | MySQL + AWS Glue / Athena  |
          +----------------------------+`}
            </pre>
          );
          break;

        case "contact":
          output = (
            <div className="space-y-1 text-xs text-slate-600 dark:text-muted-foreground">
              <p className="text-primary font-semibold">📬 Get in touch:</p>
              <p>Email: <a href="mailto:selvaagashu@gmail.com" className="text-slate-900 dark:text-foreground font-medium hover:underline">selvaagashu@gmail.com</a></p>
              <p>Phone: <a href="tel:+919345839879" className="text-slate-900 dark:text-foreground font-medium hover:underline">+91 9345839879</a></p>
              <p>LinkedIn: <a href="https://www.linkedin.com/in/selva-agashu-051851292/" target="_blank" rel="noreferrer" className="text-slate-900 dark:text-foreground font-medium hover:underline">linkedin.com/in/selva-agashu-051851292</a></p>
              <p>GitHub: <a href="https://github.com/selva21092003" target="_blank" rel="noreferrer" className="text-slate-900 dark:text-foreground font-medium hover:underline">github.com/selva21092003</a></p>
            </div>
          );
          break;

        case "matrix":
          setMatrixActive((prev) => !prev);
          output = <p className="text-primary font-mono text-xs font-semibold">🟢 Matrix mode toggled.</p>;
          break;

        case "clear":
          setLogs([]);
          return;

        case "sudo":
          output = <p className="text-destructive font-mono text-xs">Nice try! Password prompt denied: User is already backend root engineer.</p>;
          break;

        default:
          output = (
            <p className="text-destructive text-xs">
              Command not recognized: &quot;{cmdRaw}&quot;. Type <span className="underline">help</span> for a list of commands.
            </p>
          );
      }

      setLogs((prev) => [...prev, { command: cmdRaw, output, timestamp: time }]);
      setHistory((prev) => [...prev, cmdRaw]);
      setHistoryIndex(-1);
    },
    []
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  // Shared Terminal JSX Content with Guaranteed Fixed Height and Clean Scrollbar
  const renderTerminalBody = (expanded: boolean) => {
    const scrollContainerRef = expanded ? fullscreenScrollRef : inlineScrollRef;
    const activeInputRef = expanded ? fullscreenInputRef : inputRef;

    return (
      <div
        className={`transition-all duration-300 flex flex-col ${
          expanded
            ? "w-full h-full rounded-2xl border border-slate-300 dark:border-white/15 bg-slate-50/98 dark:bg-[#0f1422] shadow-2xl backdrop-blur-2xl overflow-hidden"
            : "relative h-[480px] sm:h-[520px] rounded-2xl border border-slate-300 dark:border-white/15 bg-slate-50/95 dark:bg-[#0f1422] backdrop-blur-xl shadow-xl dark:shadow-2xl overflow-hidden"
        } ${matrixActive ? "border-primary/60 shadow-primary/20 ring-1 ring-primary/30" : ""}`}
      >
        {/* Top Title Bar */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-slate-200/90 dark:bg-[#161f33] border-b border-slate-300 dark:border-white/10 select-none">
          {/* Interactive Traffic Light Window Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setLogs([]);
              }}
              title="Clear Terminal (Cmd: clear)"
              className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
              aria-label="Clear Terminal"
            >
              <X className="w-2.5 h-2.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
              }}
              title="Minimize / Exit Fullscreen (Esc)"
              className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
              aria-label="Minimize Terminal"
            >
              <Minimize2 className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsExpanded(!expanded);
              }}
              title={expanded ? "Exit Fullscreen (Esc)" : "Expand to Fullscreen"}
              className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
              aria-label={expanded ? "Exit Fullscreen" : "Expand to Fullscreen"}
            >
              {expanded ? (
                <Minimize2 className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
              ) : (
                <Maximize2 className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>

            <span className="text-[11px] font-mono text-slate-700 dark:text-muted-foreground ml-2 hidden sm:inline font-medium">
              selva@cloud-cluster: ~/portfolio (zsh) {expanded ? "• [FULLSCREEN]" : ""}
            </span>
          </div>

          {/* Right Side Header Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setLogs(initialLog);
              }}
              title="Reset Terminal Logs"
              className="p-1.5 rounded-md text-slate-600 dark:text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-xs transition-colors flex items-center gap-1"
              aria-label="Reset Terminal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono hidden md:inline">Reset</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsExpanded(!expanded);
              }}
              title={expanded ? "Exit Fullscreen (Esc)" : "Expand to Fullscreen"}
              className={`p-1.5 rounded-md cursor-pointer text-xs transition-colors flex items-center gap-1.5 ${
                expanded
                  ? "bg-primary text-primary-foreground font-semibold px-3 shadow-md hover:bg-primary/90"
                  : "text-slate-600 dark:text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              aria-label={expanded ? "Exit Fullscreen" : "Expand to Fullscreen"}
            >
              {expanded ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono font-semibold">Exit Fullscreen (Esc)</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono hidden sm:inline">Fullscreen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Command Chips */}
        <div className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-[#12192a] border-b border-slate-200 dark:border-white/10 overflow-x-auto text-[11px] font-mono">
          <span className="text-slate-600 dark:text-muted-foreground flex items-center gap-1 text-[10px] uppercase tracking-wider shrink-0 font-semibold">
            <Sparkles className="w-3 h-3 text-primary" /> Quick Run:
          </span>
          {["help", "whoami", "skills", "projects", "architecture", "metrics", "contact"].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => {
                handleCommand(cmd);
                activeInputRef.current?.focus();
              }}
              className="px-2 py-0.5 rounded bg-primary/10 hover:bg-primary/25 text-primary border border-primary/30 transition-colors cursor-pointer shrink-0 font-medium"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen Body - Strict Fixed Height Container with Internal Scrollbar */}
        <div
          ref={scrollContainerRef}
          className="p-4 sm:p-6 font-mono overflow-y-auto space-y-3 flex-1 min-h-0 select-text"
          onClick={() => activeInputRef.current?.focus()}
        >
          {logs.map((item, idx) => (
            <div key={idx} className="space-y-1.5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-muted-foreground">
                <span className="text-primary font-bold">➜</span>
                <span className="text-primary font-semibold">selva@cloud</span>
                <span className="text-slate-400 dark:text-muted-foreground/60">:~#</span>
                <span className="text-slate-900 dark:text-foreground font-semibold">{item.command}</span>
                <span className="text-[10px] text-slate-400 dark:text-muted-foreground/40 ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          {/* Current Input Line */}
          <form onSubmit={onSubmit} className="flex items-center gap-2 pt-1 text-xs">
            <span className="text-primary font-bold animate-pulse">➜</span>
            <span className="text-primary font-semibold">selva@cloud</span>
            <span className="text-slate-400 dark:text-muted-foreground/60">:~#</span>
            <input
              ref={activeInputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="type command (e.g. help, skills, architecture)..."
              className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-foreground font-mono placeholder:text-slate-400 dark:placeholder:text-muted-foreground/40 text-xs"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              aria-label="Run command"
              className="p-1 rounded text-primary hover:bg-primary/10 cursor-pointer"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <section id="terminal" className="section-padding relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12" data-reveal>
          <div className="flex items-center justify-center gap-2 mb-3">
            <TerminalIcon className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Live Interactive Shell
            </span>
          </div>
          <h2 id="terminal-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Developer &amp; Recruiter <span className="gradient-text">CLI Sandbox</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Test commands directly in this simulated interactive terminal
          </p>
          <Separator className="w-16 mx-auto bg-primary/40 h-0.5 mt-4" />
        </div>

        {/* Regular In-page Terminal with Fixed Height */}
        {!isExpanded && renderTerminalBody(false)}

        {/* Fullscreen Portal rendered directly to document.body */}
        {mounted && isExpanded && createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Darkened Blur Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => {
                setIsExpanded(false);
              }}
            />

            {/* Terminal Window container completely on top */}
            <div className="relative z-10 w-full h-full max-w-6xl max-h-[92vh] flex flex-col">
              {renderTerminalBody(true)}
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}
