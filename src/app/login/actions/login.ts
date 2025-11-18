'use client'
import Cookies from 'js-cookie'

export default async function loginUser(
  email: string,
  password: string,
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) throw new Error('Login failed')

  const result = await response.json()

  Cookies.set('Authorization', `Bearer ${result.token}`, {
    expires: 1,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  return result
}
