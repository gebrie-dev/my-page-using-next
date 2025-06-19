"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function VoiceThemeToggle() {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any | null>(null)
  const { setTheme, theme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()

        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = "en-US"

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase()

          if (transcript.includes("dark mode") || transcript.includes("dark theme")) {
            setTheme("dark")
            toast({
              title: "Theme Changed",
              description: "Switched to dark mode",
            })
          } else if (transcript.includes("light mode") || transcript.includes("light theme")) {
            setTheme("light")
            toast({
              title: "Theme Changed",
              description: "Switched to light mode",
            })
          } else if (transcript.includes("toggle theme") || transcript.includes("switch theme")) {
            setTheme(theme === "dark" ? "light" : "dark")
            toast({
              title: "Theme Toggled",
              description: `Switched to ${theme === "dark" ? "light" : "dark"} mode`,
            })
          } else {
            toast({
              title: "Command not recognized",
              description: "Try saying 'dark mode', 'light mode', or 'toggle theme'",
              variant: "destructive",
            })
          }

          setIsListening(false)
        }

        recognitionInstance.onerror = () => {
          setIsListening(false)
          toast({
            title: "Voice recognition error",
            description: "Please try again",
            variant: "destructive",
          })
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
      }
    }
  }, [setTheme, theme, toast])

  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Voice recognition not supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      })
      return
    }

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
      toast({
        title: "Listening...",
        description: "Say 'dark mode', 'light mode', or 'toggle theme'",
      })
    }
  }

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={toggleListening}
        size="lg"
        className={`rounded-full w-14 h-14 shadow-lg transition-all duration-300 ${
          isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "barcelona-gradient hover:scale-110"
        }`}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div key="mic-off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MicOff className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="mic-on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Mic className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 right-0 glassmorphism p-3 rounded-lg whitespace-nowrap"
          >
            <div className="text-sm font-medium">🎤 Listening...</div>
            <div className="text-xs text-muted-foreground">Say theme command</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}