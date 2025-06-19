"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Share2, Users, Save, Copy, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const initialHtml = `<div class="playground-container">
  <h1>Hello, Collaborative Playground!</h1>
  <p>Edit me to see real-time changes</p>
  <button id="demo-btn">Click Me</button>
</div>`

const initialCss = `body {
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%);
  color: white;
}

.playground-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

button {
  background: white;
  color: #2563eb;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}`

const initialJs = `document.getElementById('demo-btn').addEventListener('click', function() {
  alert('Hello from the collaborative playground!');
  
  // Change background color
  document.body.style.background = 'linear-gradient(135deg, #2563eb 0%, #dc2626 100%)';
  
  // Add animation
  const heading = document.querySelector('h1');
  heading.style.animation = 'bounce 1s infinite';
  
  // Add keyframes
  const style = document.createElement('style');
  style.textContent = \`
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
  \`;
  document.head.appendChild(style);
});`

export function CollaborativePlayground() {
  const [html, setHtml] = useState(initialHtml)
  const [css, setCss] = useState(initialCss)
  const [js, setJs] = useState(initialJs)
  const [activeUsers, setActiveUsers] = useState(1)
  const [iframeKey, setIframeKey] = useState(0)
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)

  // Simulate active users changing
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 3) + 1)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Generate preview
  const generatePreview = () => {
    const combinedCode = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `
    return combinedCode
  }

  // Reset to initial code
  const resetCode = () => {
    setHtml(initialHtml)
    setCss(initialCss)
    setJs(initialJs)
    setIframeKey((prev) => prev + 1)
  }

  // Generate shareable URL
  const generateShareUrl = () => {
    // In a real app, this would create a unique URL with the code stored in a database
    const mockUrl = `https://yourportfolio.com/playground/${Math.random().toString(36).substring(2, 8)}`
    setShareUrl(mockUrl)
  }

  // Copy share URL
  const copyShareUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <div className="glassmorphism rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Collaborative Code Playground</h3>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {activeUsers} active
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={resetCode} className="glassmorphism">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={generateShareUrl} className="glassmorphism">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate share link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              size="sm"
              onClick={() => setIframeKey((prev) => prev + 1)}
              className="barcelona-gradient text-white"
            >
              <Play className="w-4 h-4 mr-1" />
              Run
            </Button>
          </div>
        </div>

        {shareUrl && (
          <div className="p-3 bg-white/5 flex items-center justify-between">
            <div className="text-sm truncate max-w-[80%]">{shareUrl}</div>
            <Button size="sm" variant="ghost" onClick={copyShareUrl} className="text-xs">
              {copied ? (
                <>
                  <Save className="w-3 h-3 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-0">
          <div className="border-r border-white/10">
            <Tabs defaultValue="html">
              <TabsList className="w-full justify-start rounded-none border-b border-white/10">
                <TabsTrigger value="html" className="data-[state=active]:bg-white/10">
                  HTML
                </TabsTrigger>
                <TabsTrigger value="css" className="data-[state=active]:bg-white/10">
                  CSS
                </TabsTrigger>
                <TabsTrigger value="js" className="data-[state=active]:bg-white/10">
                  JavaScript
                </TabsTrigger>
              </TabsList>
              <TabsContent value="html" className="m-0">
                <textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  className="w-full h-[400px] p-4 bg-black/20 font-mono text-sm focus:outline-none resize-none"
                  spellCheck="false"
                />
              </TabsContent>
              <TabsContent value="css" className="m-0">
                <textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  className="w-full h-[400px] p-4 bg-black/20 font-mono text-sm focus:outline-none resize-none"
                  spellCheck="false"
                />
              </TabsContent>
              <TabsContent value="js" className="m-0">
                <textarea
                  value={js}
                  onChange={(e) => setJs(e.target.value)}
                  className="w-full h-[400px] p-4 bg-black/20 font-mono text-sm focus:outline-none resize-none"
                  spellCheck="false"
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="h-[450px] bg-white">
            <iframe
              key={iframeKey}
              srcDoc={generatePreview()}
              title="preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
