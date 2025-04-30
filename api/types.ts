export interface JobTag {
  value: string;
  bg_color: string;
  text_color: string;
}

export interface JobCreative {
  file: string;
  thumb_url: string;
  creative_type: number;
}

export interface ContactPreference {
  preference: number;
  whatsapp_link: string;
  preferred_call_start_time: string;
  preferred_call_end_time: string;
}

export interface ApiJobData {
  id: number;
  title: string;
  type: number;
  primary_details: {
    Place: string;
    Salary: string;
    Job_Type: string;
    Experience: string;
    Fees_Charged: string;
    Qualification: string;
  };
  job_tags: JobTag[];
  job_type: number;
  job_category_id: number;
  qualification: number;
  experience: number;
  shift_timing: number;
  job_role_id: number;
  salary_max: number | null;
  salary_min: number | null;
  city_location: number;
  locality: number;
  premium_till: string | null;
  content: string;
  company_name: string;
  advertiser: number;
  button_text: string;
  custom_link: string;
  whatsapp_no: string;
  contact_preference: ContactPreference;
  created_on: string;
  updated_on: string;
  is_premium: boolean;
  creatives: JobCreative[];
  videos: any[];
  locations: Array<{id: number, locale: string, state: number}>;
  tags: any[];
  contentV3: { V3: Array<{field_key: string, field_name: string, field_value: string}> };
  status: number;
  expire_on: string;
  job_hours: string;
  openings_count: number;
  job_role: string;
  job_category: string;
  other_details: string;
  num_applications: number;
  job_location_slug: string;
}

export interface AdBannerData {
  type: number;
  creatives: Array<{
    order_id: number;
    image_url: string;
  }>;
}

export interface ParsedJobData {
  isAd?: boolean;
  imageUrl?: string;
  order?: number;
  id?: number;
  title?: string;
  type?: number;
  company?: string;
  location?: string;
  salary?: {
    display: string;
    min: number | null;
    max: number | null;
  };
  jobType?: string;
  experience?: string;
  qualification?: string;
  jobCategory?: string;
  jobRole?: string;
  openings?: number;
  tags?: JobTag[];
  details?: string;
  contactInfo?: {
    phone: string;
    whatsapp: string;
    whatsappLink: string;
  };
  creatives?: JobCreative[];
  isPremium?: boolean;
  expireOn?: string;
  applications?: number;
  created?: string;
  updated?: string;
  contentV3?: { V3: Array<{field_key: string, field_name: string, field_value: string}> };
}

export interface JobsApiResponse {
  results: Array<ApiJobData | AdBannerData>;
}

export interface ParsedJobListResponse {
  items: ParsedJobData[];
  hasMore: boolean;
  nextPage: number;
} 