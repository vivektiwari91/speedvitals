"use client"

import type { DeviceType } from "@/types/metrics"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DeviceSelectorProps {
  // eslint-disable-next-line no-unused-vars
  value: DeviceType
  onChange: (value: DeviceType) => void
}

// eslint-disable-next-line no-unused-vars
export function DeviceSelector({ value, onChange }: DeviceSelectorProps) {
  return (
    <div className="flex items-center gap-4" style={{ justifyContent: "center" }}>
      <span className="text-lg font-medium">Choose a Device</span>
      <Select value={value} onValueChange={onChange as (value: string) => void}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select device" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desktop">Desktop</SelectItem>
          <SelectItem value="mobile">Mobile</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

