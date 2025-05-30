//app/index.tsx
import 'react-native-gesture-handler';

import { useEffect, useState } from 'react';

import { AuthProvider } from '@/context/auth-context';
import AppRoutes from '@/routes/app-route';
import Splash from './public/splash';

export default function Index() {

  const [splashVisibility, setSplashVisibility] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisibility(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [])

  return (
    <AuthProvider>
      {
        splashVisibility ? <Splash /> : <AppRoutes />
      }
    </AuthProvider>
  )
}
