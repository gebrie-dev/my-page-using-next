"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, FileText, CheckCircle, AlertCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type SkillMatch = {
  skill: string
  match: number
  category: "technical" | "soft" | "experience"
}

export function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [matches, setMatches] = useState<SkillMatch[]>([])
  const [overallMatch, setOverallMatch] = useState(0)
  const [feedback, setFeedback] = useState("")

  // Mock job requirements for demonstration
  const jobRequirements = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "API Integration",
    "Responsive Design",
    "State Management",
    "Performance Optimization",
    "3+ years experience",
    "Team collaboration",
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setAnalyzed(false)
    }
  }

  const analyzeResume = () => {
    if (!file) return

    setAnalyzing(true)
    setProgress(0)

    // Simulate analysis process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setAnalyzing(false)
          setAnalyzed(true)

          // Mock analysis results
          const mockMatches: SkillMatch[] = [
            { skill: "Next.js", match: 95, category: "technical" },
            { skill: "React", match: 90, category: "technical" },
            { skill: "TypeScript", match: 85, category: "technical" },
            { skill: "Tailwind CSS", match: 92, category: "technical" },
            { skill: "API Integration", match: 88, category: "technical" },
            { skill: "Responsive Design", match: 94, category: "technical" },
            { skill: "State Management", match: 82, category: "technical" },
            { skill: "Performance Optimization", match: 78, category: "technical" },
            { skill: "Experience", match: 75, category: "experience" },
            { skill: "Team Collaboration", match: 85, category: "soft" },
          ]

          setMatches(mockMatches)

          // Calculate overall match
          const overall = Math.round(mockMatches.reduce((sum, item) => sum + item.match, 0) / mockMatches.length)
          setOverallMatch(overall)

          // Generate feedback
          if (overall > 85) {
            setFeedback(
              "Your profile is an excellent match for this position! Your technical skills are impressive, and you have the right experience level.",
            )
          } else if (overall > 70) {
            setFeedback(
              "You're a good match for this position. Consider highlighting your experience with performance optimization and state management to strengthen your application.",
            )
          } else {
            setFeedback(
              "You have some relevant skills, but might need more experience in key areas. Consider focusing on improving your TypeScript and React skills.",
            )
          }

          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-3xl mx-auto">
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gradient" />
            Resume Match Analyzer
          </CardTitle>
          <CardDescription>Upload your resume to see how well it matches with my skills and experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!analyzed ? (
            <>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="resume-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX or TXT (MAX. 5MB)</p>
                  </div>
                  <input
                    id="resume-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {file && (
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                  </div>
                  <Button onClick={analyzeResume} disabled={analyzing} className="barcelona-gradient text-white">
                    {analyzing ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
              )}

              {analyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing resume...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Overall Match</h3>
                  <p className="text-sm text-muted-foreground">Based on job requirements</p>
                </div>
                <div
                  className={`text-2xl font-bold ${
                    overallMatch > 85 ? "text-green-500" : overallMatch > 70 ? "text-yellow-500" : "text-red-500"
                  }`}
                >
                  {overallMatch}%
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  {overallMatch > 85 ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                  AI Feedback
                </h3>
                <p className="text-sm text-muted-foreground">{feedback}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Skill Matches</h3>
                <div className="space-y-3">
                  {matches.map((match, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{match.skill}</span>
                          <Badge variant="outline" className="text-xs">
                            {match.category === "technical"
                              ? "Tech"
                              : match.category === "soft"
                                ? "Soft Skill"
                                : "Experience"}
                          </Badge>
                        </div>
                        <span className="text-sm font-medium">{match.match}%</span>
                      </div>
                      <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${match.match}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full rounded-full ${
                            match.match > 85 ? "bg-green-500" : match.match > 70 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <p>This analyzer uses AI to compare your resume against job requirements and my skill set.</p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
