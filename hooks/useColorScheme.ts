import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { useThemeStore } from '@/store/useThemeStore';

export function useColorScheme() {
  const deviceTheme = useDeviceColorScheme();
  const { theme } = useThemeStore();
  
  return theme !== null && theme !== undefined ? theme : deviceTheme || 'light';
}
