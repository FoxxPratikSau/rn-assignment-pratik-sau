import axiosInstance from './axios';
import {
  ApiJobData,
  AdBannerData, 
  ParsedJobData,
  JobsApiResponse
} from './types';

const fetch = (page = 1) =>
  axiosInstance.get<JobsApiResponse>('/common/jobs', { params: { page } });

const getJobById = (jobId: number) =>
  axiosInstance.get<ApiJobData>(`/common/jobs/${jobId}`);

const parseJobData = (jobData: ApiJobData | AdBannerData): ParsedJobData => {
  if (jobData.type === 1040) {
    const adData = jobData as AdBannerData;
    return {
      isAd: true,
      imageUrl: adData.creatives?.[0]?.image_url,
      type: adData.type,
      order: adData.creatives?.[0]?.order_id
    };
  }
  
  const data = jobData as ApiJobData;
  return {
    id: data.id,
    title: data.title,
    type: data.type,
    company: data.company_name,
    location: data.primary_details?.Place,
    salary: {
      display: data.primary_details?.Salary,
      min: data.salary_min,
      max: data.salary_max
    },
    jobType: data.primary_details?.Job_Type,
    experience: data.primary_details?.Experience,
    qualification: data.primary_details?.Qualification,
    jobCategory: data.job_category,
    jobRole: data.job_role,
    openings: data.openings_count,
    tags: data.job_tags,
    details: data.other_details,
    contactInfo: {
      phone: data.custom_link?.replace('tel:', ''),
      whatsapp: data.whatsapp_no,
      whatsappLink: data.contact_preference?.whatsapp_link
    },
    creatives: data.creatives,
    isPremium: data.is_premium,
    expireOn: data.expire_on,
    applications: data.num_applications,
    created: data.created_on,
    updated: data.updated_on,
    contentV3: data.contentV3
  };
};

const jobsApi = { fetch, getJobById, parseJobData };

export default jobsApi; 