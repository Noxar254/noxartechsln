// Firebase Performance and Hosting Configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getPerformance } from "firebase/performance";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWPrCiuY9yjvQMGiGzBDtndAa2FCLBX78",
  authDomain: "noxartechsln.firebaseapp.com",
  projectId: "noxartechsln",
  storageBucket: "noxartechsln.firebasestorage.app",
  messagingSenderId: "950592446485",
  appId: "1:950592446485:web:f4642f47cbbb3888b0ee1c",
  measurementId: "G-RT8E110P82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const perf = getPerformance(app);

// Export for use in other modules
export { db, analytics, perf };

// Performance optimized quote submission
export async function submitQuoteRequest(formData) {
  try {
    // Add performance trace
    const trace = perf.trace('quote_submission');
    trace.start();

    const docRef = await addDoc(collection(db, "quote-requests"), {
      ...formData,
      timestamp: serverTimestamp(),
      status: "pending",
      source: "website",
      userAgent: navigator.userAgent,
      loadTime: performance.now()
    });

    trace.stop();
    console.log("Quote request submitted with ID: ", docRef.id);
    
    // Track performance
    if (analytics) {
      // Track successful submission
      analytics.logEvent('quote_request_submitted', {
        submission_time: Date.now(),
        service_type: formData.service
      });
    }

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding quote request: ", error);
    
    // Track errors
    if (analytics) {
      analytics.logEvent('quote_request_error', {
        error_message: error.message,
        error_code: error.code
      });
    }
    
    return { success: false, error: error.message };
  }
}

// Performance optimized newsletter subscription
export async function submitNewsletterSubscription(email) {
  try {
    // Add performance trace
    const trace = perf.trace('newsletter_subscription');
    trace.start();

    const docRef = await addDoc(collection(db, "newsletter-subscriptions"), {
      email: email,
      timestamp: serverTimestamp(),
      status: "active",
      source: "website",
      userAgent: navigator.userAgent,
      subscriptionTime: Date.now()
    });

    trace.stop();
    console.log("Newsletter subscription submitted with ID: ", docRef.id);
    
    // Track performance
    if (analytics) {
      analytics.logEvent('newsletter_subscribed', {
        subscription_time: Date.now()
      });
    }

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding newsletter subscription: ", error);
    
    // Track errors
    if (analytics) {
      analytics.logEvent('newsletter_subscription_error', {
        error_message: error.message
      });
    }
    
    return { success: false, error: error.message };
  }
}

// Initialize performance monitoring
export function initializePerformanceMonitoring() {
  if (!perf) return;
  
  // Monitor custom metrics
  const navigationTrace = perf.trace('page_load');
  navigationTrace.start();
  
  window.addEventListener('load', () => {
    navigationTrace.stop();
    
    // Log performance metrics
    const perfData = performance.getEntriesByType('navigation')[0];
    if (perfData) {
      console.log('Page Load Performance:', {
        loadTime: perfData.loadEventEnd - perfData.loadEventStart,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
        totalLoadTime: perfData.loadEventEnd
      });
      
      // Track to Firebase Analytics
      if (analytics) {
        analytics.logEvent('page_performance', {
          load_time: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
          dom_ready_time: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)
        });
      }
    }
  });
}

// Resource optimization
export function optimizeResources() {
  // Preload critical resources
  const criticalResources = [
    'styles.css',
    'images/logo.png',
    'images/hero section.mp4'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.endsWith('.mp4')) {
      link.as = 'video';
    } else if (resource.includes('image')) {
      link.as = 'image';
    }
    
    document.head.appendChild(link);
  });
}

// Initialize all performance optimizations
if (typeof window !== 'undefined') {
  // Initialize performance monitoring when script loads
  initializePerformanceMonitoring();
  
  // Optimize resources on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeResources);
  } else {
    optimizeResources();
  }
}
