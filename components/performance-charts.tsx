"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const layoutShiftData = {
  labels: ["1", "2", "3", "4", "5", "6", "7"],
  datasets: [
    {
      data: [0.35, 0.2, 0.12, 0.2, 0.15, 0.15, 0.1],
      borderColor: "rgb(59, 130, 246)",
      tension: 0.3,
    },
  ],
}

const contentfulPaintData = {
  labels: ["1", "2", "3", "4", "5", "6", "7"],
  datasets: [
    {
      data: [120, 130, 125, 100, 130, 100, 200],
      borderColor: "rgb(59, 130, 246)",
      tension: 0.3,
    },
  ],
}

export function PerformanceCharts() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-4 border rounded-lg">
        <h3 className="text-sm font-medium mb-4">Cumulative Layout Shift</h3>
        <Line options={options} data={layoutShiftData} />
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="text-sm font-medium mb-4">Largest Contentful Paint</h3>
        <Line options={options} data={contentfulPaintData} />
      </div>
    </div>
  )
}

