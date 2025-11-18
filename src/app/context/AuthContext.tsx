'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import getMe from './actions/getMe'
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';

interface Bin{
  id: string,
  batches: string,
}

interface UserAccount {
  user_id: string
  username: string
  profile_url: string
  notifications: AccountNotification[]
  bin: Bin[]
}

interface AuthContextType {
  userAccount: UserAccount | null
  login: () => void
  setToken: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null)
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null)
  const router = useRouter() 

  // Restore user on app start
  useEffect(() => {
    const authHeader = cookies.get('Authorization')
    const token = authHeader?.split(' ')[1] // remove 'Bearer '
        if (token) restoreUser()
  }, [])

  async function restoreUser() {
    try {
      const account = await getMe();

      if (account?.data?.username) {
        const newUser = {
          user_id: account.data.userId,
          username: account.data.username,
          profile_url: '',
          notifications: [],
          bin: account.bin || [],
        };
      
        setUserAccount(newUser); // ✅ sets state
        localStorage.setItem('userAccount', JSON.stringify(newUser)); // ✅ store snapshot immediately
        console.log('📡 getMe response:', account);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (err) {
      console.error('Failed to restore user:', err)
      localStorage.removeItem('authToken')
    }
  }

  // Connect socket when userAccount is ready
  useEffect(() => {
    if (!userAccount) return

    // Connect via query param (no auth header)
    const newSocket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`, {
      transports: ['websocket'],
      query: { userId: userAccount.user_id },
    })

    setSocket(newSocket)

    newSocket.on('connect', () => {
      console.log('✅ Connected to socket as', userAccount.user_id)
    })

    newSocket.on('notification', (notif: AccountNotification) => {
      console.log('🔔 New notification:', notif);
      setUserAccount(prev =>
        prev
          ? { ...prev, notifications: [notif, ...prev.notifications] }
          : prev
      );
    });
    

    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected')
    })

    return () => {
      newSocket.disconnect()
    }
  }, [userAccount])

  const login = async () => {
    const account = await getMe()
    setUserAccount({
      user_id: account.data.userId,
      username: account.data.username,
      profile_url: '',
      notifications: [],
      bin: (account.bin ?? []).map((b: { id: string }) => b.id),
    })    
  }

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token)
  }

  const logout = () => {
    setUserAccount(null)
    localStorage.removeItem('authToken')
    cookies.remove('Authorization')
    socket?.disconnect()
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ userAccount, login, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthProvider
