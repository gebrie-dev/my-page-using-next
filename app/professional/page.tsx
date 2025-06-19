"use client";

import { motion } from "framer-motion";
import { ResumeAnalyzer } from "@/components/resume-analyzer";
import { CollaborativePlayground } from "@/components/collaborative-playground";
import { PerformanceMetrics } from "@/components/performance-metrics";
import { TechStackShowcase } from "@/components/tech-stack-showcase";
import { AchievementsTimeline } from "@/components/achievements-timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Download, Code, BarChart, Layers, Trophy } from "lucide-react";

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

const tabItems = [
  {
    value: "resume",
    label: "Resume Analyzer",
    icon: Download,
    description: "Interactive resume analysis and optimization tool",
  },
  {
    value: "playground",
    label: "Code Playground",
    icon: Code,
    description: "Live coding environment for collaborative development",
  },
  {
    value: "metrics",
    label: "Performance",
    icon: BarChart,
    description: "Real-time performance metrics and analytics",
  },
  {
    value: "stack",
    label: "Tech Stack",
    icon: Layers,
    description: "Comprehensive overview of technical expertise",
  },
  {
    value: "achievements",
    label: "Achievements",
    icon: Trophy,
    description: "Timeline of professional milestones and awards",
  },
];

export default function ProfessionalPage() {
  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-16"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">
            Professional <span className="text-gradient">Showcase</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore my professional achievements, technical skills, and
              interactive tools that demonstrate my capabilities.
          </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
        <Tabs defaultValue="resume" className="w-full">
              <TabsList className="w-full justify-center mb-8 p-1 bg-muted/50">
                {tabItems.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </TabsTrigger>
                ))}
          </TabsList>

              {tabItems.map((item) => (
                <TabsContent
                  key={item.value}
                  value={item.value}
                  className="mt-6"
                >
                  <Card className="p-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">{item.label}</h2>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    {item.value === "resume" && <ResumeAnalyzer />}
                    {item.value === "playground" && <CollaborativePlayground />}
                    {item.value === "metrics" && <PerformanceMetrics />}
                    {item.value === "stack" && <TechStackShowcase />}
                    {item.value === "achievements" && <AchievementsTimeline />}
                  </Card>
          </TabsContent>
              ))}
        </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
