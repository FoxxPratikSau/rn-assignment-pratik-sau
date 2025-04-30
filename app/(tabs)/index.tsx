import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import JobDetailModal from '@/app/modals/JobDetailModal';
import ProfileModal from '@/app/modals/ProfileModal';
import JobsList from '@/components/JobsList';
import { useQueryClient } from '@tanstack/react-query';
import { ParsedJobData } from '@/api/types';
import { useRefreshHandler } from '@/hooks/useRefreshHandler';

const JobsScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const queryClient = useQueryClient();
  const [selectedJob, setSelectedJob] = useState<ParsedJobData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const [refreshing, handleRefresh] = useRefreshHandler(
    useCallback(() => queryClient.invalidateQueries({ queryKey: ['jobs'] }), [queryClient])
  );

  const handleJobPress = useCallback((job: ParsedJobData) => {
    setSelectedJob(job);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const openProfileModal = useCallback(() => {
    setProfileModalVisible(true);
  }, []);

  const closeProfileModal = useCallback(() => {
    setProfileModalVisible(false);
  }, []);

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['top', 'left', 'right']}
    >
      <View style={[styles.header, { 
        backgroundColor: colors.headerBackground,
        borderBottomColor: colors.headerBorder
      }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Jobs
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.headerButton, { backgroundColor: colors.buttonBackground }]}
            onPress={openProfileModal}
          >
            <Ionicons name="person-circle-outline" size={28} color={colors.icon} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.listContainer}>
        <JobsList 
          onJobPress={handleJobPress}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>

      <JobDetailModal 
        visible={modalVisible}
        job={selectedJob}
        onClose={closeModal}
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
  listContainer: {
    flex: 1,
  },
});

export default JobsScreen;
