import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useJobsList } from '@/hooks/reactQuery/useJobsApi';
import JobCard from '@/components/JobCard';
import { ParsedJobData } from '@/api/types';
import EmptyState from '@/components/ui/EmptyState';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface AdBannerProps {
  imageUrl?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ imageUrl }) => {
  if (!imageUrl) return null;
  
  return (
    <TouchableOpacity style={styles.adContainer} activeOpacity={0.9}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.adImage}
        resizeMode="cover"
      />
      
      <View style={styles.adBadge}>
        <Text style={styles.adBadgeText}>Ad</Text>
      </View>
    </TouchableOpacity>
  );
};

interface JobsListProps {
  onJobPress: (job: ParsedJobData) => void;
  refreshing: boolean;
  onRefresh: () => void;
}

const JobsList: React.FC<JobsListProps> = ({ onJobPress, refreshing, onRefresh }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useJobsList();

  const flattenedData = React.useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap(page => page.items);
  }, [data]);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: ParsedJobData }) => {
    // Render ad banner
    if (item.isAd) {
      return <AdBanner imageUrl={item.imageUrl} />;
    }
    
    return <JobCard job={item} onPress={() => onJobPress(item)} />;
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    
    return (
      <View style={styles.loaderFooter}>
        <ActivityIndicator size="small" color={colors.tint} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
          <Text style={[styles.emptyText, { color: colors.mutedText }]}>
            Loading jobs...
          </Text>
        </View>
      );
    }

    if (isError) {
      return (
        <EmptyState
          title="Couldn't Load Jobs"
          subtitle={error instanceof Error ? error.message : 'Something went wrong. Pull to refresh and try again.'}
          iconName="exclamationmark.triangle.fill"
        />
      );
    }

    return (
      <EmptyState
        title="No Jobs Found"
        subtitle="We couldn't find any jobs matching your criteria."
        iconName="briefcase.fill"
      />
    );
  };

  return (
    <FlashList
      data={flattenedData}
      renderItem={renderItem}
      keyExtractor={(item) => (item.isAd ? `ad-${item.order}` : `job-${item.id}`)}
      estimatedItemSize={150}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.contentContainer}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 90 : 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    minHeight: 300,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  loaderFooter: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  adContainer: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adImage: {
    width: '100%',
    height: 140,
  },
  adBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  adBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  }
});

export default JobsList; 