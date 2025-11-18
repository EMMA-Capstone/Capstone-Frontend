'use client'

import AuthProvider from './AuthContext'
import Header from '../components/Header'

export default function ProvidersClient({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  )
}