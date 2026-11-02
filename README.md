# NexusTech Portal — Dynamic Destination Portal for Vercel

A lightweight, serverless destination application designed to be deployed on Vercel.

## Features
- **Dynamic Link Generator API (`/api/link`)**: Produces brand new, unique URLs with randomized IDs and timestamps every single call.
- **Article Reader (`/article`)**: Renders unique content based on URL query parameters.
- **Clean Vercel Serverless Architecture**: Zero maintenance, instant global CDN deployment.

## Deployment on Vercel
1. Import this repository in [vercel.com/new](https://vercel.com/new).
2. Click **Deploy**.
3. Use your generated deployment URL (e.g. `https://your-portal.vercel.app/api/link`) in your automation loop.
