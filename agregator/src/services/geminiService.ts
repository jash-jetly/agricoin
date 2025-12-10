import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
// In a real application, this should be stored in environment variables
// IMPORTANT: Replace 'YOUR_GEMINI_API_KEY' with your actual Gemini API key
// You can get an API key from https://aistudio.google.com/app/apikey
const API_KEY = 'AIzaSyApc8Wg9WNFK2pG0K15LHEijblt4_CzC6I'; // Replace with actual API key
const genAI = new GoogleGenerativeAI(API_KEY);

// Function to identify vegetables from an image using Gemini
export async function identifyVegetable(imageBase64: string): Promise<string> {
  try {
    // Remove the data URL prefix if present
    const base64Data = imageBase64.includes('data:image')
      ? imageBase64.split(',')[1]
      : imageBase64;

    // Initialize the model (Gemini Pro Vision)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Create image part from base64 data
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg',
      },
    };

    // Prompt for vegetable identification
    const prompt = `You are a vegetable and crop identification expert. Analyze this image captured from a mobile camera and identify what vegetable or crop is shown. Pay special attention to distinguish between different root vegetables - particularly potatoes (brown, rounded tubers) and onions (layered bulbs with papery skin).

If you see a brown, rounded tuber with eyes/dimples and rough skin, that's a Potato, not an Onion.
If you see a layered bulb with papery skin, that's an Onion.

Only respond with the exact name from the list - no explanations or additional text. Your response must be a single word only.`;

    // Generate content with the image
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text().trim();

    // Return the identified vegetable name
    return text;
  } catch (error) {
    console.error('Error identifying vegetable:', error);
    throw new Error('Failed to identify vegetable');
  }
}