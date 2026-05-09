# AI-Powered Resume Shortlisting System (Frontend)

A production-ready recruiter portal for managing resumes using AI extraction and RAG-based candidate chatting. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Dynamic Dashboard**: Visual overview of candidate stats and skill distributions using Recharts.
- **AI Chat (RAG)**: A ChatGPT-style interface to query candidate data using semantic search.
- **Smart Upload**: Drag-and-drop PDF upload zone with progress tracking and status indicators.
- **State Management**: Robust data handling with Zustand (auth/chat) and TanStack Query (server state).
- **Modern UI**: Clean, responsive dashboard built with a custom ShadCN-inspired component library.

## 🛠️ Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- Backend FastAPI service (Expected to be running on `http://localhost:8000`)

## 📦 Installation

1. Clone the repository
2. Install dependencies:
    `npm install`
3. Configure environment variables:
    `cp .env.example .env`
    (Verify `VITE_API_BASE_URL` matches your backend URL)

## 🏃 Running the App

### Development Mode
    npm run dev

The application will be available at `http://localhost:3000`.

### Production Build
    npm run build
    npm run preview

## 📁 Project Structure

- `src/components`: UI primitives and feature-specific components (Dashboard, Chat, Upload).
- `src/services`: API abstraction layer using Axios.
- `src/store`: Global state management with Zustand.
- `src/pages`: Main application views.
- `src/types`: Centralized TypeScript interfaces for candidate and chat data.

## ⚙️ Backend Integration

This UI is pre-configured to communicate with the following endpoints:
- `POST /chat`: AI message processing.
- `GET /resumes/stats`: Dashboard summary data.
- `POST /resumes/upload`: Multipart file upload.
- `GET /resumes`: List and filter candidates.

## 🤝 Troubleshooting

- **CORS Errors**: Ensure your FastAPI backend has CORSMiddleware enabled for the frontend origin.
- **Failed Uploads**: Verify that the backend upload directory has write permissions and can handle PDF parsing.
- **Empty Stats**: The dashboard requires resumes to be processed in the vector database to show metrics.

