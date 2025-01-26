"use client"

import { useEffect, useState } from "react"
import ReactECharts from "echarts-for-react"
import type { DeviceType, MetricType, MetricData as ProcessedMetricData } from "@/types/metrics"
import { fetchMetricData } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/contexts/theme-context"

interface MetricsChartProps {
  metric: MetricType
  device: DeviceType
  title: string
}

export function MetricsChart({ metric, device, title }: MetricsChartProps) {
  const [data, setData] = useState<ProcessedMetricData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        const fetchedData = await fetchMetricData(metric, device)
        setData(fetchedData)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err instanceof Error ? err.message : "Failed to load data")
        setData([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [metric, device])

  const option = {
    darkMode: theme === "dark",
    backgroundColor: "transparent",
    grid: {
      left: "10%",
      right: "5%",
      bottom: "15%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.map((d) => new Date(d.timestamp * 1000).toLocaleDateString()),
      axisLabel: {
        color: theme === "dark" ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.65)",
        fontSize: 10,
        interval: "auto",
        rotate: 45,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: theme === "dark" ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.65)",
        fontSize: 10,
      },
    },
    series: [
      {
        data: data.map((d) => d.value),
        type: "line",
        smooth: true,
        lineStyle: {
          color: "#3b82f6",
          width: 2,
        },
        itemStyle: {
          color: "#3b82f6",
        },
        symbol: "circle",
        symbolSize: 6,
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const dataPoint = data[params[0].dataIndex]
        const date = new Date(dataPoint.timestamp * 1000).toLocaleDateString()
        const value = dataPoint.value.toFixed(4)
        return `${date}: ${value}`
      },
      backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
      borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      textStyle: {
        color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
        fontSize: 12,
      },
      confine: true,
    },
    responsive: true,
  }

  return (
    <Card className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} w-full`}>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        {loading ? (
          <div className="h-[200px] sm:h-[300px] flex items-center justify-center text-sm sm:text-base">Loading...</div>
        ) : error ? (
          <div className="h-[200px] sm:h-[300px] flex items-center justify-center text-red-500 text-sm sm:text-base">
            {error}
          </div>
        ) : data.length > 0 ? (
          <ReactECharts
            option={option}
            style={{ height: "200px", minHeight: "200px" }}
            className="w-full h-[200px] sm:h-[300px]"
            theme={theme === "dark" ? "dark" : undefined}
          />
        ) : (
          <div className="h-[200px] sm:h-[300px] flex items-center justify-center text-sm sm:text-base">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  )
}

