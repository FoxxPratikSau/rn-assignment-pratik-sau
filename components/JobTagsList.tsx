import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export interface JobTag {
  id: string;
  tag: string;
}

interface JobTagsListProps {
  tags: JobTag[];
}

const JobTagsList: React.FC<JobTagsListProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tags}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  listContainer: {
    paddingRight: 8,
  },
  tagContainer: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#555555',
  },
});

export default JobTagsList; 