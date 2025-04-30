// Utility functions for JobDetailModal
import { Linking } from 'react-native';

export const openWhatsAppChat = (rawNumber: string | undefined | null): void => {
  if (!rawNumber) return;
  const digitsOnly = rawNumber.replace(/\D/g, '');
  const phoneWithCountryCode = digitsOnly.startsWith('91') ? digitsOnly : `91${digitsOnly}`;
  const whatsappUrl = `https://wa.me/${phoneWithCountryCode}`;
  Linking.canOpenURL(whatsappUrl).then(supported => {
    if (supported) {
      Linking.openURL(whatsappUrl);
    } else {
      console.log('WhatsApp is not installed on the device');
    }
  });
};

export const openPhoneDialer = (phoneNumber: string | undefined | null): void => {
  if (!phoneNumber) return;
  const phoneUrl = `tel:${phoneNumber}`;
  Linking.canOpenURL(phoneUrl).then(supported => {
    if (supported) {
      Linking.openURL(phoneUrl);
    }
  });
};

export const getJobImageUrl = (job: any): string | undefined => {
  if (job.creatives && job.creatives.length > 0) {
    return job.creatives[0].thumb_url;
  }
  return undefined;
};

export const getContentV3Array = (jobData: any): any[] => {
  if (jobData.contentV3?.V3) {
    return jobData.contentV3.V3;
  } else if (jobData.contentV3) {
    return Array.isArray(jobData.contentV3) ? jobData.contentV3 : [];
  }
  return [];
};

export const getShiftTimingFromContentV3 = (contentV3: any[]): string | undefined => {
  const shiftTimingItem = contentV3.find(
    (item: any) =>
      item.field_key &&
      typeof item.field_key === 'string' &&
      item.field_key.trim().toLowerCase() === 'shift timing' &&
      item.field_value && item.field_value.trim() !== ''
  );
  return shiftTimingItem?.field_value;
};

export default {}; 