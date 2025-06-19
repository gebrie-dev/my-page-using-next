"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with Next.js 14",
    excerpt:
      "Explore the latest features in Next.js 14 and learn how to build performant, scalable React applications with the new App Router.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Development",
    tags: ["Next.js", "React", "Performance"],
    date: "2024-01-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "The Art of Glassmorphism in Modern Web Design",
    excerpt:
      "Discover how to implement glassmorphism effects using CSS and create stunning visual interfaces that captivate users.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Design",
    tags: ["CSS", "Design", "UI/UX"],
    date: "2024-01-10",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Optimizing Database Performance with MongoDB",
    excerpt:
      "Learn advanced MongoDB optimization techniques, indexing strategies, and query performance improvements for production applications.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Backend",
    tags: ["MongoDB", "Database", "Performance"],
    date: "2024-01-05",
    readTime: "10 min read",
    featured: true,
  },
]

export function BlogSection() {
  return (
    <section id="blog" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Latest <span className="text-gradient">Blog Posts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on web development, design, and technology trends.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glassmorphism rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 ${
                post.featured ? "ring-2 ring-gradient-to-r from-red-500 to-blue-500" : ""
              }`}
            >
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                {post.featured && (
                  <Badge className="absolute top-4 left-4 barcelona-gradient text-white">Featured</Badge>
                )}
                <Badge variant="secondary" className="absolute top-4 right-4 glassmorphism">
                  {post.category}
                </Badge>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Link href={`/blog/${post.id}`} className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-between hover:bg-white/10 transition-colors duration-200"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <Button
              size="lg"
              variant="outline"
              className="glassmorphism hover:scale-105 transition-transform duration-200"
            >
              View All Posts
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
