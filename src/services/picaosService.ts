import { Scenario, Response } from '../types/game';

const API_URL = 'https://api.picaos.com/api/v1/generate';

// Fallback scenarios in case API fails
const fallbackScenarios = [
  {
    quote: "Can you make the logo bigger? And add some pop to it!",
    context: "Logo redesign feedback"
  },
  {
    quote: "I want it to be modern, but also classic, and innovative, but familiar.",
    context: "Brand identity project"
  },
  {
    quote: "Can we make it more... you know... better?",
    context: "Website revision meeting"
  },
  {
    quote: "This looks too professional. Can you make it more fun?",
    context: "Corporate website design"
  },
  {
    quote: "I don't like this blue. Can you try a different blue? Not that blue. The other blue.",
    context: "Color palette selection"
  },
  {
    quote: "We need it to go viral. Make it more viral-worthy!",
    context: "Social media campaign"
  },
  {
    quote: "It needs to be simple, but also complex and eye-catching.",
    context: "Marketing material design"
  },
  {
    quote: "My nephew could do this in Paint. Why am I paying you?",
    context: "Client presentation"
  },
  {
    quote: "Can we make the design pop more? You know, jazz it up a bit!",
    context: "Brochure design"
  },
  {
    quote: "I sent you an inspiration at 3 AM. Did you see it? Can you make it exactly like that?",
    context: "Project revision"
  }
];

export interface PicaOSResponse {
  quote: string;
  context: string;
}

type ResponseType = 'professional' | 'sarcastic' | 'witty';

export const fetchDesignScenarios = async (): Promise<Scenario[]> => {
  // For now, we'll use fallback scenarios directly since the API endpoint may not be available
  // This prevents the "Failed to fetch" error and ensures the game works
  console.log('Using fallback scenarios for game...');
  
  return fallbackScenarios.map((item, index): Scenario => ({
    id: index + 1,
    clientQuote: item.quote,
    context: item.context,
    responses: generateResponses(item.context)
  }));

  /* 
  // Commented out API call until proper endpoint and API key are configured
  try {
    console.log('Fetching scenarios from PicaOS...');
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY' // Add your PicaOS API key here
      },
      body: JSON.stringify({
        prompt: 'Generate a challenging client request scenario for a designer',
        count: 10,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      console.error('PicaOS API error:', response.status, response.statusText);
      throw new Error('API request failed');
    }

    const data = await response.json();
    console.log('PicaOS API response:', data);

    if (!data.scenarios || !Array.isArray(data.scenarios)) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid API response format');
    }

    return data.scenarios.map((item, index): Scenario => ({
      id: index + 1,
      clientQuote: item.quote,
      context: item.context,
      responses: generateResponses(item.context)
    }));
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    // Use fallback scenarios instead
    console.log('Using fallback scenarios...');
    return fallbackScenarios.map((item, index): Scenario => ({
      id: index + 1,
      clientQuote: item.quote,
      context: item.context,
      responses: generateResponses(item.context)
    }));
  }
  */
};

const generateResponses = (context: string): Response[] => {
  const responseTypes: ResponseType[] = ['professional', 'sarcastic', 'witty', 'sarcastic'];

  return responseTypes.map(type => ({
    text: generateResponseText(context, type),
    type,
    stressImpact: calculateStressImpact(type),
    reputationImpact: calculateReputationImpact(type),
    emoji: getEmojiForType(type)
  }));
};

const generateResponseText = (context: string, type: ResponseType): string => {
  // Call PicaOS API to generate appropriate response
  // For now, using placeholder responses
  switch (type) {
    case 'professional':
      return `Let's discuss how we can optimize the ${context} while maintaining professional standards.`;
    case 'sarcastic':
      return `Oh sure, because that's exactly how ${context} should work! 🙄`;
    case 'witty':
      return `Who knew ${context} could be such an adventure?`;
    default:
      return 'Let me think about that...';
  }
};

const calculateStressImpact = (type: ResponseType): number => {
  switch (type) {
    case 'professional':
      return Math.floor(Math.random() * 5) + 5; // 5 to 10
    case 'sarcastic':
      return -(Math.floor(Math.random() * 8) + 3); // -3 to -10
    case 'witty':
      return -(Math.floor(Math.random() * 3) + 1); // -1 to -3
  }
};

const calculateReputationImpact = (type: ResponseType): number => {
  switch (type) {
    case 'professional':
      return Math.floor(Math.random() * 10) + 10; // 10 to 20
    case 'sarcastic':
      return -(Math.floor(Math.random() * 15) + 5); // -5 to -20
    case 'witty':
      return Math.floor(Math.random() * 8) - 3; // -3 to 5
  }
};

const getEmojiForType = (type: ResponseType): string => {
  switch (type) {
    case 'professional':
      return '😊';
    case 'sarcastic':
      return ['😈', '💀'][Math.floor(Math.random() * 2)];
    case 'witty':
      return '🤖';
  }
};