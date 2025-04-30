import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol, IconSymbolName } from './IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  iconName: IconSymbolName;
  iconColor?: string;
  iconBackground?: string;
  textColor?: string;
  subtitleColor?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  iconName,
  iconColor,
  iconBackground,
  textColor,
  subtitleColor,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Use the yellow tint for icon color by default
  const yellowTint = '#FFD700';
  
  // Default values use the yellow tint if not provided
  const finalIconColor = iconColor || yellowTint;
  const finalIconBackground = iconBackground || `${yellowTint}20`;
  const finalTextColor = textColor || colors.text;
  const finalSubtitleColor = subtitleColor || colors.mutedText;

  return (
    <View style={styles.content}>
      <View style={[styles.iconContainer, { backgroundColor: finalIconBackground }]}> 
        <IconSymbol size={40} name={iconName} color={finalIconColor} />
      </View>
      <Text style={[styles.title, { color: finalTextColor }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: finalSubtitleColor }]}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default EmptyState; 