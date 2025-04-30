import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Switch, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useThemeStore } from '@/store/useThemeStore';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileModal = ({ visible, onClose }: ProfileModalProps) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { theme, toggleTheme } = useThemeStore();
  
  const [localIsDark, setLocalIsDark] = useState(theme === 'dark');
  
  const yellowTint = '#FFD700';

  useEffect(() => {
    setLocalIsDark(theme === 'dark');
  }, [theme]);

  const handleToggleTheme = () => {
    setLocalIsDark(!localIsDark);
    toggleTheme();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <SafeAreaView 
        style={[
          styles.container,
          { backgroundColor: colors.background }
        ]}
        edges={['top', 'bottom']}
      >
        <View style={[styles.header, { borderBottomColor: colors.divider }]}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons 
              name="close" 
              size={28} 
              color={colors.text} 
            />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Profile
          </Text>
          <View style={styles.placeholderView} />
        </View>

        <View style={styles.content}>
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={handleToggleTheme}
            style={[styles.settingItem, { borderBottomColor: colors.divider }]}
          >
            <View style={styles.settingLeftContent}>
              <View style={[styles.iconContainer, { backgroundColor: `${yellowTint}30` }]}>
                <Ionicons 
                  name={localIsDark ? "moon" : "sunny"} 
                  size={24} 
                  color={yellowTint} 
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.settingText, { color: colors.text }]}>
                  {localIsDark ? 'Dark Mode' : 'Light Mode'}
                </Text>
                <Text style={[styles.settingSubtext, { color: colors.mutedText }]}>
                  {localIsDark ? 'Switch to light theme' : 'Switch to dark theme'}
                </Text>
              </View>
            </View>
            <Switch
              value={localIsDark}
              onValueChange={handleToggleTheme}
              trackColor={{ false: '#767577', true: `${yellowTint}50` }}
              thumbColor={localIsDark ? yellowTint : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              style={Platform.OS === 'ios' ? styles.iOSSwitch : styles.androidSwitch}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderView: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingText: {
    fontSize: 18,
    fontWeight: '500',
  },
  settingSubtext: {
    fontSize: 14,
    marginTop: 2,
  },
  iOSSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  androidSwitch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});

export default ProfileModal; 