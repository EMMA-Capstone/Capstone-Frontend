import dynamic from 'next/dynamic'

// Import the client provider dynamically so layout stays a server component
const ProvidersClient = dynamic(() => import('./ProvidersClients'), { ssr: false })

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ProvidersClient>{children}</ProvidersClient>
}
