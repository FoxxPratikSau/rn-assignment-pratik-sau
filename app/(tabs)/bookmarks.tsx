import React, { useState } from 'react';
import { StyleSheet, View, Text, RefreshControl, Pressable, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useBookmarksStore, useBookmarksHydration } from '@/store/useBookmarksStore';
import JobCard from '@/components/JobCard';
import { ParsedJobData } from '@/api/types';
import JobDetailModal from '@/app/modals/JobDetailModal';
import ProfileModal from '@/app/modals/ProfileModal';
import EmptyState from '@/components/ui/EmptyState';
import { useRefreshHandler } from '@/hooks/useRefreshHandler';

const BookmarksScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { bookmarkedJobs, clearAllBookmarks } = useBookmarksStore();
  const bookmarksHydrated = useBookmarksHydration();
  
  const [refreshing, onRefresh] = useRefreshHandler(
    () => new Promise<void>(resolve => setTimeout(resolve, 1000))
  );
  const [selectedJob, setSelectedJob] = useState<ParsedJobData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const bookmarkedJobsArray = Object.values(bookmarkedJobs);

  const handleJobPress = (job: ParsedJobData) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const openProfileModal = () => {
    setProfileModalVisible(true);
  };

  const closeProfileModal = () => {
    setProfileModalVisible(false);
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Bookmarks",
      "Are you sure you want to remove all bookmarked jobs?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Clear All",
          onPress: clearAllBookmarks,
          style: "destructive"
        }
      ]
    );
  };

  if (!bookmarksHydrated) {
    return (
      <SafeAreaView 
        style={[styles.container, { backgroundColor: colors.background }]} 
        edges={['top', 'left', 'right']}
      >
        <View style={[styles.header, { 
          backgroundColor: colors.headerBackground,
          borderBottomColor: colors.headerBorder 
        }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Bookmarks</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={[styles.headerButton, { backgroundColor: colors.buttonBackground }]}
              onPress={openProfileModal}
            >
              <Ionicons name="person-circle-outline" size={28} color={colors.icon} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
          <Text style={[styles.loadingText, { color: colors.mutedText }]}>Loading bookmarks...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['top', 'left', 'right']}
    >
      <View style={[styles.header, { 
        backgroundColor: colors.headerBackground,
        borderBottomColor: colors.headerBorder 
      }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Bookmarks</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.headerButton, { backgroundColor: colors.buttonBackground }]}
            onPress={openProfileModal}
          >
            <Ionicons name="person-circle-outline" size={28} color={colors.icon} />
          </TouchableOpacity>
        </View>
      </View>
      
      {bookmarkedJobsArray.length > 0 && (
        <View style={[styles.statsBar, { 
          backgroundColor: colors.statsBarBackground,
          borderBottomColor: colors.headerBorder 
        }]}>
          <Text style={[styles.statsText, { color: colors.mutedText }]}>
            {bookmarkedJobsArray.length} {bookmarkedJobsArray.length === 1 ? 'job' : 'jobs'} bookmarked
          </Text>
          <Pressable onPress={handleClearAll} style={styles.deleteAllButton}>
            <Text style={[styles.deleteAllText, { color: colors.danger }]}>Delete all</Text>
          </Pressable>
        </View>
      )}
      
      {bookmarkedJobsArray.length > 0 ? (
        <FlashList
          data={bookmarkedJobsArray}
          keyExtractor={(item) => `bookmarked-job-${item.id}`}
          renderItem={({ item }) => (
            <JobCard job={item} onPress={handleJobPress} />
          )}
          estimatedItemSize={200}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor={colors.tint}
              colors={[colors.tint]}
            />
          }
        />
      ) : (
        <EmptyState
          title="No Bookmarks Yet"
          subtitle="Save jobs you're interested in to view them later"
          iconName="bookmark.fill"
        />
      )}

      <JobDetailModal
        visible={modalVisible}
        job={selectedJob}
        onClose={handleCloseModal}
      />

      <ProfileModal
        visible={profileModalVisible}
        onClose={closeProfileModal}
      />
    </SafeAreaView>
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
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  statsBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsText: {
    fontSize: 14,
  },
  deleteAllButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteAllText: {
    fontSize: 15,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 12,
  },
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
  listContainer: {
    padding: 12,
  },
});

export default BookmarksScreen; 