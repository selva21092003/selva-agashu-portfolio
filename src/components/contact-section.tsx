"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Send,
  MapPin,
  CheckCircle2,
  Copy,
  MessageSquare,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import confetti from "canvas-confetti";

/** Contact items and form fields share one height scale with the navbar controls. */
const fieldClass =
  "w-full h-11 px-4 rounded-xl bg-muted/60 dark:bg-muted/40 border border-border/80 text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-colors text-base sm:text-sm disabled:opacity-60";
const labelClass = "text-sm font-medium text-foreground/85";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Couldn't send your message. Please try again.");
      }

      setSubmitted(true);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.7 },
          colors: ["#7c3aed", "#8b5cf6", "#6366f1", "#a78bfa"],
        });
      } catch {
        // Ignore confetti error
      }
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      const msg = err instanceof Error ? err.message : "Network error. Please try again or email directly.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openMailFallback = () => {
    const mailto = `mailto:selvaagashu@gmail.com?subject=${encodeURIComponent(
      formState.subject || `Portfolio Inquiry from ${formState.name}`
    )}&body=${encodeURIComponent(
      `From: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`
    )}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="section-padding bg-muted/30 dark:bg-muted/20 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12" data-reveal>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Send className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Direct Communication
            </span>
          </div>
          <h2 id="contact-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Let&apos;s <span className="gradient-text">Talk</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            I&apos;m looking for backend, cloud and AI-platform engineering roles.
            Send a message or reach out directly.
          </p>
          <Separator className="w-16 mx-auto bg-primary/40 h-0.5 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: contact details */}
          <div className="lg:col-span-5 flex flex-col" data-reveal>
            <div className="h-full flex flex-col gap-6 p-5 sm:p-8 rounded-2xl border border-border/80 dark:border-white/15 bg-card backdrop-blur-xl shadow-md dark:shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-foreground">Contact details</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
                  Open to interviews, technical discussions and backend engineering roles.
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-3">
                {[
                  { field: "email", icon: Mail, label: "Email", value: "selvaagashu@gmail.com", href: "mailto:selvaagashu@gmail.com", copy: "selvaagashu@gmail.com" },
                  { field: "phone", icon: Phone, label: "Phone", value: "+91 93458 39879", href: "tel:+919345839879", copy: "+919345839879" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.field}
                      className="p-3.5 sm:p-4 rounded-xl border border-border/80 dark:border-white/10 bg-muted/50 flex items-center justify-between gap-2 sm:gap-3"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Icon className="w-[18px] h-[18px]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-muted-foreground">{item.label}</div>
                          <a
                            href={item.href}
                            className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate block"
                          >
                            {item.value}
                          </a>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => copyToClipboard(item.copy, item.field)}
                        aria-label={`Copy ${item.label.toLowerCase()}`}
                        className="h-9 px-2.5 sm:px-3 text-sm text-muted-foreground hover:text-primary cursor-pointer shrink-0"
                      >
                        {copiedField === item.field ? (
                          <span className="text-primary flex items-center gap-1.5 font-medium">
                            <CheckCircle2 className="w-4 h-4" /> <span className="hidden sm:inline">Copied</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <Copy className="w-4 h-4" /> <span className="hidden sm:inline">Copy</span>
                          </span>
                        )}
                      </Button>
                    </div>
                  );
                })}

                <div className="p-3.5 sm:p-4 rounded-xl border border-border/80 dark:border-white/10 bg-muted/50 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="text-sm font-semibold text-foreground">Tamil Nadu, India</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Open to remote &amp; relocation</div>
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="pt-5 border-t border-border/60 grid grid-cols-2 gap-3">
                <Button
                  id="contact-linkedin-btn"
                  variant="outline"
                  className="h-11 text-sm border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
                  onClick={() => {
                    window.open("https://www.linkedin.com/in/selva-agashu-051851292/", "_blank", "noopener,noreferrer");
                  }}
                >
                  <LinkedinIcon className="w-4 h-4 mr-2 text-primary" />
                  LinkedIn
                </Button>

                <Button
                  id="contact-github-btn"
                  variant="outline"
                  className="h-11 text-sm border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
                  onClick={() => {
                    window.open("https://github.com/selva21092003", "_blank", "noopener,noreferrer");
                  }}
                >
                  <GithubIcon className="w-4 h-4 mr-2 text-primary" />
                  GitHub
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: message form */}
          <div className="lg:col-span-7 flex flex-col" data-reveal>
            <div className="h-full flex flex-col gap-6 p-5 sm:p-8 rounded-2xl border border-border/80 dark:border-white/15 bg-card backdrop-blur-xl shadow-lg dark:shadow-2xl">
              <div className="flex items-center gap-3.5 border-b border-border/60 pb-5">
                <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <MessageSquare className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Send a message</h3>
                  <p className="text-sm text-muted-foreground">It goes straight to my inbox.</p>
                </div>
              </div>

              {submitted ? (
                <div className="flex-1 flex flex-col items-center justify-center py-10 text-center gap-3 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">Message sent</h4>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Thanks for reaching out, <span className="text-foreground font-semibold">{formState.name}</span>. I&apos;ll get back to you soon.
                  </p>
                  <Button
                    variant="outline"
                    className="h-11 px-5 text-sm border-border hover:border-primary/50 mt-2 cursor-pointer"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", subject: "", message: "", honeypot: "" });
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
                  {/* Honeypot Spam Filter (Hidden) */}
                  <input
                    type="text"
                    name="bot_field"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden pointer-events-none"
                    value={formState.honeypot}
                    onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                  />

                  {/* Error Notification Banner */}
                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive flex items-start gap-3 text-sm animate-in fade-in duration-200"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="flex-1 space-y-1">
                        <p className="font-semibold">{errorMessage}</p>
                        <button
                          type="button"
                          onClick={openMailFallback}
                          className="underline hover:opacity-80 text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" /> Open your email app instead
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-form-name" className={labelClass}>
                        Name
                      </label>
                      <input
                        id="contact-form-name"
                        type="text"
                        required
                        autoComplete="name"
                        disabled={isSubmitting}
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Jane Doe"
                        className={fieldClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-form-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="contact-form-email"
                        type="email"
                        required
                        autoComplete="email"
                        disabled={isSubmitting}
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="jane@company.com"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-form-subject" className={labelClass}>
                      Subject <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <input
                      id="contact-form-subject"
                      type="text"
                      disabled={isSubmitting}
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Backend Engineer role at Acme"
                      className={fieldClass}
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <label htmlFor="contact-form-message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="contact-form-message"
                      rows={5}
                      required
                      disabled={isSubmitting}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about the role, team or project…"
                      className={`${fieldClass} h-auto flex-1 min-h-[140px] py-3 leading-relaxed resize-y`}
                    />
                  </div>

                  <Button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 glow font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
