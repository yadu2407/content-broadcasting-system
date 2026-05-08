# 📺 Content Broadcasting System

A complete content broadcasting system for educational environments where teachers can upload subject-based content and principals can approve or reject it. Students can view live broadcast content from a public page.

## 🚀 Live Demo

**[Add your deployed link here]**

## ✨ Features

### 🔐 Authentication & Role-Based Access
- Secure login for teachers and principals
- Role-based dashboards (Teacher/Principal)
- Protected routes with authentication

### 👨‍🏫 Teacher Dashboard
- View content statistics (Total/Pending/Approved/Rejected)
- Upload educational content with scheduling
- File upload with preview (JPG, PNG, GIF - max 10MB)
- Set start time, end time, and rotation duration
- Track content status (Pending/Approved/Rejected)

### 👔 Principal Dashboard
- Overview of all content statistics
- Review pending content for approval/rejection
- Approve content or reject with mandatory reason
- Filter content by status and search

### 📺 Public Live Page
- View active live content without authentication
- Auto-refresh every 30 seconds
- Real-time content preview
- Proper empty state handling

## 🛠️ Tech Stack

- React 18
- React Router v6
- React Hook Form
- Yup (Validation)
- Axios
- Tailwind CSS
- React Hot Toast
- date-fns

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/content-broadcasting-system.git
cd content-broadcasting-system

# 2. Install dependencies
npm install

# 3. Install Tailwind CSS
npm install -D tailwindcss@3.3.0 postcss@8.4.24 autoprefixer@10.4.14
npx tailwindcss init -p

# 4. Start the development server
npm start
