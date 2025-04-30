import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeStore } from '@/store/useThemeStore';

export default function BlurTabBarBackground() {
  const colorScheme = useColorScheme();
  const { theme } = useThemeStore();
  const isDarkMode = theme === 'dark' || (theme === null && colorScheme === 'dark');
  
  // Use the appropriate blur tint based on the theme
  const blurTint = isDarkMode ? 'dark' : 'light';
  
  return (
    <BlurView
      // Using explicit tint rather than systemChromeMaterial to ensure it respects our theme
      tint={blurTint}
      intensity={isDarkMode ? 80 : 95}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}
