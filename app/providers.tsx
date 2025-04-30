import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import queryClient from '@/utils/queryClient';
import { useThemeStore } from '@/store/useThemeStore';

export function Providers({ children }: { children: React.ReactNode }) {
  const deviceTheme = useDeviceColorScheme();
  const { theme, setTheme } = useThemeStore();
  
  useEffect(() => {
    if (theme === null || theme === undefined) {
      setTheme(deviceTheme || 'light');
    }
  }, [deviceTheme, theme, setTheme]);
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default Providers; 