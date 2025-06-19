"use client";

import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { BlogSection } from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { VisitorCounter } from "@/components/visitor-counter";
import { ParticleBackground } from "@/components/particle-background";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const HeroIllustration = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="relative w-full h-full"
  >
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle cx="250" cy="250" r="200" className="fill-muted/20" />

      {/* Code Brackets */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        d="M150 150 L150 350 M350 150 L350 350"
        stroke="url(#gradient)"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Code Lines */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <line
          x1="180"
          y1="200"
          x2="320"
          y2="200"
          stroke="url(#gradient)"
          strokeWidth="4"
        />
        <line
          x1="180"
          y1="250"
          x2="280"
          y2="250"
          stroke="url(#gradient)"
          strokeWidth="4"
        />
        <line
          x1="180"
          y1="300"
          x2="320"
          y2="300"
          stroke="url(#gradient)"
          strokeWidth="4"
        />
      </motion.g>

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

const HeroSection = () => (
  <section
    id="home"
    className="min-h-screen flex items-center justify-center relative overflow-hidden"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-left space-y-8"
        >
          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hi, I'm <span className="text-gradient">Gebrie</span>
            </h1>
            <h2 className="text-2xl md:text-4xl text-muted-foreground">
              Full Stack Developer
            </h2>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            I build exceptional digital experiences that combine beautiful
            design with powerful functionality. Specializing in modern web
            technologies and user-centric solutions.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex items-center gap-6">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              View My Work
              <ArrowDown className="w-4 h-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              Contact Me
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-6 pt-8"
          >
            <Link
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="hidden lg:block">
          <HeroIllustration />
        </div>
      </div>

      <motion.div
        variants={fadeInUp}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </div>
  </section>
);

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper = ({
  id,
  children,
  className = "",
}: SectionWrapperProps) => (
  <section id={id} className={`py-20 relative ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/50" />
    <div className="relative">{children}</div>
  </section>
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <VisitorCounter />

      <HeroSection />

      <SectionWrapper id="about">
        <AboutSection />
      </SectionWrapper>

      <SectionWrapper id="skills" className="bg-muted/50">
        <SkillsSection />
      </SectionWrapper>

      <SectionWrapper id="projects">
        <ProjectsSection />
      </SectionWrapper>

      <SectionWrapper id="blog" className="bg-muted/50">
        <BlogSection />
      </SectionWrapper>

      <SectionWrapper id="contact">
        <ContactSection />
      </SectionWrapper>
    </main>
  );
}
