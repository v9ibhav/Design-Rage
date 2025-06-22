import { Scenario, ChaosEvent } from '../types/game';

export const scenarios: Scenario[] = [
  {
    id: 1,
    clientQuote: "Can you make the logo bigger? Like, MUCH bigger. Actually, can it pulse too?",
    context: "Website header design review",
    responses: [
      {
        text: "Sure! Let me make it GIGANTIC and add a seizure-inducing strobe effect! 🤪",
        type: 'sarcastic',
        stressImpact: -5,
        reputationImpact: -10,
        emoji: '😈'
      },
      {
        text: "I understand you want more brand visibility. Let's explore proportional scaling options.",
        type: 'professional',
        stressImpact: 5,
        reputationImpact: 15,
        emoji: '😊'
      },
      {
        text: "What if we made it so big it becomes sentient and starts making its own design decisions?",
        type: 'witty',
        stressImpact: -2,
        reputationImpact: 5,
        emoji: '🤖'
      },
      {
        text: "Absolutely! And while we're at it, let's add some Comic Sans for that premium feel!",
        type: 'sarcastic',
        stressImpact: -8,
        reputationImpact: -15,
        emoji: '💀'
      }
    ]
  },
  {
    id: 2,
    clientQuote: "This looks too... designery. Can you make it more 'fun' and less professional?",
    context: "Corporate website redesign",
    responses: [
      {
        text: "I'll add rainbow gradients, dancing hamsters, and auto-playing music! Fun enough?",
        type: 'sarcastic',
        stressImpact: -3,
        reputationImpact: -8,
        emoji: '🌈'
      },
      {
        text: "Let's find the right balance between approachable and professional for your brand.",
        type: 'professional',
        stressImpact: 8,
        reputationImpact: 12,
        emoji: '⚖️'
      },
      {
        text: "Ah yes, the classic 'make it pop but also serious but also fun but professional' brief!",
        type: 'witty',
        stressImpact: -1,
        reputationImpact: 3,
        emoji: '🎯'
      },
      {
        text: "Got it! Less award-winning design, more 1999 GeoCities vibes!",
        type: 'sarcastic',
        stressImpact: -6,
        reputationImpact: -12,
        emoji: '🕸️'
      }
    ]
  },
  {
    id: 3,
    clientQuote: "I don't like this blue. Can you try a different blue? Not that blue. The other blue.",
    context: "Color palette approval meeting",
    responses: [
      {
        text: "I'll create a blue spectrum chart with 847 different blues for your selection.",
        type: 'sarcastic',
        stressImpact: 3,
        reputationImpact: -5,
        emoji: '🎨'
      },
      {
        text: "Let me show you a few carefully selected blue options that align with your brand.",
        type: 'professional',
        stressImpact: 10,
        reputationImpact: 8,
        emoji: '💙'
      },
      {
        text: "Ah, you want the blue that exists only in your mind! Let me consult my telepathy degree.",
        type: 'witty',
        stressImpact: -4,
        reputationImpact: 2,
        emoji: '🔮'
      },
      {
        text: "How about we just make everything grayscale? Problem solved!",
        type: 'sarcastic',
        stressImpact: -2,
        reputationImpact: -7,
        emoji: '⚫'
      }
    ]
  },
  {
    id: 4,
    clientQuote: "This is perfect! Don't change anything. Also, can you completely redesign it?",
    context: "Final design approval",
    responses: [
      {
        text: "So... keep everything exactly the same while changing everything completely. Crystal clear!",
        type: 'sarcastic',
        stressImpact: 2,
        reputationImpact: -3,
        emoji: '🤯'
      },
      {
        text: "I understand you love the concept but want to explore variations. Let's discuss specifics.",
        type: 'professional',
        stressImpact: 12,
        reputationImpact: 10,
        emoji: '🤝'
      },
      {
        text: "I love a good paradox! Should I also make it invisible while highly visible?",
        type: 'witty',
        stressImpact: -1,
        reputationImpact: 4,
        emoji: '🔄'
      },
      {
        text: "Perfect! I'll redesign it to look exactly the same but completely different!",
        type: 'sarcastic',
        stressImpact: -5,
        reputationImpact: -8,
        emoji: '🎭'
      }
    ]
  },
  {
    id: 5,
    clientQuote: "Can you make it more modern? But also timeless. And trendy but classic.",
    context: "Brand refresh consultation",
    responses: [
      {
        text: "I'll create a design that exists in all time periods simultaneously!",
        type: 'sarcastic',
        stressImpact: 1,
        reputationImpact: -4,
        emoji: '⏰'
      },
      {
        text: "Let's identify design elements that feel fresh while maintaining lasting appeal.",
        type: 'professional',
        stressImpact: 9,
        reputationImpact: 14,
        emoji: '✨'
      },
      {
        text: "Ah, the eternal quest for the 'timeless trend' - like finding a unicorn with WiFi!",
        type: 'witty',
        stressImpact: -3,
        reputationImpact: 6,
        emoji: '🦄'
      },
      {
        text: "So... vintage future retro contemporary classic modern? Easy peasy!",
        type: 'sarcastic',
        stressImpact: -4,
        reputationImpact: -6,
        emoji: '🌀'
      }
    ]
  },
  {
    id: 6,
    clientQuote: "My nephew says this looks outdated. He's 12 and really good with computers.",
    context: "Design feedback session",
    responses: [
      {
        text: "Great! I'll base all my design decisions on a 12-year-old's TikTok preferences!",
        type: 'sarcastic',
        stressImpact: -2,
        reputationImpact: -9,
        emoji: '📱'
      },
      {
        text: "I value all feedback. Let's discuss what specific elements feel outdated to your target audience.",
        type: 'professional',
        stressImpact: 15,
        reputationImpact: 9,
        emoji: '👥'
      },
      {
        text: "Ah yes, the classic 'nephew knows best' scenario! Does he also do taxes?",
        type: 'witty',
        stressImpact: -1,
        reputationImpact: 1,
        emoji: '🎮'
      },
      {
        text: "Should I add more Minecraft references and Among Us characters then?",
        type: 'sarcastic',
        stressImpact: -7,
        reputationImpact: -11,
        emoji: '🎯'
      }
    ]
  },
  {
    id: 7,
    clientQuote: "It needs more white space. But also, can you fit more content in this area?",
    context: "Layout optimization review",
    responses: [
      {
        text: "I'll create magical shrinking content that takes up less space while being bigger!",
        type: 'sarcastic',
        stressImpact: 4,
        reputationImpact: -5,
        emoji: '🔍'
      },
      {
        text: "Let's prioritize your content hierarchy and find the optimal balance of space and information.",
        type: 'professional',
        stressImpact: 11,
        reputationImpact: 13,
        emoji: '📐'
      },
      {
        text: "So we need more nothing while adding more something. I love a good space-time challenge!",
        type: 'witty',
        stressImpact: -2,
        reputationImpact: 3,
        emoji: '🌌'
      },
      {
        text: "Perfect! I'll use quantum physics to make content exist in multiple dimensions!",
        type: 'sarcastic',
        stressImpact: -3,
        reputationImpact: -7,
        emoji: '⚛️'
      }
    ]
  },
  {
    id: 8,
    clientQuote: "Can you make the font bigger? And smaller. At the same time.",
    context: "Typography review",
    responses: [
      {
        text: "I'll invent size-shifting typography that changes based on reader's mood!",
        type: 'sarcastic',
        stressImpact: 2,
        reputationImpact: -6,
        emoji: '📝'
      },
      {
        text: "Let's establish a clear typography hierarchy with appropriate sizing for different content types.",
        type: 'professional',
        stressImpact: 8,
        reputationImpact: 11,
        emoji: '📚'
      },
      {
        text: "Schrödinger's typography - simultaneously big and small until observed!",
        type: 'witty',
        stressImpact: -4,
        reputationImpact: 7,
        emoji: '🐱'
      },
      {
        text: "Got it! I'll use fonts that exist in a perpetual state of size confusion!",
        type: 'sarcastic',
        stressImpact: -1,
        reputationImpact: -4,
        emoji: '🔤'
      }
    ]
  },
  {
    id: 9,
    clientQuote: "This is exactly what I wanted! Except completely different. You know what I mean?",
    context: "Final presentation",
    responses: [
      {
        text: "Absolutely! Crystal clear mud, as they say in the business!",
        type: 'sarcastic',
        stressImpact: 1,
        reputationImpact: -2,
        emoji: '🤷'
      },
      {
        text: "I want to make sure I understand your vision. Could you help me identify specific changes?",
        type: 'professional',
        stressImpact: 13,
        reputationImpact: 12,
        emoji: '🎯'
      },
      {
        text: "The classic 'exactly different' request! My favorite type of precise ambiguity!",
        type: 'witty',
        stressImpact: -3,
        reputationImpact: 5,
        emoji: '🎪'
      },
      {
        text: "Perfect! I'll make it identically opposite to your exact specifications!",
        type: 'sarcastic',
        stressImpact: -2,
        reputationImpact: -8,
        emoji: '🔄'
      }
    ]
  },
  {
    id: 10,
    clientQuote: "We love it! But my business partner's wife's sister thinks it needs more pizzazz.",
    context: "Final approval round",
    responses: [
      {
        text: "Great! I'll redesign everything based on third-hand family member feedback!",
        type: 'sarcastic',
        stressImpact: 3,
        reputationImpact: -10,
        emoji: '👥'
      },
      {
        text: "I appreciate all stakeholder input. Let's schedule a meeting to gather specific feedback.",
        type: 'professional',
        stressImpact: 16,
        reputationImpact: 8,
        emoji: '📋'
      },
      {
        text: "Ah, the mysterious 'pizzazz'! Is that measured in sparkles or jazz hands?",
        type: 'witty',
        stressImpact: -2,
        reputationImpact: 4,
        emoji: '✨'
      },
      {
        text: "Perfect! I'll add glitter, confetti, and a mariachi band to really jazz it up!",
        type: 'sarcastic',
        stressImpact: -5,
        reputationImpact: -12,
        emoji: '🎊'
      }
    ]
  }
];

export const chaosEvents: ChaosEvent[] = [
  {
    id: 1,
    title: "Budget Cut Surprise!",
    description: "Client just announced they spent the design budget on a company retreat. Your fee is now 'exposure'.",
    stressImpact: 25,
    reputationImpact: -5,
    emoji: '💸'
  },
  {
    id: 2,
    title: "Deadline Tornado!",
    description: "Timeline just got compressed from 2 weeks to 'yesterday'. Time travel not included in your rate.",
    stressImpact: 30,
    reputationImpact: 0,
    emoji: '⏰'
  },
  {
    id: 3,
    title: "Stakeholder Multiplier!",
    description: "Three new decision-makers just joined the project. Each has completely different opinions.",
    stressImpact: 20,
    reputationImpact: -3,
    emoji: '👥'
  },
  {
    id: 4,
    title: "Trend Alert!",
    description: "Client saw a new design trend on Pinterest. Everything must now incorporate this 'revolutionary' style.",
    stressImpact: 15,
    reputationImpact: -8,
    emoji: '📌'
  },
  {
    id: 5,
    title: "Competitor Envy!",
    description: "Client's competitor just launched something. Now your design must 'beat' theirs immediately.",
    stressImpact: 22,
    reputationImpact: 5,
    emoji: '⚔️'
  },
  {
    id: 6,
    title: "Technology Surprise!",
    description: "Platform requirements just changed. Your beautiful design now needs to work on a flip phone.",
    stressImpact: 28,
    reputationImpact: -2,
    emoji: '📱'
  }
];