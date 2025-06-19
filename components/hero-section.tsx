"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Play, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveCodeEditor } from "@/components/live-code-editor";
import { ReactLogo3D } from "@/components/react-logo-3d";

export function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Full Stack Developer & UI/UX Enthusiast";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleDownloadCV = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#dc2626", "#2563eb", "#ffffff"],
    });
    // Simulate CV download
    const link = document.createElement("a");
    link.href = "/.pdf";
    link.download = "CV.pdf";
    link.click();
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-bold"
            >
              Hi, I'm{" "}
              <span className="text-gradient animate-pulse-glow">Gebrie</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl text-muted-foreground h-8"
            >
              {typedText}
              <span className="animate-pulse">|</span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            Crafting exceptional digital experiences with modern technologies.
            Passionate about creating scalable, accessible, and beautiful web
            applications that make a difference.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="barcelona-gradient text-white hover:scale-105 transition-transform duration-200"
              onClick={handleDownloadCV}
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="glassmorphism hover:scale-105 transition-transform duration-200"
            >
              <Play className="w-5 h-5 mr-2" />
              View Projects
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-8 pt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">50+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">3+</div>
              <div className="text-sm text-muted-foreground">Years Exp</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">100%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Interactive Elements */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* 3D React Logo */}
          <div className="h-64 w-full glassmorphism rounded-2xl p-4 animate-float">
            <ReactLogo3D />
          </div>

          {/* Live Code Editor */}
          <div className="glassmorphism rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-gradient" />
              <span className="font-semibold">Live Code Editor</span>
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            </div>
            <LiveCodeEditor />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
