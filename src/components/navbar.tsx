"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Code2,
  Search,
  Terminal,
  Briefcase,
  FolderOpen,
  Wrench,
  User,
  Mail,
  FileText,
  X,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navControlHeight, navIcon, navIconButton } from "@/lib/nav-styles";

const navLinks = [
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#projects", label: "Projects", icon: FolderOpen },
  { href: "#skills", label: "Skills", icon: Wrench },
  { href: "#about", label: "About", icon: User },
  { href: "#terminal", label: "CLI Sandbox", icon: Terminal },
  { href: "#contact", label: "Contact", icon: Mail },
];

const socials = [
  { href: "https://github.com/selva21092003", label: "GitHub", icon: GithubIcon },
  { href: "https://www.linkedin.com/in/selva-agashu-051851292/", label: "LinkedIn", icon: LinkedinIcon },
  { href: "mailto:selvaagashu@gmail.com", label: "Email", icon: Mail },
];

/** Id of the section currently in the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // a thin band across the middle of the screen
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = navLinks.map((l) => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }));
  };

  /**
   * Close the drawer first, then scroll: the sheet locks body scroll while
   * open, so a plain anchor jump can be swallowed.
   */
  const goFromDrawer = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", href);
    }, 220);
  };

  return (
    <header
      id="navbar"
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="#"
            id="nav-logo"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-200">
              <Code2 className="h-4 w-4" />
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight gradient-text">
              Selva Agashu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  id={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "px-3 py-1.5 text-xs transition-colors duration-200 rounded-lg cursor-pointer",
                    isActive
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* Quick Command Palette Button */}
            <button
              id="nav-command-palette-btn"
              onClick={openCommandPalette}
              title="Search & Quick Navigation (Ctrl+K)"
              className={cn(
                "hidden sm:flex items-center gap-2 px-3 rounded-lg border border-border/70 bg-card/60 hover:bg-card hover:border-primary/40 text-xs text-muted-foreground hover:text-foreground backdrop-blur-md transition-all cursor-pointer",
                navControlHeight
              )}
            >
              <Search className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px]">Search</span>
              <kbd className="px-1 py-0.2 rounded bg-muted text-[10px] border border-border">Ctrl+K</kbd>
            </button>


            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className={cn(navIconButton, "lg:hidden")}
                id="mobile-menu-trigger"
                aria-label="Open menu"
              >
                <Menu className={navIcon} />
              </SheetTrigger>
              <SheetContent
                side="right"
                showCloseButton={false}
                className="data-[side=right]:w-[86vw] gap-0 p-0 bg-card/95 backdrop-blur-2xl border-border/80"
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-5 h-16 border-b border-border/60 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                      <Code2 className="h-4 w-4" />
                    </div>
                    <div className="leading-tight">
                      <SheetTitle className="text-sm font-bold gradient-text">Selva Agashu</SheetTitle>
                      <p className="text-[11px] text-muted-foreground">Backend Software Engineer</p>
                    </div>
                  </div>
                  <SheetClose
                    aria-label="Close menu"
                    className="inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </SheetClose>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-4">
                  {/* Search (the header's search button is hidden on phones) */}
                  <button
                    onClick={() => {
                      setOpen(false);
                      setTimeout(openCommandPalette, 220);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 h-11 mb-4 rounded-xl border border-border/80 bg-muted/40 text-sm text-muted-foreground hover:border-primary/40 transition-colors cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-primary" />
                    Search sections, projects…
                  </button>

                  <nav aria-label="Sections" className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = active === link.href.slice(1);
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                          aria-current={isActive ? "location" : undefined}
                          onClick={(e) => goFromDrawer(e, link.href)}
                          className={cn(
                            "group flex items-center gap-3 px-3.5 h-12 rounded-xl text-[15px] transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-foreground/85 hover:bg-muted active:bg-muted"
                          )}
                        >
                          <span
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                              isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-primary"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="flex-1">{link.label}</span>
                          {isActive ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          ) : (
                            <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                          )}
                        </a>
                      );
                    })}
                  </nav>
                </div>

                {/* Drawer footer: primary actions + socials */}
                <div className="shrink-0 border-t border-border/60 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="#contact"
                      onClick={(e) => goFromDrawer(e, "#contact")}
                      className="flex items-center justify-center gap-1.5 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
                    >
                      Get in Touch
                    </a>
                    <a
                      href="/selva_agashu_resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 h-11 rounded-xl border border-border text-sm font-semibold text-foreground hover:border-primary/50"
                    >
                      <FileText className="w-4 h-4 text-primary" />
                      Résumé
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Open to new roles
                    </span>
                    <div className="flex items-center gap-1">
                      {socials.map((s) => {
                        const Icon = s.icon;
                        return (
                          <a
                            key={s.label}
                            href={s.href}
                            aria-label={s.label}
                            target={s.href.startsWith("http") ? "_blank" : undefined}
                            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
