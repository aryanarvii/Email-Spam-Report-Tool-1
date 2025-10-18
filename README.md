# 📬 Email Spam Report Tool
- A full-stack web application that helps users test email deliverability by sending emails to multiple test inboxes (Gmail, Outlook, Yahoo) and detecting where the emails land (Inbox, Spam, Promotions, etc.).
- The app also generates a detailed deliverability report with PDF export and optional open & click tracking.

# 🚀 Features

- ✅ Display predefined test inboxes (Gmail, Outlook, Yahoo)
- 📨 Generate unique test codes to track emails
- 🔍 Programmatically check each inbox:
    - If the email was received
    - Which folder it landed in (Inbox / Spam / Promotions)
    - Whether it was read/unread

# 📊 Generate and view deliverability report:
- Shareable report link
- PDF export

 ## Overall deliverability score
 - 🧾 Report is automatically emailed to the user
 - 🕒 Fast results (typically under 5 minutes)

# 🏗️ Tech Stack
### Frontend:
- ⚡ React + Vite
- 🎨 Tailwind CSS
- 🌐 Axios for API calls

### Backend:
- 🟡 Node.js + Express
- 📨 Nodemailer + SendGrid (SMTP)
- 📬 Gmail API, Microsoft Graph API
- 🛢️ MongoDB (Mongoose)
- 🧾 puppeteer for PDF generation
- 🔐 simple-oauth2 for Outlook/Yahoo OAuth

### 🧰 Prerequisites
- Node.js (v18+)
- MongoDB database
- Verified sender identity in SendGrid

### Developer credentials for:
- Gmail (Google Cloud)
- Outlook (Azure App Registration)
- (Optional) Yahoo Mail

## 🧭 How It Works
- The app displays multiple test inboxes (Gmail, Outlook, Yahoo).
- The user clicks Start Test, which generates a unique test code.
- The user sends a test email from their own email to the inboxes.
- Backend searches each inbox for the email with that code:
- Gmail: via Gmail API
- Outlook: via Microsoft Graph API
- A report is generated with folder placement and status.

### Report is:
- Shown in the frontend
- Accessible via a shareable link
- Emailed to the user
- Exportable as PDF

## Deployment
- Frontend: Vercel
- Backend: Railway / Render
- Set all environment variables in the hosting platform’s dashboard.

## 🧪 Future Improvements
- Yahoo integration with stable OAuth flow
- Advanced spam placement analytics
- Multi-user dashboard with login
- Automated scheduled tests
- Admin panel to manage test inboxes

## 🧑‍💼 Author
### Aryan Arvind
- 📧 aryanarvi78@gmail.com
- 💻 Full Stack Developer | MERN | Email Deliverability Tools
