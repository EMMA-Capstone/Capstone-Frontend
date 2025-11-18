'use client'
import Cookies from 'js-cookie'

export default async function registerUser(
  email: string,
  username: string,
  password: string,
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username ,password }),
  })

  if (!response.ok) throw new Error('Login failed')

  const result = await response.json()

  Cookies.set('Authorization', `Bearer ${result.token}`, {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  return result
}
