"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with Next.js, Stripe integration, and admin dashboard.",
    image: "/placeholder.svg?height=300&width=400",
    category: "fullstack",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    id: 2,
    title: "AI Chat Application",
    description:
      "Real-time chat app with AI integration, built with React and WebSocket.",
    image: "/placeholder.svg?height=300&width=400",
    category: "frontend",
    technologies: ["React", "WebSocket", "OpenAI", "Node.js", "CSS3"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    id: 3,
    title: "Task Management API",
    description:
      "RESTful API with authentication, real-time updates, and comprehensive documentation.",
    image: "/placeholder.svg?height=300&width=400",
    category: "backend",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Socket.io"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "Responsive portfolio with 3D animations, glassmorphism design, and CMS integration.",
    image: "/portfolio.png?height=300&width=400",
    category: "frontend",
    technologies: ["React", "MongoDB", "Express", "Tailwind CSS"],
    github: "https://github.com/gebrie-dev/portfolio",
    demo: "https://gebrie.netlify.app/",
    featured: false,
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description:
      "Analytics dashboard with real-time data visualization and social media integration.",
    image: "/placeholder.svg?height=300&width=400",
    category: "fullstack",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "Redis"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    id: 6,
    title: "Microservices Architecture",
    description:
      "Scalable microservices setup with Docker, Kubernetes, and API Gateway.",
    image: "/placeholder.svg?height=300&width=400",
    category: "backend",
    technologies: ["Docker", "Kubernetes", "Node.js", "MongoDB", "Redis"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
];

const categories = [
  { id: "all", label: "All Projects", count: projects.length },
  {
    id: "frontend",
    label: "Frontend",
    count: projects.filter((p) => p.category === "frontend").length,
  },
  {
    id: "backend",
    label: "Backend",
    count: projects.filter((p) => p.category === "backend").length,
  },
  {
    id: "fullstack",
    label: "Full Stack",
    count: projects.filter((p) => p.category === "fullstack").length,
  },
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setActiveCategory(category);
    // Simulate loading state for better UX
    setTimeout(() => setIsLoading(false), 300);
  };

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my best work, demonstrating expertise across frontend,
            backend, and full-stack development.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.id)}
              disabled={isLoading}
              className={`flex items-center gap-2 ${
                activeCategory === category.id
                  ? "barcelona-gradient text-white"
                  : "glassmorphism hover:scale-105"
              } transition-all duration-200`}
            >
              <Filter className="w-4 h-4" />
              {category.label}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glassmorphism rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 ${
                project.featured
                  ? "ring-2 ring-gradient-to-r from-red-500 to-blue-500"
                  : ""
              }`}
            >
              <div className="relative group">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  priority={project.featured}
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Link href={project.github} target="_blank">
                    <Button
                      size="sm"
                      variant="outline"
                      className="glassmorphism"
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={project.demo} target="_blank">
                    <Button size="sm" className="barcelona-gradient text-white">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                {project.featured && (
                  <Badge className="absolute top-4 left-4 barcelona-gradient text-white">
                    Featured
                  </Badge>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Link
                    href={project.github}
                    target="_blank"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full glassmorphism"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </Link>
                  <Link href={project.demo} target="_blank" className="flex-1">
                    <Button
                      size="sm"
                      className="w-full barcelona-gradient text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {filteredProjects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => setShowAll(!showAll)}
              size="lg"
              variant="outline"
              className="glassmorphism hover:scale-105 transition-transform duration-200"
            >
              {showAll
                ? "Show Less"
                : `Show All ${filteredProjects.length} Projects`}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
