import React from 'react';
import { View, Text } from 'react-native';
import ExpandableSection from './ExpandableSection';

interface AdditionalInfoSectionProps {
  contentV3: any[];
  expandedIndexes: { [key: number]: boolean };
  toggleExpand: (idx: number) => void;
  colors: any;
  styles: any;
  colorScheme: string;
}

const AdditionalInfoSection = ({
  contentV3,
  expandedIndexes,
  toggleExpand,
  colors,
  styles,
  colorScheme,
}: AdditionalInfoSectionProps) => (
  <ExpandableSection
    title="Additional Information"
    initiallyExpanded={true}
    cardStyle={[
      styles.moreDetailsCard, {
        backgroundColor: colors.cardBackground,
        borderColor: colors.detailsCardBorder
      }
    ]}
    headerStyle={{}}
    titleColor={colorScheme === 'dark' ? '#fff' : colors.text}
    arrowColor={colorScheme === 'dark' ? '#fff' : '#333'}
    styles={styles}
  >
    {contentV3
      .filter(item => item && item.field_value && item.field_value.trim() !== '')
      .map((item: any, idx: number) => {
        const isLong = item.field_value.length > 120;
        const expanded = expandedIndexes[idx];
        const displayValue = isLong && !expanded
          ? item.field_value.slice(0, 120) + '...'
          : item.field_value;
        return (
          <View key={`content-v3-${idx}`} style={[styles.moreDetailsRow, { borderBottomColor: colors.divider }]}> 
            <Text style={[styles.moreDetailsLabel, { color: colorScheme === 'dark' ? '#fff' : colors.text }]}> 
              {(item.field_key || '').replace(/_/g, ' ').split(' ').map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              ).join(' ')}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.moreDetailsValue, { color: colorScheme === 'dark' ? '#fff' : colors.text }]}>{displayValue}</Text>
              {isLong && (
                <Text
                  style={[styles.showMoreLess, { color: colors.tint }]}
                  onPress={() => toggleExpand(idx)}
                >
                  {expanded ? 'Show less' : 'Show more'}
                </Text>
              )}
            </View>
          </View>
        );
      })}
  </ExpandableSection>
);

export default AdditionalInfoSection; 