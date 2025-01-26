import type { DeviceType, MetricType, MetricResponse, ProcessedMetricData } from "@/types/metrics"

const BASE_URL = "https://example-metrics.speedvitals.workers.dev"

export async function fetchMetricData(metric: MetricType, device: DeviceType): Promise<ProcessedMetricData[]> {
  try {
    const response = await fetch(`${BASE_URL}/?metric=${metric}&device=${device}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: MetricResponse = await response.json()

    if (!data.timeseries || !data.values || data.timeseries.length !== data.values.length) {
      console.error("Received data:", JSON.stringify(data))
      throw new Error(`Invalid data format received from API for ${metric}_${device}`)
    }

    return data.timeseries.map((timestamp, index) => ({
      timestamp,
      value: data.values[index],
    }))
  } catch (error) {
    console.error("Error in fetchMetricData:", error)
    throw error
  }
}

