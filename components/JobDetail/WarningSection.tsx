import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WarningSectionProps {
  jobData: any;
  colors: any;
  styles: any;
}

const WarningSection = ({ jobData, colors, styles }: WarningSectionProps) => (
  <View style={[styles.warningCard, { backgroundColor: colors.warningBackground }]}> 
    <View style={styles.warningHeader}>
      <Ionicons name="information-circle" size={24} color="#FF9500" />
      <Text style={[styles.warningTitle, { color: colors.text }]}>Recruiter Fees</Text>
    </View>
    <Text style={[styles.warningText, { color: colors.text }]}> 
      The recruiter may request payment for their services. Lokal does not 
      process any payments, please be cautious.
    </Text>
    <Text style={[styles.warningText, { color: colors.text }]}> 
      {jobData.fees_charged > 0 ? `A fee of ₹${jobData.fees_charged} may be requested.` : "No fee is required"}
    </Text>
  </View>
);

export default WarningSection; 