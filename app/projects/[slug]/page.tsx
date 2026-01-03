import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    slug: "culerhub-fan-platform",
    title: "CulerHub",
    description:
      "A MERN stack fan engagement platform for FC Barcelona supporters, featuring real-time match updates, subscription-based premium content, and e-commerce for club merchandise.",
    longDescription: `CulerHub is a full-stack web application designed to unite FC Barcelona fans worldwide. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it offers a dynamic and scalable platform for fan engagement. The app provides real-time match updates, exclusive subscription-based content, and an integrated e-commerce store for official merchandise.

Key features include user authentication with JWT, live match commentary using WebSockets, a subscription system powered by Stripe for premium content access, and a responsive UI built with React and Tailwind CSS. The backend leverages MongoDB for flexible data storage and Express.js for efficient API handling. The platform is optimized for performance with server-side rendering and caching strategies to ensure fast load times during high-traffic match days.`,
    image: "/culerhub-placeholder.svg?height=400&width=800",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "Stripe",
      "WebSocket",
    ],
    github: "https://github.com/yourusername/culerhub",
    demo: "https://culerhub-demo.com",
    date: "2025-03-10",
    category: "Full Stack",
    features: [
      "User authentication with JWT and role-based access",
      "Real-time match updates using WebSocket integration",
      "Subscription system for premium fan content with Stripe",
      "E-commerce store for FC Barcelona merchandise",
      "Responsive UI for mobile and desktop users",
      "SEO optimization with server-side rendering",
    ],
    challenges: [
      "Implementing real-time match updates with WebSockets for low latency",
      "Scaling MongoDB queries for high-traffic match days",
      "Integrating secure payment processing with Stripe",
      "Designing a responsive and engaging UI for diverse fanbase",
    ],
  },
];

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
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

          <h1 className="text-4xl lg:text-5xl font-bold text-gradient">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {project.description}
          </p>

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
  );
}
