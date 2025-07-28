# 📧 EmailJS Template Setup Guide

## Quick Setup for humphreyabwao@gmail.com

### Step 1: Create EmailJS Account
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Sign up with your Google account (humphreyabwao@gmail.com)

### Step 2: Add Email Service
1. Click "Add New Service"
2. Choose "Gmail"
3. Connect your Google account (humphreyabwao@gmail.com)
4. Note the **Service ID** (e.g., service_abc123)

### Step 3: Create Template 1 - Quote Notification
1. Click "Create New Template"
2. Template Name: **Quote Notification**
3. Copy and paste this content:

**Subject:**
```
New Quote Request - {{from_name}}
```

**Content:**
```
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

**Settings:**
- To Email: humphreyabwao@gmail.com
- From Name: {{from_name}}
- Reply To: {{from_email}}

4. Save and note the **Template ID** (e.g., template_xyz789)

### Step 4: Create Template 2 - Auto Reply
1. Click "Create New Template" 
2. Template Name: **Auto Reply**
3. Copy and paste this content:

**Subject:**
```
Quote Request Received - Noxartech Solution
```

**Content:**
```
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

**Settings:**
- To Email: {{to_email}}
- From Name: Noxartech Solution
- Reply To: humphreyabwao@gmail.com

4. Save and note the **Template ID** (e.g., template_abc456)

### Step 5: Get Your Public Key
1. Go to "Account" in EmailJS dashboard
2. Copy your **Public Key** (e.g., user_xyz123abc)

### Step 6: Update config.js
Edit your `config.js` file with the values you noted:

```javascript
const CONFIG = {
    emailjs: {
        publicKey: 'YOUR_PUBLIC_KEY_HERE',        // From Step 5
        serviceId: 'YOUR_SERVICE_ID_HERE',        // From Step 2
        templateId: 'YOUR_QUOTE_TEMPLATE_ID',     // From Step 3
        autoReplyTemplateId: 'YOUR_AUTO_REPLY_TEMPLATE_ID' // From Step 4
    }
    // ... rest of config
};
```

### Step 7: Test
1. Open `test-integration.html` in your browser
2. Click "Test EmailJS Setup"
3. Click "Test Form Submission"

## ✅ That's it! Your email integration is ready.

**What happens when someone submits a quote:**
1. You get an email at humphreyabwao@gmail.com with all the details
2. The customer gets a professional auto-reply confirmation
3. Everything is saved to Firebase as backup

**Troubleshooting:**
- Make sure Gmail allows "Less secure apps" or use App Passwords
- Check spam folder for test emails
- Verify all IDs are correctly copied to config.js
