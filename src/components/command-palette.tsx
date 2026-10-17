"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  FolderOpen,
  User,
  Briefcase,
  Code2,
  GraduationCap,
  Mail,
  Phone,
  FileText,
  Terminal,
  Layers,
  X,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Projects" | "Connect" | "Actions";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigateTo = useCallback(
    (id: string) => {
      setIsOpen(false);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const commands: CommandItem[] = [
    {
      id: "cmd-hero",
      title: "Hero & Overview",
      category: "Navigation",
      icon: User,
      action: () => navigateTo("hero"),
    },
    {
      id: "cmd-experience",
      title: "Experience at Cloud Alpha Solutions",
      category: "Navigation",
      icon: Briefcase,
      action: () => navigateTo("experience"),
    },
    {
      id: "cmd-architecture",
      title: "Platform Architecture (in Experience)",
      category: "Navigation",
      icon: Layers,
      action: () => {
        setIsOpen(false);
        window.dispatchEvent(new Event("open-architecture"));
      },
    },
    {
      id: "cmd-projects",
      title: "Projects & Code Repositories",
      category: "Navigation",
      icon: FolderOpen,
      action: () => navigateTo("projects"),
    },
    {
      id: "cmd-skills",
      title: "Technical Skills & Cloud Stack",
      category: "Navigation",
      icon: Code2,
      action: () => navigateTo("skills"),
    },
    {
      id: "cmd-about",
      title: "About Selva Agashu",
      category: "Navigation",
      icon: User,
      action: () => navigateTo("about"),
    },
    {
      id: "cmd-education",
      title: "Education (B.E. Computer Science)",
      category: "Navigation",
      icon: GraduationCap,
      action: () => navigateTo("education"),
    },
    {
      id: "cmd-terminal",
      title: "Interactive Terminal CLI",
      category: "Navigation",
      icon: Terminal,
      action: () => navigateTo("terminal"),
    },
    {
      id: "cmd-contact",
      title: "Contact & Direct Message",
      category: "Navigation",
      icon: Mail,
      action: () => navigateTo("contact"),
    },
    {
      id: "cmd-github",
      title: "Open GitHub Profile (@selva21092003)",
      category: "Connect",
      icon: GithubIcon,
      action: () => window.open("https://github.com/selva21092003", "_blank", "noopener,noreferrer"),
    },
    {
      id: "cmd-linkedin",
      title: "Connect on LinkedIn",
      category: "Connect",
      icon: LinkedinIcon,
      action: () =>
        window.open("https://www.linkedin.com/in/selva-agashu-051851292/", "_blank", "noopener,noreferrer"),
    },
    {
      id: "cmd-copy-email",
      title: "Copy Email (selvaagashu@gmail.com)",
      category: "Actions",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText("selvaagashu@gmail.com");
        alert("Email copied to clipboard!");
      },
    },
    {
      id: "cmd-copy-phone",
      title: "Copy Phone (+91 9345839879)",
      category: "Actions",
      icon: Phone,
      action: () => {
        navigator.clipboard.writeText("+919345839879");
        alert("Phone number copied to clipboard!");
      },
    },
    {
      id: "cmd-download-resume",
      title: "Download Software Engineer Resume (PDF)",
      category: "Actions",
      icon: FileText,
      action: () => {
        window.open("/selva_agashu_resume.pdf", "_blank");
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (cmd: CommandItem) => {
    cmd.action();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-xl bg-card border border-border/80 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/60">
          <Search className="w-4 h-4 text-primary shrink-0" />
          <input
            id="command-palette-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search sections, projects, links..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-sans"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-border/20">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No matching commands found for &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  id={cmd.id}
                  onMouseEnter={() => {
                    setSelectedIndex(idx);
                  }}
                  onClick={() => handleSelect(cmd)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-foreground hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{cmd.title}</div>
                      <div className="text-[10px] text-muted-foreground">{cmd.category}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Jump ↵</span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-t border-border/40 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↓</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">Enter</kbd>
          </div>
          <div>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}
