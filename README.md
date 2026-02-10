# laieslybird

A professional full-stack international news website built with Next.js 14, MongoDB, and Tailwind CSS.

## Features

- **Public News Website**: Beautifully designed homepage, category-specific feeds, and dynamic article pages.
- **Admin Dashboard**: Secure management of articles, authors, and categories.
- **Authentication**: Role-based access control (Admin/Editor) via NextAuth.
- **Cloudinary Integration**: Fast image uploads and optimization.
- **SEO Optimized**: Dynamic metadata, Open Graph support, sitemaps, and robots.txt.
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop.
- **Dark/Light Mode**: User-controlled theme preferences.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB Atlas
- **ORM**: Mongoose
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS + lucide-react
- **Image Storage**: Cloudinary

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- MongoDB Atlas Account
- Cloudinary Account

### 2. Environment Variables
Create a `.env` file in the root directory based on `.env.example`:

```bash
MONGODB_URI=your_mongodb_atlas_uri
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=admin@laieslybird.com
ADMIN_PASSWORD=admin123
```

### 3. Installation
```bash
npm install
```

### 4. Seed Admin User
Run the seeding script to create your first admin account:
```bash
node scripts/seed-admin.js
```

### 5. Run Development Server
```bash
npm run dev
```

## Deployment

This project is optimized for deployment on **Vercel**.
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Add the environment variables in the Vercel dashboard.
4. Deploy!

## License
MIT
"# laieslybird" 
