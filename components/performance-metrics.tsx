"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gauge, Zap, Clock, Smartphone, Laptop, Cpu, BarChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type Metric = {
  name: string
  value: number
  target: number
  unit: string
  icon: React.ElementType
  color: string
}

type HistoricalData = {
  date: string
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
}

export function PerformanceMetrics() {
  const [activeTab, setActiveTab] = useState("lighthouse")

  const metrics: Metric[] = [
    {
      name: "Performance",
      value: 98,
      target: 90,
      unit: "/100",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Accessibility",
      value: 100,
      target: 90,
      unit: "/100",
      icon: Smartphone,
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "Best Practices",
      value: 95,
      target: 90,
      unit: "/100",
      icon: Laptop,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "SEO",
      value: 100,
      target: 90,
      unit: "/100",
      icon: BarChart,
      color: "from-orange-500 to-red-500",
    },
    {
      name: "First Contentful Paint",
      value: 0.8,
      target: 1.8,
      unit: "s",
      icon: Clock,
      color: "from-teal-500 to-green-500",
    },
    {
      name: "Total Blocking Time",
      value: 0,
      target: 200,
      unit: "ms",
      icon: Cpu,
      color: "from-red-500 to-orange-500",
    },
  ]

  const historicalData: HistoricalData[] = [
    { date: "Jan", performance: 85, accessibility: 90, bestPractices: 85, seo: 92 },
    { date: "Feb", performance: 88, accessibility: 92, bestPractices: 88, seo: 94 },
    { date: "Mar", performance: 90, accessibility: 95, bestPractices: 90, seo: 95 },
    { date: "Apr", performance: 92, accessibility: 96, bestPractices: 92, seo: 96 },
    { date: "May", performance: 94, accessibility: 98, bestPractices: 93, seo: 98 },
    { date: "Jun", performance: 98, accessibility: 100, bestPractices: 95, seo: 100 },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-gradient" />
            Performance Metrics
          </CardTitle>
          <CardDescription>Lighthouse scores and core web vitals for this portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="lighthouse" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="lighthouse">Lighthouse Scores</TabsTrigger>
              <TabsTrigger value="historical">Historical Data</TabsTrigger>
            </TabsList>

            <TabsContent value="lighthouse" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glassmorphism p-4 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full bg-gradient-to-r ${metric.color}`}>
                          <metric.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-sm">{metric.name}</span>
                      </div>
                      <div className="text-xl font-bold">
                        {metric.value}
                        {metric.unit}
                      </div>
                    </div>

                    <div className="relative h-2 bg-black/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            metric.unit === "/100"
                              ? `${metric.value}%`
                              : `${Math.min(100, (metric.target / metric.value) * 100)}%`,
                        }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                      />
                    </div>

                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>0{metric.unit}</span>
                      <span>
                        Target: {metric.target}
                        {metric.unit}
                      </span>
                      {metric.unit === "/100" && <span>100{metric.unit}</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="historical" className="m-0">
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    performance: {
                      label: "Performance",
                      color: "hsl(var(--chart-1))",
                    },
                    accessibility: {
                      label: "Accessibility",
                      color: "hsl(var(--chart-2))",
                    },
                    bestPractices: {
                      label: "Best Practices",
                      color: "hsl(var(--chart-3))",
                    },
                    seo: {
                      label: "SEO",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="performance" stroke="var(--color-performance)" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="accessibility"
                        stroke="var(--color-accessibility)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="bestPractices"
                        stroke="var(--color-bestPractices)"
                        strokeWidth={2}
                      />
                      <Line type="monotone" dataKey="seo" stroke="var(--color-seo)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
