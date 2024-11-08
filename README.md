# Travel Planner Web Application

This is a React-based travel planner web application with Firebase integration, designed to help users organize and manage their travel plans. With this application, users can create, edit, and delete travel plans, and manage essential trip details all in one place.

## Key Features

- **User Authentication**: Secure login system to access and manage your personalized travel plans.
- **Plan Management**: Create new travel plans, edit details, and delete plans as needed.

- **Plan Details**: Each plan includes:
  - **Packing List**: Add and remove items to ensure you’re fully prepared.
  - **Accommodation List**: Organize where you’ll stay during the trip.
  - **Activity List**: Keep track of planned activities to make the most of your travel experience.

This application offers a centralized, user-friendly interface to streamline travel organization and ensure nothing is forgotten during your trips.

## Installation Instructions

To set up and run the Travel Planner application locally, follow these steps:

### 1. Clone the Repository

Clone this repository to your local machine using:

```bash
git clone https://github.com/TravelPlannerTeam/TravelPlanner.git

cd TravelPlanner
```

### 2. Install Dependencies

```bash
npm install
npm install @mantine/core @mantine/hooks
```

### 3.Configure Environment Variables

```bash
# Firebase Database URL
VITE_API_URL=(Your Firebase Database URL)

# Unsplash API for location images
VITE_UNSPLASH_API_URL=https://api.unsplash.com/search/photos
VITE_UNSPLASH_API_TOKEN=(Your Unsplash API Token)

# Weather API for trip weather details
VITE_WEATHER_API_URL=https://api.weatherapi.com/v1/forecast.json
VITE_WEATHER_API_TOKEN=(Your Weather API Token)

# Firebase Configuration
VITE_FIREBASE_API_KEY=(Your Firebase API Key)
VITE_FIREBASE_AUTH_DOMAIN=(Your Firebase Auth Domain)
VITE_FIREBASE_DATABASE_URL=(Your Firebase Database URL)
VITE_FIREBASE_PROJECT_ID=(Your Firebase Project ID)
VITE_FIREBASE_STORAGE_BUCKET=(Your Firebase Storage Bucket)
VITE_FIREBASE_MESSAGING_SENDER_ID=(Your Firebase Messaging Sender ID)
VITE_FIREBASE_APP_ID=(Your Firebase App ID)
```

### 4. Start The Application locally

```bash
npm run dev
```
