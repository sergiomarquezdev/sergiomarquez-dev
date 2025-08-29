/// <reference path="../.astro/types.d.ts" />

// Google CMP (Funding Choices) TypeScript Declarations
declare global {
  interface Window {
    googlefc?: {
      callbackQueue: Array<{
        [key: string]: () => void;
      }>;
      getGoogleConsentModeValues: () => {
        analyticsStoragePurposeConsentStatus: number; // 1 = GRANTED, 0 = DENIED
        adStoragePurposeConsentStatus: number;
        // Additional consent values as needed
      };
    };
    // Analytics functions
    loadGoogleAnalyticsWithConsent?: () => void;
    analyticsEnabled?: boolean;
    // eslint-disable-next-line no-unused-vars
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    // Consent Manager (for synchronization)
    consentManager?: {
      // eslint-disable-next-line no-unused-vars
      syncFromExternalCMP: (settings: any) => void;
    };
    // AdSense
    adsbygoogle?: any[];
  }
}

export {};
