export type DeviceType = "desktop" | "mobile"
export type MetricType = "lcp" | "cls"

export interface MetricResponse {
  timeseries: number[]
  values: number[]
}

export interface ProcessedMetricData {
  timestamp: number
  value: number
}

