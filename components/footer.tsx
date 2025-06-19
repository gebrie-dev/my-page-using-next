"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart, Code } from "lucide-react";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/#about" },
      { label: "Projects", href: "/#projects" },
      { label: "Blog", href: "/#blog" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Professional",
    links: [
      { label: "Resume", href: "/professional#resume" },
      { label: "Skills", href: "/professional#skills" },
      { label: "Experience", href: "/professional#experience" },
      { label: "Education", href: "/professional#education" },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/yourusername",
        icon: Github,
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/yourusername",
        icon: Linkedin,
      },
      {
        label: "Twitter",
        href: "https://twitter.com/yourusername",
        icon: Twitter,
      },
      { label: "Email", href: "mailto:your.email@example.com", icon: Mail },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity inline-flex items-center gap-2"
            >
              <Code className="w-6 h-6" />
              Gebrie
            </Link>
            <p className="text-muted-foreground">
              Building the future of web applications with modern technologies
              and creative solutions.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {footerLinks[2].links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.slice(0, 2).map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 transition-all group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Gebrie. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>using Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
