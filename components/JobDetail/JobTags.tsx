import React from 'react';
import { View, Text } from 'react-native';

interface JobTagsProps {
  job: any;
  jobData: any;
  colors: any;
  styles: any;
}

const JobTags = ({ job, jobData, colors, styles }: JobTagsProps) => (
  <View style={styles.tagsContainer}>
    {jobData.job_tags && jobData.job_tags.length > 0 ? (
      jobData.job_tags.map((tag: any, index: number) => (
        <View 
          key={`tag-${index}`} 
          style={[
            styles.tag, 
            { backgroundColor: tag.bg_color || colors.tagBackground }
          ]}
        >
          <Text 
            style={[
              styles.tagText, 
              { color: tag.text_color || colors.tagText }
            ]}
          >
            {tag.value}
          </Text>
        </View>
      ))
    ) : job.tags && job.tags.length > 0 ? (
      job.tags.map((tag: any, index: number) => (
        <View 
          key={`tag-${index}`} 
          style={[styles.tag, { backgroundColor: colors.tagBackground }]}
        >
          <Text style={[styles.tagText, { color: colors.tagText }]}>{tag.value}</Text>
        </View>
      ))
    ) : (
      <View style={[styles.tag, { backgroundColor: colors.tagBackground }]}> 
        <Text style={[styles.tagText, { color: colors.tagText }]}> 
          {jobData.openings_count || job.openings || "40"} Vacancies
        </Text>
      </View>
    )}
    {jobData.job_hours === "Full time" && (
      <View style={[styles.tag, { backgroundColor: "#F6ECFE" }]}> 
        <Text style={[styles.tagText, { color: "#5D0B9E" }]}>Full time</Text>
      </View>
    )}
  </View>
);

export default JobTags; 