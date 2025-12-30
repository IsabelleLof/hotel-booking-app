# StayEase - Hotel Booking Application

This is a comprehensive hotel booking application built with Next.js, TypeScript, and Tailwind CSS. It features hotel search, details view, booking management, and authentication.

## Features

- **Search**: Find hotels by location, dates, and guests.
- **Details**: View comprehensive hotel information, amenities, and location.
- **Booking**: Book hotels (simulated) and view them in your profile.
- **Authentication**: Sign in with Google or use the Demo User for testing.
- **Responsive Design**: Fully responsive UI with a premium look and feel.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Testing**: Jest & React Testing Library
- **Icons**: React Icons
- **Animations**: Framer Motion

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open [http://localhost:3000](http://localhost:3000)** with your browser.

## API & Data

The application currently uses a **Mock API** (`src/lib/api.ts`) to simulate external data fetching. This ensures the application is fully functional for demonstration purposes without requiring API keys.

To switch to a real API (e.g., Amadeus), you would:
1.  Obtain an API Key from the provider.
2.  Update `src/lib/api.ts` to make real HTTP requests using `axios`.
3.  Set environment variables in `.env.local`.

## Authentication

For the Google Login to work, you need to set up a Google Cloud Project and add the credentials to `.env.local`:

```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_SECRET=your-secret-key
```

**For testing/demo purposes, use the "Sign in as Demo User" button on the login page.**

## Testing

Run the test suite with:

```bash
npm test
```
