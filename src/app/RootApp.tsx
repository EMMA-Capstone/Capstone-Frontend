'use client';

import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import AuthProvider from './context/AuthContext';
import Header from './components/Header';
import BottomNavbar from './components/BottomNavbar';

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  const [isNativeApp, setIsNativeApp] = useState(false);

  useEffect(() => {
    setIsNativeApp(Capacitor.isNativePlatform());
  }, []);

  return (
    <AuthProvider>
      {!isNativeApp && <Header />}
      {children}
      {isNativeApp && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <BottomNavbar />
        </div>
      )}
    </AuthProvider>
  );
}
