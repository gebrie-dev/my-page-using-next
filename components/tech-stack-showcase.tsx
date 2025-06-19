"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type TechCategory = "frontend" | "backend" | "database" | "devops" | "tools"

type TechItem = {
  name: string
  icon: string
  category: TechCategory
  description: string
  experience: number // years
  level: "beginner" | "intermediate" | "advanced" | "expert"
  projects: number
}

export function TechStackShowcase() {
  const [activeCategory, setActiveCategory] = useState<TechCategory | "all">("all")
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null)

  const techStack: TechItem[] = [
    {
      name: "React",
      icon: "/placeholder.svg?height=40&width=40",
      category: "frontend",
      description: "Building interactive UIs with React and its ecosystem including hooks, context, and suspense.",
      experience: 3,
      level: "expert",
      projects: 30,
    },
    {
      name: "Next.js",
      icon: "/placeholder.svg?height=40&width=40",
      category: "frontend",
      description:
        "Creating full-stack applications with Next.js App Router, server components, and optimized rendering.",
      experience: 2,
      level: "expert",
      projects: 25,
    },
    {
      name: "TypeScript",
      icon: "/placeholder.svg?height=40&width=40",
      category: "frontend",
      description: "Writing type-safe code with TypeScript for better developer experience and fewer bugs.",
      experience: 3,
      level: "expert",
      projects: 28,
    },
    {
      name: "Tailwind CSS",
      icon: "/placeholder.svg?height=40&width=40",
      category: "frontend",
      description: "Crafting responsive and beautiful UIs with utility-first CSS approach.",
      experience: 2.5,
      level: "expert",
      projects: 35,
    },
    {
      name: "Node.js",
      icon: "/placeholder.svg?height=40&width=40",
      category: "backend",
      description: "Building scalable server-side applications and APIs with Node.js.",
      experience: 3,
      level: "advanced",
      projects: 22,
    },
    {
      name: "Express",
      icon: "/placeholder.svg?height=40&width=40",
      category: "backend",
      description: "Creating RESTful APIs and web servers with Express.js.",
      experience: 3,
      level: "advanced",
      projects: 20,
    },
    {
      name: "MongoDB",
      icon: "/placeholder.svg?height=40&width=40",
      category: "database",
      description: "Designing and implementing NoSQL database solutions with MongoDB.",
      experience: 2.5,
      level: "advanced",
      projects: 18,
    },
    {
      name: "PostgreSQL",
      icon: "/placeholder.svg?height=40&width=40",
      category: "database",
      description: "Working with relational databases, complex queries, and data modeling.",
      experience: 2,
      level: "intermediate",
      projects: 15,
    },
    {
      name: "Docker",
      icon: "/placeholder.svg?height=40&width=40",
      category: "devops",
      description: "Containerizing applications for consistent development and deployment environments.",
      experience: 1.5,
      level: "intermediate",
      projects: 12,
    },
    {
      name: "AWS",
      icon: "/placeholder.svg?height=40&width=40",
      category: "devops",
      description: "Deploying and managing cloud infrastructure with various AWS services.",
      experience: 2,
      level: "intermediate",
      projects: 10,
    },
    {
      name: "Git",
      icon: "/placeholder.svg?height=40&width=40",
      category: "tools",
      description: "Version control and collaboration using Git and GitHub.",
      experience: 3.5,
      level: "expert",
      projects: 40,
    },
    {
      name: "Figma",
      icon: "/placeholder.svg?height=40&width=40",
      category: "tools",
      description: "Designing and prototyping user interfaces and collaborating with designers.",
      experience: 2,
      level: "advanced",
      projects: 25,
    },
  ]

  const categories = [
    { id: "all", label: "All Technologies" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Database" },
    { id: "devops", label: "DevOps" },
    { id: "tools", label: "Tools" },
  ]

  const filteredTech =
    activeCategory === "all" ? techStack : techStack.filter((tech) => tech.category === activeCategory)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-blue-500"
      case "intermediate":
        return "bg-green-500"
      case "advanced":
        return "bg-yellow-500"
      case "expert":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`cursor-pointer text-sm py-1 px-3 ${
              activeCategory === category.id ? "barcelona-gradient text-white" : "glassmorphism hover:scale-105"
            } transition-all duration-200`}
            onClick={() => setActiveCategory(category.id as TechCategory | "all")}
          >
            {category.label}
          </Badge>
        ))}
      </div>

      <div className="relative">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {filteredTech.map((tech) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div
                className={`glassmorphism aspect-square rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 ${
                  hoveredTech?.name === tech.name ? "scale-105 ring-2 ring-white/30" : ""
                }`}
              >
                <Image src={tech.icon || "/placeholder.svg"} alt={tech.name} width={40} height={40} className="mb-2" />
                <span className="text-xs font-medium text-center">{tech.name}</span>
                <div className={`w-2 h-2 rounded-full mt-2 ${getLevelColor(tech.level)}`} />
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {hoveredTech && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-4 z-10 w-64"
            >
              <Card className="glassmorphism">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Image src={hoveredTech.icon || "/placeholder.svg"} alt={hoveredTech.name} width={24} height={24} />
                    <h4 className="font-semibold">{hoveredTech.name}</h4>
                  </div>

                  <p className="text-xs text-muted-foreground">{hoveredTech.description}</p>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-semibold">{hoveredTech.experience}+</div>
                      <div className="text-muted-foreground">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold capitalize">{hoveredTech.level}</div>
                      <div className="text-muted-foreground">Level</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{hoveredTech.projects}</div>
                      <div className="text-muted-foreground">Projects</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
