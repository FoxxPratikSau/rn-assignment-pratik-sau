import React, { useState, ReactNode } from 'react';
import { View, Text, Pressable, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  initiallyExpanded?: boolean;
  headerStyle?: any;
  cardStyle?: any;
  titleColor?: string;
  arrowColor?: string;
  styles: any;
}

const ExpandableSection = ({
  title,
  children,
  initiallyExpanded = true,
  headerStyle = {},
  cardStyle = {},
  titleColor,
  arrowColor,
  styles,
}: ExpandableSectionProps) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  return (
    <View style={[styles.expandableCard, cardStyle]}>
      <Pressable
        style={[styles.cardHeaderRow, !expanded && styles.cardHeaderRowCenter, headerStyle]}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setExpanded(e => !e);
        }}
      >
        <Text style={[styles.moreDetailsTitle, titleColor ? { color: titleColor } : null]}>{title}</Text>
        <Ionicons
          name={expanded ? 'chevron-down' : 'chevron-forward'}
          size={22}
          color={arrowColor || '#333'}
          style={styles.cardHeaderArrow}
        />
      </Pressable>
      {expanded && children}
    </View>
  );
};

export default ExpandableSection; 