import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface JobDetailsGridProps {
  job: any;
  jobData: any;
  shiftTimingFromContentV3?: string;
  colors: any;
  styles: any;
}

const JobDetailsGrid = ({ job, jobData, shiftTimingFromContentV3, colors, styles }: JobDetailsGridProps) => {
  const details = [
    {
      icon: <Ionicons name="cash-outline" size={18} color={colors.secondaryText} />, 
      label: 'Salary',
      value: job.salary?.display || jobData.primary_details?.Salary,
    },
    {
      icon: <Ionicons name="location-outline" size={18} color={colors.secondaryText} />, 
      label: 'Location',
      value: job.location || jobData.primary_details?.Place,
    },
    {
      icon: <MaterialCommunityIcons name="briefcase-outline" size={18} color={colors.secondaryText} />, 
      label: 'Experience',
      value: job.experience || jobData.primary_details?.Experience,
    },
    {
      icon: <Ionicons name="time-outline" size={18} color={colors.secondaryText} />, 
      label: 'Job Type',
      value: job.jobType || jobData.job_hours,
    },
    {
      icon: <Ionicons name="time-outline" size={18} color={colors.secondaryText} />, 
      label: 'Shift Timing',
      value: shiftTimingFromContentV3 || jobData.job_hours,
    },
    {
      icon: <Ionicons name="school-outline" size={18} color={colors.secondaryText} />, 
      label: 'Qualification',
      value: job.qualification || jobData.primary_details?.Qualification,
    },
    {
      icon: <Ionicons name="people-outline" size={18} color={colors.secondaryText} />, 
      label: 'Vacancies',
      value: job.openings || jobData.openings_count,
    },
    {
      icon: <Ionicons name="calendar-outline" size={18} color={colors.secondaryText} />, 
      label: 'Category',
      value: job.jobCategory || jobData.job_category,
    },
  ].filter(item => item.value !== undefined && item.value !== null && item.value !== '');

  const rows = details.reduce((rows: any[][], item, idx, arr) => {
    if (idx % 2 === 0) rows.push(arr.slice(idx, idx + 2));
    return rows;
  }, []);

  return (
    <View style={[styles.detailCard, { backgroundColor: colors.cardBackground, borderColor: colors.detailsCardBorder }]}> 
      <View style={styles.cardHeaderRow}>
        <Text style={[styles.detailCardTitle, { color: colors.text }]}>Job Details</Text>
      </View>
      <View style={styles.detailGrid}>
        {rows.map((pair, rowIdx) => (
          <View key={`detail-row-${rowIdx}`} style={styles.detailGridRow}>
            {pair.map((item, colIdx) => (
              <View key={`detail-col-${colIdx}`} style={[styles.detailGridCol, { backgroundColor: colors.infoBackground }]}> 
                <View style={styles.detailIconContainer}>{item.icon}</View>
                <View style={styles.detailTextContainer}>
                  <Text style={[styles.detailLabelSmall, { color: colors.mutedText }]}>{item.label}</Text>
                  <Text style={[styles.detailValueSmall, { color: colors.text }]}>{item.value}</Text>
                </View>
              </View>
            ))}
            {pair.length < 2 && <View style={styles.detailGridColEmpty} />}
          </View>
        ))}
      </View>
    </View>
  );
};

export default JobDetailsGrid; 