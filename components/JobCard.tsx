import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import { ParsedJobData } from '@/api/types';
import { Ionicons } from '@expo/vector-icons';
import FooterButton from '@/components/FooterButton';
import { useBookmarksStore } from '@/store/useBookmarksStore';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { openPhoneDialer, openWhatsAppChat } from '@/app/modals/utils/jobDetailUtils';

interface JobCardProps {
  job: ParsedJobData;
  onPress: (job: ParsedJobData) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  if (!job) return null;

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarksStore();
  const isJobBookmarked = job.id ? isBookmarked(job.id.toString()) : false;

  const jobImage = job.creatives?.[0]?.thumb_url || job.creatives?.[0]?.file;
  const handleCallPress = () => {
    openPhoneDialer(job.contactInfo?.phone || '');
  };
  const handleChatPress = () => {
    openWhatsAppChat(job.contactInfo?.whatsapp || '');
  };

  const toggleBookmark = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (!job.id) return;
    
    const jobId = job.id.toString();
    if (isJobBookmarked) {
      removeBookmark(jobId);
    } else {
      addBookmark(job);
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { 
          backgroundColor: colors.cardBackground,
          borderColor: colors.cardBorder 
        }
      ]} 
      activeOpacity={0.85} 
      onPress={() => onPress(job)}
    >
      {/* Top Row: Image + Company/Job */}
      <View style={styles.topRow}>
        <View style={styles.imageContainer}>
          {jobImage ? (
            <Image source={{ uri: jobImage }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.imagePlaceholder, { backgroundColor: colors.placeholderBackground }]}>
              <Ionicons name="briefcase-outline" size={32} color={colors.icon} />
            </View>
          )}
        </View>
        <View style={styles.titleCompanyBlock}>
          <Text style={[styles.company, { color: colors.text }]} numberOfLines={1}>{job.company}</Text>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{job.jobRole}</Text>
          {job.salary?.display && (
            <Text style={styles.salary}>{job.salary.display}</Text>
          )}
        </View>
        <TouchableOpacity 
          style={styles.bookmarkButton} 
          onPress={toggleBookmark}
        >
          <Ionicons 
            name={isJobBookmarked ? "heart" : "heart-outline"} 
            size={26} 
            color={isJobBookmarked ? colors.bookmarkActive : colors.bookmarkInactive} 
          />
        </TouchableOpacity>
      </View>

      {job.openings !== undefined && job.openings > 0 && (
        <View style={[styles.vacancyTag, { backgroundColor: colors.buttonBackground }]}>
          <Text style={[styles.vacancyText, { color: colors.text }]}>{job.openings} Vacancies</Text>
        </View>
      )}
      
      <View style={styles.infoGrid2x2}>
        <View style={styles.infoGridRow}>
          <View style={[styles.infoGridCell, { backgroundColor: colors.infoBackground }]}>
            <Ionicons name="location-outline" size={18} color={colors.secondaryText} style={styles.infoGridIcon} />
            <Text style={[styles.infoGridValue, { color: colors.text }]} numberOfLines={1}>{job.location || '-'}</Text>
          </View>
          <View style={[styles.infoGridCell, { backgroundColor: colors.infoBackground }]}>
            <Ionicons name="time-outline" size={18} color={colors.secondaryText} style={styles.infoGridIcon} />
            <Text style={[styles.infoGridValue, { color: colors.text }]} numberOfLines={1}>{job.jobType || '-'}</Text>
          </View>
        </View>
        <View style={styles.infoGridRow}>
          <View style={[styles.infoGridCell, { backgroundColor: colors.infoBackground }]}>
            <Ionicons name="briefcase-outline" size={18} color={colors.secondaryText} style={styles.infoGridIcon} />
            <Text style={[styles.infoGridValue, { color: colors.text }]} numberOfLines={1}>{job.experience || '-'}</Text>
          </View>
          <View style={[styles.infoGridCell, { backgroundColor: colors.infoBackground }]}>
            <Ionicons name="people-outline" size={18} color={colors.secondaryText} style={styles.infoGridIcon} />
            <Text style={[styles.infoGridValue, { color: colors.text }]} numberOfLines={1}>{job.applications || 0}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonRow}>
        <FooterButton
          icon={<Ionicons name="logo-whatsapp" size={18} color={colors.chatButtonText} />}
          text="Chat"
          onPress={handleChatPress}
          style={{
            ...styles.chatButton,
            backgroundColor: colors.chatButtonBackground,
            borderColor: colors.chatButtonBorder
          }}
          textStyle={{
            ...styles.chatText,
            color: colors.chatButtonText
          }}
        />

        <FooterButton
          icon={<Ionicons name="call" size={18} color={colors.callButtonText} />}
          text="Call"
          onPress={handleCallPress}
          style={{
            ...styles.callButton,
            backgroundColor: colors.callButtonBackground
          }}
          textStyle={{
            ...styles.callText,
            color: colors.callButtonText
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    padding: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCompanyBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  company: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  salary: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00a000',
    marginBottom: 2,
  },
  bookmarkButton: {
    padding: 8,
    alignSelf: 'flex-start',
    marginTop: -4,
  },
  vacancyTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  vacancyText: {
    fontSize: 13,
    fontWeight: '500',
  },
  infoGrid2x2: {
    marginTop: 2,
    marginBottom: 10,
  },
  infoGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  infoGridCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 6,
  },
  infoGridIcon: {
    marginRight: 6,
  },
  infoGridValue: {
    fontSize: 11,
    fontWeight: '500',
    flexShrink: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
  },
  chatText: {
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 15,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: 8,
  },
  callText: {
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 15,
  },
});

export default JobCard; 