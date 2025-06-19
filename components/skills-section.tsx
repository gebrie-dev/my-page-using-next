"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Server, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code,
    skills: [
      { name: "React/Next.js", level: 95, color: "from-blue-500 to-cyan-500" },
      { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-400" },
      { name: "Tailwind CSS", level: 92, color: "from-teal-500 to-green-500" },
      {
        name: "Framer Motion",
        level: 85,
        color: "from-purple-500 to-pink-500",
      },
      { name: "Three.js", level: 80, color: "from-orange-500 to-red-500" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 88, color: "from-green-600 to-green-400" },
      { name: "Express.js", level: 85, color: "from-gray-600 to-gray-400" },
      { name: "MongoDB", level: 82, color: "from-green-500 to-emerald-500" },
      { name: "PostgreSQL", level: 78, color: "from-blue-600 to-indigo-600" },
      { name: "GraphQL", level: 75, color: "from-pink-500 to-rose-500" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Cloud",
    icon: Globe,
    skills: [
      { name: "AWS", level: 85, color: "from-orange-500 to-yellow-500" },
      { name: "Docker", level: 80, color: "from-blue-500 to-blue-600" },
      { name: "Git/GitHub", level: 92, color: "from-gray-700 to-gray-500" },
      { name: "Vercel", level: 90, color: "from-black to-gray-800" },
      { name: "Figma", level: 85, color: "from-purple-500 to-indigo-500" },
    ],
  },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const activeSkills =
    skillCategories.find((cat) => cat.id === activeCategory)?.skills || [];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks,
            constantly evolving with the latest industry trends.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {skillCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 ${
                activeCategory === category.id
                  ? "barcelona-gradient text-white"
                  : "glassmorphism hover:scale-105"
              } transition-all duration-200`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 max-w-4xl mx-auto"
        >
          {activeSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism p-6 rounded-xl hover:scale-105 transition-transform duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{skill.name}</h3>
                <span className="text-sm font-bold text-gradient">
                  {skill.level}%
                </span>
              </div>

              <div className="relative h-3 bg-black/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          <div className="text-center glassmorphism p-6 rounded-xl">
            <div className="text-3xl font-bold text-gradient mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </div>
          <div className="text-center glassmorphism p-6 rounded-xl">
            <div className="text-3xl font-bold text-gradient mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Projects Built</div>
          </div>
          <div className="text-center glassmorphism p-6 rounded-xl">
            <div className="text-3xl font-bold text-gradient mb-2">3+</div>
            <div className="text-sm text-muted-foreground">
              Years Experience
            </div>
          </div>
          <div className="text-center glassmorphism p-6 rounded-xl">
            <div className="text-3xl font-bold text-gradient mb-2">100%</div>
            <div className="text-sm text-muted-foreground">
              Client Satisfaction
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
