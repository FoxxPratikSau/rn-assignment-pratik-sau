import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CompanyHeaderCardProps {
  job: any;
  jobData: any;
  imageUrl?: string;
  colors: any;
  styles: any;
}

const CompanyHeaderCard = ({ job, jobData, imageUrl, colors, styles }: CompanyHeaderCardProps) => (
  <View style={[styles.companyCard, { backgroundColor: colors.cardBackground }]}> 
    {imageUrl ? (
      <Image source={{ uri: imageUrl }} style={styles.companyImage} />
    ) : (
      <View style={[styles.companyImagePlaceholder, { backgroundColor: colors.placeholderBackground }]}> 
        <Text style={[styles.companyImagePlaceholderText, { color: colors.secondaryText }]}> 
          {job.company?.charAt(0) || 'S'}
        </Text>
      </View>
    )}
    <View style={styles.companyInfo}>
      {job.jobRole && (
        <Text style={[styles.roleName, { color: colors.secondaryText }]}>{job.jobRole}</Text>
      )}
      {(job.jobCategory || jobData.job_category) && (
        <Text style={[styles.categoryName, { color: colors.mutedText }]}>{job.jobCategory || jobData.job_category}</Text>
      )}
      <View style={styles.companyTitleRow}>
        <Text style={[styles.companyName, { color: colors.text }]}> 
          {job.company || "Satyam Home Care Services"}
        </Text>
        {job.isPremium && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={colors.tint} />
          </View>
        )}
      </View>
    </View>
  </View>
);

export default CompanyHeaderCard; 