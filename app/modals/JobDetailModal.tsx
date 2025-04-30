import React, { useState, ReactNode } from 'react';
import { View, Text, Modal, ScrollView, Pressable, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParsedJobData } from '@/api/types';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useBookmarksStore } from '@/store/useBookmarksStore';
import CompanyHeaderCard from '@/components/JobDetail/CompanyHeaderCard';
import JobTags from '@/components/JobDetail/JobTags';
import JobDetailsGrid from '@/components/JobDetail/JobDetailsGrid';
import JobDescriptionSection from '@/components/JobDetail/JobDescriptionSection';
import AdditionalInfoSection from '@/components/JobDetail/AdditionalInfoSection';
import WarningSection from '@/components/JobDetail/WarningSection';
import FooterActions from '@/components/JobDetail/FooterActions';
import {
  openWhatsAppChat,
  openPhoneDialer,
  getJobImageUrl,
  getContentV3Array,
  getShiftTimingFromContentV3,
} from './utils/jobDetailUtils';
import styles from './JobDetailModal.styles';

export type Job = ParsedJobData;

interface JobDetailModalProps {
  visible: boolean;
  job: Job | null;
  onClose: () => void;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const JobDetailModal = ({ visible, job, onClose }: JobDetailModalProps) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [expandedIndexes, setExpandedIndexes] = useState<{ [key: number]: boolean }>({});
  
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarksStore();
  const isJobBookmarked = job?.id ? isBookmarked(job.id.toString()) : false;

  const toggleBookmark = () => {
    if (!job || job.id === undefined) return;
    
    const jobId = job.id.toString();
    if (isJobBookmarked) {
      removeBookmark(jobId);
    } else {
      addBookmark(job);
    }
  };

  if (!job) return null;

  const imageUrl = getJobImageUrl(job);

  const jobData = job as any;
  const contentV3 = getContentV3Array(jobData);
  const shiftTimingFromContentV3 = getShiftTimingFromContentV3(contentV3);

  const toggleExpand = (idx: number) => {
    setExpandedIndexes(prev => ({ ...prev, [idx]: !prev[idx] }));
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
            Job Details
          </Text>
          <Pressable style={styles.favoriteButton} onPress={toggleBookmark}>
            <Ionicons 
              name={isJobBookmarked ? "heart" : "heart-outline"} 
              size={28} 
              color={isJobBookmarked ? colors.bookmarkActive : colors.text} 
            />
          </Pressable>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <CompanyHeaderCard job={job} jobData={jobData} imageUrl={imageUrl} colors={colors} styles={styles} />

          {job.title && (
            <View style={styles.heroSection}>
              <Text style={[styles.heroTitle, { color: colors.text }]}>{job.title}</Text>
            </View>
          )}

          <JobTags job={job} jobData={jobData} colors={colors} styles={styles} />

          {(job.applications || jobData.num_applications) && (
            <Text style={[styles.applicationsCountBelowTags, { color: colors.mutedText }]}>
              {job.applications || jobData.num_applications} Applications
            </Text>
          )}

          <JobDetailsGrid job={job} jobData={jobData} shiftTimingFromContentV3={shiftTimingFromContentV3} colors={colors} styles={styles} />

          {(jobData.other_details || job.details) && (
            <JobDescriptionSection description={jobData.other_details || job.details} colors={colors} styles={styles} />
          )}

          {Array.isArray(contentV3) && contentV3.length > 0 && (
            <AdditionalInfoSection
              contentV3={contentV3}
              expandedIndexes={expandedIndexes}
              toggleExpand={toggleExpand}
              colors={colors}
              styles={styles}
              colorScheme={colorScheme ?? 'light'}
            />
          )}
          
          <WarningSection jobData={jobData} colors={colors} styles={styles} />
        </ScrollView>

        <FooterActions
          onChat={() => openWhatsAppChat(jobData.whatsapp_no || (job.contactInfo?.whatsapp || ''))}
          onCall={() => openPhoneDialer(jobData.custom_link?.replace('tel:', '') || (job.contactInfo?.phone || ''))}
          colors={colors}
          styles={styles}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default JobDetailModal; 