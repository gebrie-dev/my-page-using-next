import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// This would typically come from a database or CMS
const blogPosts = [
  {
    slug: "nextjs-14-features",
    title: "Building Scalable React Applications with Next.js 14",
    excerpt:
      "Explore the latest features in Next.js 14 and learn how to build performant, scalable React applications with the new App Router.",
    content: `Next.js 14 brings exciting new features and improvements that make building React applications more efficient and enjoyable. In this comprehensive guide, we'll explore the key features and learn how to leverage them in your projects.

## The New App Router

The App Router is a paradigm shift in how we structure Next.js applications. Built on React Server Components, it provides better performance, improved developer experience, and more intuitive routing.

### Key Benefits:
- **Server Components by default**: Reduced JavaScript bundle size
- **Improved data fetching**: Simplified patterns with async/await
- **Better caching**: Automatic request deduplication and caching
- **Streaming**: Progressive rendering for better user experience

## Server Actions

Server Actions revolutionize how we handle form submissions and server-side mutations. They provide a seamless way to run server-side code directly from client components.

\`\`\`typescript
async function createPost(formData: FormData) {
  'use server'
  
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  
  // Save to database
  await db.post.create({
    data: { title, content }
  })
  
  revalidatePath('/posts')
}
\`\`\`

## Performance Improvements

Next.js 14 includes significant performance improvements:

- **Faster bundling**: Up to 53% faster local server startup
- **Improved memory usage**: Reduced memory consumption during builds
- **Better tree shaking**: Smaller bundle sizes
- **Enhanced caching**: More efficient caching strategies

## Conclusion

Next.js 14 represents a major step forward in React development. The new features and improvements make it easier than ever to build fast, scalable applications. Whether you're starting a new project or upgrading an existing one, Next.js 14 provides the tools you need to succeed.`,
    image: "/placeholder.svg?height=300&width=600",
    category: "Development",
    tags: ["Next.js", "React", "Performance", "Web Development"],
    date: "2024-01-15",
    readTime: "8 min read",
    author: "Alex Rodriguez",
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/#blog">
          <Button variant="ghost" className="mb-8 glassmorphism">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Post Header */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gradient">{post.title}</h1>

          <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="glassmorphism">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        <div className="glassmorphism rounded-xl overflow-hidden mb-12">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={600}
            height={300}
            className="w-full h-auto"
          />
        </div>

        {/* Post Content */}
        <div className="glassmorphism p-8 rounded-xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.split("\n\n").map((section, index) => {
              if (section.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gradient">
                    {section.replace("## ", "")}
                  </h2>
                )
              } else if (section.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                    {section.replace("### ", "")}
                  </h3>
                )
              } else if (section.startsWith("```")) {
                return (
                  <pre key={index} className="bg-black/20 p-4 rounded-lg overflow-x-auto my-6">
                    <code>{section.replace(/```\w*\n?/, "").replace(/```$/, "")}</code>
                  </pre>
                )
              } else if (section.startsWith("- ")) {
                const items = section.split("\n").filter((item) => item.startsWith("- "))
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 my-4">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                )
              } else {
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {section}
                  </p>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
