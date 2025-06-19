"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, Briefcase, GraduationCap, Trophy, Star, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Achievement = {
  id: number
  title: string
  organization: string
  date: string
  description: string
  category: "work" | "education" | "award" | "certification"
  icon: React.ElementType
  link?: string
}

export function AchievementsTimeline() {
  const [filter, setFilter] = useState<string>("all")

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      organization: "Tech Innovations Inc.",
      date: "2023 - Present",
      description:
        "Led development of a React-based SaaS platform serving 50,000+ users. Improved performance by 40% and implemented CI/CD pipelines.",
      category: "work",
      icon: Briefcase,
      link: "#",
    },
    {
      id: 2,
      title: "Frontend Developer",
      organization: "Digital Solutions Ltd.",
      date: "2021 - 2023",
      description:
        "Developed responsive web applications using React, Next.js, and TypeScript. Collaborated with UX designers to implement pixel-perfect interfaces.",
      category: "work",
      icon: Briefcase,
      link: "#",
    },
    {
      id: 3,
      title: "Master's in Computer Science",
      organization: "University of Technology",
      date: "2019 - 2021",
      description:
        "Specialized in Web Technologies and Human-Computer Interaction. Graduated with honors (GPA: 3.9/4.0).",
      category: "education",
      icon: GraduationCap,
      link: "#",
    },
    {
      id: 4,
      title: "Best Web Application Award",
      organization: "DevFest 2022",
      date: "November 2022",
      description:
        "Received first place for developing an innovative accessibility-focused web application that helps visually impaired users navigate websites.",
      category: "award",
      icon: Trophy,
      link: "#",
    },
    {
      id: 5,
      title: "AWS Certified Developer",
      organization: "Amazon Web Services",
      date: "June 2022",
      description:
        "Earned certification demonstrating proficiency in developing, deploying, and debugging cloud-based applications using AWS.",
      category: "certification",
      icon: Award,
      link: "#",
    },
    {
      id: 6,
      title: "Bachelor's in Software Engineering",
      organization: "State University",
      date: "2015 - 2019",
      description:
        "Graduated with distinction. Completed capstone project on real-time collaborative web applications.",
      category: "education",
      icon: GraduationCap,
      link: "#",
    },
    {
      id: 7,
      title: "React Advanced Certification",
      organization: "React Training",
      date: "March 2021",
      description:
        "Completed advanced certification covering React hooks, context API, performance optimization, and testing.",
      category: "certification",
      icon: Award,
      link: "#",
    },
    {
      id: 8,
      title: "Innovation Excellence Award",
      organization: "Digital Solutions Ltd.",
      date: "December 2022",
      description:
        "Recognized for developing an innovative feature that increased user engagement by 35% and reduced customer support tickets by 25%.",
      category: "award",
      icon: Star,
      link: "#",
    },
  ]

  const filteredAchievements =
    filter === "all" ? achievements : achievements.filter((achievement) => achievement.category === filter)

  const categories = [
    { id: "all", label: "All", icon: Calendar },
    { id: "work", label: "Work", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "award", label: "Awards", icon: Trophy },
    { id: "certification", label: "Certifications", icon: Award },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-500"
      case "education":
        return "bg-green-500"
      case "award":
        return "bg-yellow-500"
      case "certification":
        return "bg-purple-500"
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
            variant={filter === category.id ? "default" : "outline"}
            className={`cursor-pointer flex items-center gap-1 py-1 px-3 ${
              filter === category.id ? "barcelona-gradient text-white" : "glassmorphism hover:scale-105"
            } transition-all duration-200`}
            onClick={() => setFilter(category.id)}
          >
            <category.icon className="w-3 h-3" />
            {category.label}
          </Badge>
        ))}
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-blue-500" />

        <div className="space-y-8">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-6"
            >
              <div
                className={`glassmorphism p-3 rounded-full z-10 ${getCategoryColor(achievement.category)} bg-opacity-20`}
              >
                <achievement.icon className="w-6 h-6 text-gradient" />
              </div>

              <div className="glassmorphism p-6 rounded-xl flex-1 hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {achievement.date}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-2">{achievement.organization}</p>
                <p className="text-sm">{achievement.description}</p>

                {achievement.link && (
                  <a
                    href={achievement.link}
                    className="text-xs text-blue-500 hover:underline mt-2 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View details →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
