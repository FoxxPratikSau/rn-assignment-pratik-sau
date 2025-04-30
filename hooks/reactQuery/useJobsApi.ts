import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import jobsApi from '@/api/jobs';
import { ParsedJobData, ParsedJobListResponse, ApiJobData, AdBannerData, JobsApiResponse } from '@/api/types';

export const useJobsList = (initialPage = 1) => {
  return useInfiniteQuery({
    queryKey: ['jobs'],
    queryFn: async ({ pageParam = initialPage }) => {
      const response = await jobsApi.fetch(pageParam);
      const data = response as unknown as JobsApiResponse;
      const processed = data.results.map((item: ApiJobData | AdBannerData) => jobsApi.parseJobData(item));
      
      const result: ParsedJobListResponse = {
        items: processed,
        hasMore: processed.filter((item: ParsedJobData) => !item.isAd).length > 0,
        nextPage: pageParam + 1
      };
      
      return result;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    initialPageParam: initialPage,
  });
};

export const useJobDetails = (jobId: number | undefined) => {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response = await jobsApi.getJobById(jobId);
      const data = response as unknown as ApiJobData;
      return jobsApi.parseJobData(data);
    },
    enabled: !!jobId,
  });
};

export interface JobSearchFilters {
  category?: string;
  location?: string;
  keyword?: string;
}

export const useJobSearch = (filters: JobSearchFilters = {}, initialPage = 1) => {
  return useInfiniteQuery({
    queryKey: ['jobs', 'search', filters],
    queryFn: async ({ pageParam = initialPage }) => {
      const response = await jobsApi.fetch(pageParam);
      const data = response as unknown as JobsApiResponse;
      let filtered = data.results as (ApiJobData | AdBannerData)[];
      if (filters.category) {
        filtered = filtered.filter((job: any) => 'job_category' in job && job.job_category === filters.category);
      }
      if (filters.location) {
        filtered = filtered.filter((job: any) => 'job_location_slug' in job && job.job_location_slug === filters.location);
      }
      if (filters.keyword) {
        filtered = filtered.filter((job: any) =>
          'title' in job && job.title.toLowerCase().includes(filters.keyword!.toLowerCase()));
      }
      
      const processed = filtered.map((item: ApiJobData | AdBannerData) => jobsApi.parseJobData(item));
      
      const result: ParsedJobListResponse = {
        items: processed,
        hasMore: processed.filter((item: ParsedJobData) => !item.isAd).length > 0,
        nextPage: pageParam + 1
      };
      
      return result;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    initialPageParam: initialPage,
  });
};

export default { useJobsList, useJobDetails, useJobSearch }; 