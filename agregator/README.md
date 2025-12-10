# AgriCoin Mobile App

## Gemini AI Integration for Vegetable Recognition

This application uses Google's Gemini-2.0-Flash model to identify vegetables from images captured by the device camera. When a user takes a photo on the Scan page, the image is sent to Gemini AI, which identifies the vegetable and automatically selects it in the dropdown menu.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. **Important**: Get a Gemini API Key
   - Visit https://aistudio.google.com/app/apikey to obtain your API key
   - Open `src/services/geminiService.ts`
   - Replace `YOUR_GEMINI_API_KEY` with your actual API key

3. Start the development server:
   ```
   npm run dev
   ```

## How to Use the Vegetable Recognition Feature

1. Navigate to the Scan page
2. Click "Start Camera" to activate your device camera
3. Take a photo of a vegetable (supported types: Onion, Tomato, Wheat, Rice, Cotton, Sugarcane)
4. The app will send the image to Gemini AI for analysis
5. If the vegetable is recognized, it will be automatically selected in the crop dropdown
6. Complete the form with farmer information and weight
7. Click "Mint AgriCoins" to process the batch

## Features

- Real-time vegetable recognition using Gemini AI
- User-friendly toast notifications for feedback
- Camera access with permission handling
- Responsive mobile-first design
- Automatic crop selection based on AI recognition

## Technologies Used

- React with TypeScript
- Vite for fast development
- Google Generative AI (@google/generative-ai)
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management