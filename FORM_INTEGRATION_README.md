# Noxartech Solution - Quote Form Integration

This document explains how to set up the end-to-end quote form integration with Firebase and EmailJS.

## 🚀 Features

- **Firebase Integration**: Stores quote requests in Firestore database
- **EmailJS Integration**: Sends email notifications and auto-replies
- **Fallback System**: Multiple submission methods for reliability
- **Lightweight**: Optimized for performance and minimal load times
- **Production Ready**: Proper error handling and user feedback

## 📋 Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Your project is already configured with these settings:
   - Project ID: `noxartechsln`
   - API Key: Already configured in `firebase-config.js`

3. Set up Firestore Database:
   - Go to Firestore Database in Firebase Console
   - Create database in production mode
   - Create collections: `quote-requests` and `newsletter-subscriptions`

### 2. EmailJS Setup

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Create a free account
3. Add an email service (Gmail, Outlook, etc.)
4. Create email templates:

#### Quote Notification Template
**Template Name:** `quote_notification`  
**To Email:** `humphreyabwao@gmail.com`

```html
Subject: New Quote Request - {{from_name}}

Hello,

You have received a new quote request:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT DETAILS:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}

PROJECT DETAILS:
Service: {{service}}
Budget: {{budget}}
Timeline: {{timeline}}

Description:
{{description}}

Reference: {{reference}}
Notes: {{additional_notes}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: {{submission_date}}

Reply directly to this email to contact the client.
```

#### Auto-Reply Template
**Template Name:** `auto_reply`  
**To Email:** `{{to_email}}`

```html
Subject: Quote Request Received - Noxartech Solution

Hi {{to_name}},

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
```

### 3. Configuration

Edit `config.js` file with your credentials:

```javascript
const CONFIG = {
    emailjs: {
        publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',    // From EmailJS dashboard
        serviceId: 'YOUR_SERVICE_ID',            // Your email service ID
        templateId: 'YOUR_TEMPLATE_ID',          // Quote notification template
        autoReplyTemplateId: 'YOUR_AUTO_REPLY_TEMPLATE_ID' // Auto-reply template
    }
};
```

### 4. Fallback Configuration (Optional)

For additional reliability, set up a fallback service:

1. **FormSpree** (Recommended):
   - Go to [formspree.io](https://formspree.io)
   - Create a form and get the endpoint URL
   - Update `config.js` with your FormSpree endpoint

2. **Alternative**: Netlify Forms, FormSubmit, or any form handling service

### 5. Deployment

1. Upload all files to your web server
2. Ensure HTTPS is enabled (required for modern web features)
3. Test the form submission
4. Monitor Firebase Console for incoming data

## 🔧 Files Structure

```
├── firebase-config.js     # Firebase configuration and functions
├── email-service.js       # EmailJS integration
├── config.js             # Main configuration file
├── quote.html           # Updated with form integration
└── script.js            # Updated QuoteFormManager
```

## 📊 Testing

1. **Local Testing**:
   - Serve files from a local server (not file://)
   - Use tools like Live Server in VS Code

2. **Production Testing**:
   - Test form submission
   - Check Firebase Console for data
   - Verify email delivery
   - Test error scenarios

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure you're serving from HTTP/HTTPS, not file://
2. **Firebase Permission Denied**: Check Firestore security rules
3. **EmailJS Not Working**: Verify API keys and template IDs
4. **Form Not Submitting**: Check browser console for errors

### Security Rules for Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow writes to quote-requests
    match /quote-requests/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    
    // Allow writes to newsletter-subscriptions
    match /newsletter-subscriptions/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

## 📈 Performance Optimizations

- **Lazy Loading**: EmailJS library loads only when needed
- **Parallel Requests**: Firebase and email submissions run simultaneously
- **Error Handling**: Graceful degradation with fallback methods
- **Caching**: Service worker for offline capability

## 🔒 Security Features

- **Input Validation**: Client-side and server-side validation
- **Rate Limiting**: Can be added at server level
- **Spam Protection**: Can integrate with services like reCAPTCHA
- **Data Sanitization**: All inputs are sanitized before processing

## 📞 Support

For technical support:
- Email: info@noxartechsln.tech
- Phone: +254762852457
- WhatsApp: +254762852457

## 🚀 Production Deployment Checklist

- [ ] Firebase project created and configured
- [ ] EmailJS templates created and tested
- [ ] Configuration file updated with real credentials
- [ ] Firestore security rules configured
- [ ] Form tested on staging environment
- [ ] Analytics tracking configured (optional)
- [ ] Error monitoring set up (optional)
- [ ] Backup form service configured
- [ ] SSL certificate installed
- [ ] Performance testing completed

---

*This integration provides a robust, production-ready solution for handling quote requests with multiple layers of reliability and user-friendly error handling.*
