import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeStore } from '@/store/useThemeStore';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { theme } = useThemeStore();
  const isDarkMode = theme === 'dark' || (theme === null && colorScheme === 'dark');
  
  const yellowTint = '#FFD700';
  
  useEffect(() => {
  }, [theme, colorScheme]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#000000' : '#000000',
        tabBarInactiveTintColor: isDarkMode ? '#9BA1A6' : colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarActiveBackgroundColor: yellowTint,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: isDarkMode ? colors.headerBackground : colors.background,
            borderTopColor: isDarkMode ? colors.headerBorder : colors.divider,
            borderTopWidth: 0.5,
          },
          default: {
            backgroundColor: isDarkMode ? colors.headerBackground : colors.background,
            borderTopColor: isDarkMode ? colors.headerBorder : colors.divider,
            borderTopWidth: 0.5,
          },
        }),
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={24} 
              name="briefcase.fill" 
              color={focused ? '#000000' : color} 
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={24} 
              name="bookmark.fill" 
              color={focused ? '#000000' : color} 
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
