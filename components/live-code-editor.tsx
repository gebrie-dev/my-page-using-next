"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

const initialCode = `function greetBarcelona() {
  const message = "¡Hola Barcelona!";
  const colors = ["#dc2626", "#2563eb"];
  
  return {
    message,
    colors,
    passion: "Més que un club! 💙❤️"
  };
}

console.log(greetBarcelona());`

export function LiveCodeEditor() {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    try {
      // Create a safe execution context
      const logs: string[] = []
      const mockConsole = {
        log: (...args: any[]) => {
          logs.push(args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" "))
        },
      }

      // Execute code with mock console
      const func = new Function("console", code)
      func(mockConsole)

      setOutput(logs.join("\n") || "Code executed successfully!")
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }

    setTimeout(() => setIsRunning(false), 500)
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput("")
  }

  useEffect(() => {
    // Auto-run on mount
    runCode()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={runCode} disabled={isRunning} className="barcelona-gradient text-white">
          <Play className="w-4 h-4 mr-1" />
          {isRunning ? "Running..." : "Run"}
        </Button>
        <Button size="sm" variant="outline" onClick={resetCode}>
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Code:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-32 p-3 bg-black/20 border border-white/20 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your JavaScript code here..."
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Output:</label>
          <motion.div
            key={output}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full min-h-[80px] p-3 bg-black/40 border border-white/20 rounded-lg font-mono text-sm whitespace-pre-wrap"
          >
            {output || 'Click "Run" to execute code...'}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
