# MegaProject

A React app built with Vite, with Appwrite authentication support for creating accounts, logging in, checking the current user, and logging out.

## Requirements

- Node.js and npm
- An Appwrite project

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and add your Appwrite configuration:

   ```env
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your-project-id
   VITE_APPWRITE_DATABASE_ID=your-database-id
   VITE_APPWRITE_COLLECTION_ID=your-collection-id
   VITE_APPWRITE_BUCKET_ID=your-bucket-id
   ```

   Use the endpoint and IDs for your Appwrite project. The authentication service currently uses the endpoint and project ID.

3. Start the development server:

   ```bash
   npm run dev
   ```

## Available scripts

- `npm run dev` — start the local development server
- `npm run build` — build the app for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint

## Current status

The app screen is currently a placeholder. Appwrite authentication logic is in `src/appwrite/auth.js`, and environment-based configuration is in `src/conf/conf.js`.
