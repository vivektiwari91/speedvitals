"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { DeviceSelector } from "@/components/device-selector"
import { MetricsChart } from "@/components/metrics-chart"
import type { DeviceType } from "@/types/metrics"
import { ThemeProvider, useTheme } from "@/contexts/theme-context"
import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert" className="text-red-500 p-4">
      <p>Something went wrong:</p>
      <pre className="text-sm whitespace-pre-wrap">{error.message}</pre>
      <button onClick={resetErrorBoundary} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Try again
      </button>
    </div>
  )
}

function Dashboard() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>("desktop")
  const { theme } = useTheme()

  return (
    <div
      className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <NavBar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div style={{ textAlign : "center"}}>
          <h1 className="text-4xl font-bold mb-8">SpeedVitals Internship Assessment</h1>

          <div className="mb-8">
            <DeviceSelector value={selectedDevice} onChange={setSelectedDevice} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              
            }}
          >
            <MetricsChart metric="cls" device={selectedDevice} title="Cumulative Layout Shift" />
          </ErrorBoundary>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              
            }}
          >
            <MetricsChart metric="lcp" device={selectedDevice} title="Largest Contentful Paint" />
          </ErrorBoundary>
        </div>
      </main>

      <footer
        className={`border-t py-6 text-center text-sm ${theme === "dark" ? "text-gray-400 border-gray-700" : "text-gray-600 border-gray-200"}`}
      >
        Copyright © 2025
      </footer>
    </div>
  )
}

export default function Page() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}

