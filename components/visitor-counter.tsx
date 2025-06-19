"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, Users } from "lucide-react"

export function VisitorCounter() {
  const [visitors, setVisitors] = useState(0)
  const [online, setOnline] = useState(0)

  useEffect(() => {
    // Simulate real-time visitor counter
    const storedVisitors = localStorage.getItem("visitorCount")
    const initialCount = storedVisitors ? Number.parseInt(storedVisitors) : Math.floor(Math.random() * 1000) + 500

    setVisitors(initialCount + 1)
    localStorage.setItem("visitorCount", String(initialCount + 1))

    // Simulate online users
    setOnline(Math.floor(Math.random() * 20) + 5)

    // Update online count periodically
    const interval = setInterval(() => {
      setOnline((prev) => {
        const change = Math.floor(Math.random() * 6) - 3 // -3 to +2
        return Math.max(1, prev + change)
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-4 z-40 glassmorphism p-4 rounded-lg space-y-2"
    >
      <div className="flex items-center gap-2 text-sm">
        <Eye className="w-4 h-4 text-blue-500" />
        <span className="font-medium">{visitors.toLocaleString()}</span>
        <span className="text-muted-foreground">total visits</span>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <Users className="w-4 h-4 text-green-500" />
        <span className="font-medium">{online}</span>
        <span className="text-muted-foreground">online now</span>
      </div>
    </motion.div>
  )
}
