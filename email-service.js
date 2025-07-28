// EmailJS Integration for sending emails directly
// Load configuration
const getConfig = () => {
    if (typeof window !== 'undefined' && window.NOXARTECH_CONFIG) {
        return window.NOXARTECH_CONFIG.emailjs;
    }
    // Fallback configuration
    return {
        publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
        serviceId: 'YOUR_SERVICE_ID',
        templateId: 'YOUR_TEMPLATE_ID',
        autoReplyTemplateId: 'YOUR_AUTO_REPLY_TEMPLATE_ID'
    };
};

// Initialize EmailJS (will be called when the script loads)
let emailJSInitialized = false;

async function initializeEmailJS() {
    if (emailJSInitialized) return;
    
    try {
        const config = getConfig();
        
        // Load EmailJS library dynamically for better performance
        if (!window.emailjs) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
            script.onload = () => {
                window.emailjs.init(config.publicKey);
                emailJSInitialized = true;
                console.log('EmailJS initialized successfully');
            };
            script.onerror = () => {
                console.error('Failed to load EmailJS library');
            };
            document.head.appendChild(script);
        } else {
            window.emailjs.init(config.publicKey);
            emailJSInitialized = true;
        }
    } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
    }
}

// Function to send email via EmailJS
export async function sendEmailNotification(formData) {
    try {
        if (!emailJSInitialized) {
            await initializeEmailJS();
            // Wait a bit for initialization
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (!window.emailjs) {
            throw new Error('EmailJS not loaded');
        }

        const config = getConfig();
        const businessConfig = window.NOXARTECH_CONFIG?.business || {
            email: 'info@noxartechsln.tech',
            name: 'Noxartech Solution'
        };

        // Prepare email template parameters
        const templateParams = {
            to_email: businessConfig.email,
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            phone: formData.phone,
            company: formData.company || 'Not specified',
            service: formData.service,
            budget: formData.budget || 'Not specified',
            timeline: formData.timeline || 'Not specified',
            description: formData.description,
            reference: formData.reference || 'Not provided',
            additional_notes: formData.additionalNotes || 'None',
            submission_date: new Date().toLocaleString(),
            reply_to: formData.email
        };

        const response = await window.emailjs.send(
            config.serviceId,
            config.templateId,
            templateParams
        );

        console.log('Email sent successfully:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error: error.message };
    }
}

// Function to send auto-reply to customer
export async function sendAutoReply(customerEmail, customerName) {
    try {
        if (!emailJSInitialized || !window.emailjs) {
            console.warn('EmailJS not initialized for auto-reply');
            return { success: false, error: 'EmailJS not initialized' };
        }

        const config = getConfig();
        const businessConfig = window.NOXARTECH_CONFIG?.business || {
            email: 'info@noxartechsln.tech',
            phone: '+254762852457',
            name: 'Noxartech Solution',
            website: 'https://noxartechsln.tech'
        };

        const autoReplyParams = {
            to_email: customerEmail,
            to_name: customerName,
            company_name: businessConfig.name,
            support_email: businessConfig.email,
            company_phone: businessConfig.phone,
            website: businessConfig.website
        };

        const response = await window.emailjs.send(
            config.serviceId,
            config.autoReplyTemplateId,
            autoReplyParams
        );

        console.log('Auto-reply sent successfully:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Failed to send auto-reply:', error);
        return { success: false, error: error.message };
    }
}

// Initialize EmailJS when this module loads
if (typeof window !== 'undefined') {
    initializeEmailJS();
}

export { initializeEmailJS };
