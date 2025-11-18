'use client'
import { CompostData } from '@/app/type/Compost'
import Cookies from 'js-cookie'
import { Thermometer, Droplet, FlaskConical } from 'lucide-react'

const phaseOrder = [
  "Mesophilic",
  "Thermophilic",
  "Cooling",
  "Maturation",
  "Finished"
]

export default async function getDashboardData() {
  const token = Cookies.get('Authorization') || ''
  const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/compost-bin/me`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${cleanedToken}` },
  })

  if (!response.ok) throw new Error('Fetching dashboard data failed')

  const result = await response.json()
  const compost = result || null
  const hasData = compost !== null

  const currentPhase = compost?.inference?.phase || "-"
  const currentIndex = phaseOrder.indexOf(currentPhase)
  const nextPhase =
    currentIndex >= 0 && currentIndex < phaseOrder.length - 1
      ? phaseOrder[currentIndex + 1]
      : "-"

  // Determine maturity level based on phase
  let level = "-"
  if (hasData) {
    if (["Mesophilic", "Thermophilic"].includes(currentPhase)) {
      level = "Early"
    } else if (currentPhase === "Cooling") {
      level = "Mid"
    } else if (["Maturation", "Finished"].includes(currentPhase)) {
      level = "Late"
    }
  }

  const formattedData: CompostData = {
    currentStatus: [
      {
        label: 'Temperature',
        value: hasData ? `${compost.binData.sensor_temp}°C` : '-',
        change: hasData ? '+5%' : '-',
        changeType: hasData ? 'positive' : 'neutral',
      },
      {
        label: 'Moisture',
        value: hasData ? `${compost.binData.sensor_humidity}%` : '-',
        change: hasData ? '-2%' : '-',
        changeType: hasData ? 'negative' : 'neutral',
      },
      {
        label: 'Stage',
        value: hasData ? `${currentPhase}` : '-',
        status: hasData ? nextPhase : '-',
      },
    ],
    maturity: {
      level,
      estimatedCompletion: hasData
        ? `${compost.inference.estimated_days_to_completion} Days`
        : '-',
      progressPercentage: hasData && compost.inference.estimated_days_to_completion < 40
        ? ((40 - compost.inference.estimated_days_to_completion) / 40) * 100
        : 0,
    },
    healthIndicators: [
      {
        name: 'Temperature',
        value: hasData ? `${compost.binData.sensor_temp}°C` : '-',
        icon: Thermometer,
      },
      {
        name: 'Moisture',
        value: hasData ? `${compost.binData.sensor_humidity}%` : '-',
        icon: Droplet,
      },
      {
        name: 'pH Level',
        value: hasData ? `${compost.binData.sensor_ph}` : '-',
        icon: FlaskConical,
      },
    ],
  }

  return formattedData
}
