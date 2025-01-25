# Review Management App

A Next.js application designed to help businesses collect and manage customer reviews efficiently. The app generates unique short URLs and QR codes that businesses can share with customers to gather ratings and reviews.

## Features

- Generate unique short URLs and QR codes for businesses
- Collect customer ratings (1-5 stars)
- Smart review routing:
  - 1-3 stars: Collect private feedback
  - 4-5 stars: Direct to public review platforms (Google Maps, Facebook, Yelp)
- Analytics tracking for URL clicks and unique visitors
- Built with modern tech stack: Next.js, TypeScript, Tailwind CSS, and Supabase

## Tech Stack

- Frontend: Next.js 14, React 18, TypeScript
- Styling: Tailwind CSS
- Database: Supabase
- Authentication: Supabase Auth
- QR Code Generation: qrcode
- Icons: react-icons
- Forms: @tailwindcss/forms

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/app` - Next.js 14 app directory containing all routes and pages
- `/public` - Static assets
- `/supabase` - Supabase configuration and types
- `/scripts` - Utility scripts

## Database Schema

The application uses the following main tables:
- Business: Stores business information and review platform URLs
- ShortURL: Manages generated short URLs and QR codes
- CustomerFeedback: Stores customer ratings and feedback
- Analytics: Tracks usage statistics