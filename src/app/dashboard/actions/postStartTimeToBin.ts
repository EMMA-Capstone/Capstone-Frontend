'use client'
import Cookies from 'js-cookie'

export default async function startCompost(
    deviceId: string,
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/compost-bin/start`, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('Authorization')?.replace('Bearer ', '') || ''}`,
     },
    body: JSON.stringify({ deviceId }),
  })

  if (!response.ok) throw new Error('Connection to bin failed')

  const result = await response.json()

  return result
}
