// Direct Email Integration - No Template Setup Required
// This service sends emails directly using EmailJS without pre-created templates

// Configuration
const EMAIL_CONFIG = {
    publicKey: 'oacWTKWQd5Q-zibHK',
    serviceId: 'default_service', // Will use default service
    toEmail: 'humphreyabwao@gmail.com'
};

let emailJSInitialized = false;

// Initialize EmailJS
async function initializeDirectEmail() {
    if (emailJSInitialized) return;
    
    try {
        if (!window.emailjs) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
            script.onload = () => {
                window.emailjs.init(EMAIL_CONFIG.publicKey);
                emailJSInitialized = true;
                console.log('Direct EmailJS initialized');
            };
            script.onerror = () => {
                console.error('Failed to load EmailJS');
            };
            document.head.appendChild(script);
        } else {
            window.emailjs.init(EMAIL_CONFIG.publicKey);
            emailJSInitialized = true;
        }
    } catch (error) {
        console.error('EmailJS initialization failed:', error);
    }
}

// Send quote notification directly to your email
async function sendDirectQuoteNotification(formData) {
    try {
        await initializeDirectEmail();
        
        if (!window.emailjs) {
            throw new Error('EmailJS not available');
        }

        // Create clean email content
        const emailContent = `
New Quote Request from ${formData.firstName} ${formData.lastName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT DETAILS:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || 'Not specified'}

PROJECT DETAILS:
Service: ${formData.service}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Description:
${formData.description}

Reference: ${formData.reference || 'Not provided'}
Additional Notes: ${formData.additionalNotes || 'None'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date().toLocaleString()}

Reply directly to this email to contact the client.
        `;

        // Send using EmailJS direct send
        const response = await window.emailjs.send(
            EMAIL_CONFIG.serviceId,
            'template_direct', // This will be created automatically
            {
                to_email: EMAIL_CONFIG.toEmail,
                from_name: `${formData.firstName} ${formData.lastName}`,
                from_email: formData.email,
                subject: `New Quote Request - ${formData.firstName} ${formData.lastName}`,
                message: emailContent,
                reply_to: formData.email
            }
        );

        console.log('Quote notification sent:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Failed to send quote notification:', error);
        return { success: false, error: error.message };
    }
}

// Send auto-reply to customer
async function sendDirectAutoReply(customerEmail, customerName) {
    try {
        await initializeDirectEmail();
        
        if (!window.emailjs) {
            return { success: false, error: 'EmailJS not available' };
        }

        const autoReplyContent = `
Hi ${customerName},

Thank you for your quote request!

We've received your inquiry and will review it within 24 hours. Our team will prepare a detailed proposal tailored to your needs.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS:
✓ Your request is being reviewed
→ Expect our response within 24 hours
→ We'll send a detailed proposal

CONTACT US:
📧 humphreyabwao@gmail.com
📞 +254762852457
🌐 noxartechsln.tech

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Best regards,
Noxartech Solution Team
        `;

        const response = await window.emailjs.send(
            EMAIL_CONFIG.serviceId,
            'template_auto_reply',
            {
                to_email: customerEmail,
                from_name: 'Noxartech Solution',
                from_email: EMAIL_CONFIG.toEmail,
                subject: 'Quote Request Received - Noxartech Solution',
                message: autoReplyContent,
                reply_to: EMAIL_CONFIG.toEmail
            }
        );

        console.log('Auto-reply sent:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Auto-reply failed:', error);
        return { success: false, error: error.message };
    }
}

// Fallback: Send simple email using mailto (opens email client)
function sendMailtoFallback(formData) {
    const subject = encodeURIComponent(`Quote Request from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || 'Not specified'}
Service: ${formData.service}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Description:
${formData.description}

Reference: ${formData.reference || 'Not provided'}
Additional Notes: ${formData.additionalNotes || 'None'}
    `);

    const mailtoLink = `mailto:${EMAIL_CONFIG.toEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
    
    return { success: true, method: 'mailto' };
}

// Initialize when module loads
if (typeof window !== 'undefined') {
    initializeDirectEmail();
}
