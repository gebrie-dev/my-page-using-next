import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// This would typically come from a database or CMS
const projects = [
  {
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing, and an admin dashboard.",
    longDescription: `This comprehensive e-commerce platform demonstrates modern web development practices and scalable architecture. Built with Next.js 14 and the App Router, it features a responsive design, server-side rendering for optimal SEO, and a seamless user experience.

The platform includes user authentication with NextAuth.js, secure payment processing with Stripe, real-time inventory management, and a comprehensive admin dashboard for managing products, orders, and customers.

Key technical highlights include optimistic UI updates, server actions for form handling, and a robust caching strategy for improved performance.`,
    image: "/placeholder.svg?height=400&width=800",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind CSS", "NextAuth.js"],
    github: "https://github.com",
    demo: "https://demo.com",
    date: "2024-01-15",
    category: "Full Stack",
    features: [
      "User authentication and authorization",
      "Secure payment processing with Stripe",
      "Real-time inventory management",
      "Admin dashboard with analytics",
      "Responsive design for all devices",
      "SEO optimized with server-side rendering",
    ],
    challenges: [
      "Implementing secure payment processing",
      "Optimizing database queries for large product catalogs",
      "Creating a responsive admin interface",
      "Handling real-time inventory updates",
    ],
  },
]

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/#projects">
          <Button variant="ghost" className="mb-8 glassmorphism">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        {/* Project Header */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(project.date).toLocaleDateString()}
            </div>
            <Badge variant="secondary">{project.category}</Badge>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gradient">{project.title}</h1>

          <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>

          <div className="flex gap-4">
            <Link href={project.github} target="_blank">
              <Button variant="outline" className="glassmorphism">
                <Github className="w-4 h-4 mr-2" />
                View Code
              </Button>
            </Link>
            <Link href={project.demo} target="_blank">
              <Button className="barcelona-gradient text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Project Image */}
        <div className="glassmorphism rounded-xl overflow-hidden mb-12">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="glassmorphism">
                <Tag className="w-3 h-3 mr-1" />
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Challenges Overcome</h2>
            <ul className="space-y-2">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Long Description */}
        <div className="glassmorphism p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {project.longDescription.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
