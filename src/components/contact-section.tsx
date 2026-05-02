"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, GitBranch, Link2, Send, MapPin } from "lucide-react";

const contactLinks = [
  {
    id: "contact-email",
    icon: Mail,
    label: "Email",
    value: "selvaagashu@gmail.com",
    href: "mailto:selvaagashu@gmail.com",
  },
  {
    id: "contact-phone",
    icon: Phone,
    label: "Phone",
    value: "+91 93458 39879",
    href: "tel:+919345839879",
  },
  {
    id: "contact-github",
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/selva21092003",
    href: "https://github.com/selva21092003",
  },
  {
    id: "contact-linkedin",
    icon: Link2,
    label: "LinkedIn",
    value: "linkedin.com/in/selva-agashu-051851292",
    href: "https://www.linkedin.com/in/selva-agashu-051851292/",
  },
  {
    id: "contact-location",
    icon: MapPin,
    label: "Location",
    value: "Tamil Nadu, India",
    href: null,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Send className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Contact
            </span>
          </div>
          <h2 id="contact-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Let&apos;s Work{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            I&apos;m actively seeking backend / cloud engineering roles at product-based companies.
            Feel free to reach out — I&apos;d love to chat!
          </p>
          <Separator className="w-16 mx-auto bg-primary/30 h-0.5 mt-6" />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact cards grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {contactLinks.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                className="card-hover border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-5">
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <item.icon className="h-4.5 w-4.5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4.5 w-4.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <Button
              id="contact-email-btn"
              size="lg"
              className="glow hover:scale-105 transition-all duration-300 font-semibold px-10"
              onClick={() => { window.location.href = "mailto:selvaagashu@gmail.com"; }}
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Me an Email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
