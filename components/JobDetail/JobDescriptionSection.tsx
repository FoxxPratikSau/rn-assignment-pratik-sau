import React from 'react';
import { Text } from 'react-native';
import ExpandableSection from './ExpandableSection';

interface JobDescriptionSectionProps {
  description: string;
  colors: any;
  styles: any;
}

const JobDescriptionSection = ({ description, colors, styles }: JobDescriptionSectionProps) => (
  <ExpandableSection
    title="Job Description"
    initiallyExpanded={true}
    cardStyle={[
      styles.descriptionCard, {
        backgroundColor: colors.cardBackground,
        borderColor: colors.detailsCardBorder
      }
    ]}
    headerStyle={{}}
    titleColor={colors.text}
    arrowColor={colors.text}
    styles={styles}
  >
    <Text style={[styles.descriptionText, { color: colors.text }]}> 
      {description || "No description provided"}
    </Text>
  </ExpandableSection>
);

export default JobDescriptionSection; 