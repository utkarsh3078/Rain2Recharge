// Gemini AI Service for WaterBuddy ChatBot
// This service handles all communication with Google's Gemini AI API

const GEMINI_CONFIG = {
  API_KEY: import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY",
  API_URL:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
  MODEL: "gemini-1.5-flash",
};

// System prompt to configure WaterBuddy's personality and expertise
const SYSTEM_PROMPT = `You are WaterBuddy, an expert AI assistant specializing in water sustainability, rainwater harvesting, and smart water management systems. 

Your expertise includes:
- Rainwater harvesting system design and selection
- ROI calculations and cost-benefit analysis
- Water conservation techniques
- System maintenance and troubleshooting
- Local regulations and permits
- Environmental impact assessment
- Smart water management technologies

Your personality:
- Friendly, helpful, and encouraging
- Professional but approachable
- Detail-oriented with practical advice
- Environmentally conscious
- Patient and educational

Guidelines:
- Always provide specific, actionable advice
- Include cost estimates when relevant (use USD/INR as appropriate)
- Consider climate and location factors
- Mention safety and regulatory considerations
- Offer follow-up questions to gather more details
- Use bullet points and structured formatting for clarity
- Include relevant calculations when possible

Keep responses concise but comprehensive, typically 2-4 paragraphs unless more detail is specifically requested.`;

class GeminiService {
  constructor() {
    this.conversationHistory = [];
  }

  // Initialize conversation with system prompt
  initializeConversation() {
    this.conversationHistory = [
      {
        role: "model",
        parts: [{ text: SYSTEM_PROMPT }],
      },
    ];
  }

  // Add message to conversation history
  addToHistory(role, message) {
    this.conversationHistory.push({
      role: role, // 'user' or 'model'
      parts: [{ text: message }],
    });
  }

  // Send message to Gemini and get response
  async sendMessage(userMessage, context = {}) {
    try {
      // Add user message to history
      this.addToHistory("user", this.formatUserMessage(userMessage, context));

      const requestBody = {
        contents: this.conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      };

      const response = await fetch(
        `${GEMINI_CONFIG.API_URL}?key=${GEMINI_CONFIG.API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Gemini API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const aiResponse = data.candidates[0].content.parts[0].text;

        // Add AI response to history
        this.addToHistory("model", aiResponse);

        return {
          success: true,
          message: aiResponse,
          suggestions: this.extractSuggestions(aiResponse),
          attachments: this.generateAttachments(userMessage, aiResponse),
        };
      } else {
        throw new Error("No response generated from Gemini");
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      return {
        success: false,
        message: this.getFallbackResponse(userMessage),
        error: error.message,
        suggestions: [
          "Try rephrasing your question",
          "Ask about system basics",
          "Get cost estimates",
        ],
      };
    }
  }

  // Format user message with context information
  formatUserMessage(message, context) {
    let contextInfo = "";

    if (context.location) {
      contextInfo += `User location: ${context.location}\n`;
    }

    if (context.propertySize) {
      contextInfo += `Property size: ${context.propertySize}\n`;
    }

    if (context.roofArea) {
      contextInfo += `Roof area: ${context.roofArea}\n`;
    }

    if (context.currentSystem) {
      contextInfo += `Current water system: ${context.currentSystem}\n`;
    }

    return contextInfo ? `${contextInfo}\nUser question: ${message}` : message;
  }

  // Extract action suggestions from AI response
  extractSuggestions(response) {
    const suggestions = [];

    // Look for common patterns that suggest follow-up actions
    const patterns = {
      cost: ["Get detailed quote", "Compare options", "Financing info"],
      system: ["System comparison", "Installation guide", "Maintenance tips"],
      ROI: ["Calculate savings", "Payback timeline", "Financial benefits"],
      install: ["Find installers", "Get quotes", "Schedule consultation"],
      maintenance: ["Maintenance schedule", "Troubleshooting", "Seasonal tips"],
      regulation: ["Check permits", "Local codes", "Compliance guide"],
    };

    const lowerResponse = response.toLowerCase();

    Object.keys(patterns).forEach((key) => {
      if (lowerResponse.includes(key)) {
        suggestions.push(...patterns[key]);
      }
    });

    // Return unique suggestions, max 4
    return [...new Set(suggestions)].slice(0, 4);
  }

  // Generate contextual attachments based on conversation
  generateAttachments(userMessage, aiResponse) {
    const attachments = [];
    const lowerMessage = userMessage.toLowerCase();
    const lowerResponse = aiResponse.toLowerCase();

    // ROI Calculator attachment
    if (
      lowerMessage.includes("cost") ||
      lowerMessage.includes("roi") ||
      lowerResponse.includes("savings")
    ) {
      attachments.push({
        type: "calculator",
        title: "ROI Calculator",
        data: {
          systemCost: "Calculate based on your needs",
          annualSavings: "Estimated water bill reduction",
        },
      });
    }

    // System comparison attachment
    if (lowerMessage.includes("system") || lowerMessage.includes("compare")) {
      attachments.push({
        type: "comparison",
        title: "System Comparison",
        data: {
          basic: "Basic rainwater collection",
          advanced: "Smart automated system",
        },
      });
    }

    // Poll for gathering more info
    if (lowerResponse.includes("what") || lowerResponse.includes("prefer")) {
      attachments.push({
        type: "poll",
        question: "What's your primary goal?",
        options: [
          "Reduce water bills",
          "Environmental impact",
          "Emergency backup",
          "Garden irrigation",
        ],
      });
    }

    return attachments;
  }

  // Fallback response when Gemini API fails
  getFallbackResponse(userMessage) {
    const fallbacks = {
      cost: "I can help you estimate costs for rainwater harvesting systems. Typically, residential systems range from $2,000-$8,000 depending on capacity and features. Would you like me to provide a more detailed breakdown based on your specific needs?",
      system:
        "There are several types of rainwater harvesting systems to consider: basic collection systems, first-flush diverters, and advanced filtration systems. Each has different benefits depending on your intended use. What will you primarily use the collected water for?",
      maintenance:
        "Regular maintenance is key to system longevity. This typically includes cleaning gutters, checking filters, and inspecting tanks. I can provide a detailed maintenance schedule. What type of system are you considering?",
      roi: "Return on investment varies by location and usage, but most homeowners see payback in 3-7 years through reduced water bills. I can help calculate your specific ROI. What's your current monthly water bill?",
    };

    const lowerMessage = userMessage.toLowerCase();
    const matchedKey = Object.keys(fallbacks).find((key) =>
      lowerMessage.includes(key)
    );

    return matchedKey
      ? fallbacks[matchedKey]
      : `I'm here to help with your water sustainability questions! I can assist with system selection, cost analysis, installation guidance, and maintenance tips. Could you tell me more about what specific aspect you'd like to explore?`;
  }

  // Clear conversation history (for new conversations)
  clearHistory() {
    this.initializeConversation();
  }

  // Get conversation summary
  getConversationSummary() {
    const userMessages = this.conversationHistory.filter(
      (msg) => msg.role === "user"
    );
    const lastUserMessage = userMessages[userMessages.length - 1];

    return {
      messageCount: userMessages.length,
      lastTopic: lastUserMessage
        ? lastUserMessage.parts[0].text.substring(0, 50) + "..."
        : "Getting started",
      timestamp: new Date(),
    };
  }
}

// Export singleton instance
export const geminiService = new GeminiService();

// Initialize on import
geminiService.initializeConversation();

export default GeminiService;
