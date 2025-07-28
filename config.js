// Configuration file for production deployment
// Replace these values with your actual credentials

const CONFIG = {
    // EmailJS Configuration
    emailjs: {
        publicKey: 'oacWTKWQd5Q-zibHK',        // Your EmailJS public key
        serviceId: 'service_gmail',             // Default Gmail service ID
        templateId: 'template_quote',           // Quote notification template
        autoReplyTemplateId: 'template_reply'   // Auto-reply template
    },
    
    // Fallback form service (optional)
    fallback: {
        endpoint: 'https://formspree.io/f/YOUR_FORM_ID', // Alternative: Netlify Forms, FormSubmit, etc.
        enabled: true
    },
    
    // Business contact information
    business: {
        email: 'humphreyabwao@gmail.com',
        phone: '+254762852457',
        name: 'Noxartech Solution',
        website: 'https://noxartechsln.tech'
    },
    
    // Performance settings
    performance: {
        submitTimeout: 30000, // 30 seconds timeout for submissions
        retryAttempts: 3,     // Number of retry attempts
        enableAnalytics: true // Enable Google Analytics tracking
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
    window.NOXARTECH_CONFIG = CONFIG;
}
