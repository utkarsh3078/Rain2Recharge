# Gemini AI Integration Guide

Your WaterBuddy chatbot is now integrated with Google's Gemini AI! This guide will help you set up and configure the AI assistant.

## 🚀 Quick Setup

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables

1. Open your `.env` file in the project root
2. Add your Gemini API key:

```bash
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Test the Integration

1. Start your development server:

```bash
npm run dev
```

2. Navigate to the AI Assistant page
3. Try asking: "What's the best rainwater system for my home?"

## ✨ Features

### **Smart Conversations**

- **Context Awareness**: Remembers conversation history
- **Domain Expertise**: Specialized in water sustainability
- **Personalized Responses**: Uses location and property data
- **Follow-up Suggestions**: Provides relevant next steps

### **Error Handling**

- **Graceful Fallbacks**: Works even when API is unavailable
- **Clear Error Messages**: User-friendly error notifications
- **Retry Mechanisms**: Automatic recovery from temporary issues

### **Advanced Capabilities**

- **Dynamic Attachments**: Generates relevant tools and calculators
- **Suggestion Engine**: Smart follow-up question recommendations
- **Context Formatting**: Includes user property details in queries

## 🛠 Technical Details

### **API Configuration**

- **Model**: gemini-1.5-flash (fast and cost-effective)
- **Temperature**: 0.7 (balanced creativity/accuracy)
- **Max Tokens**: 1024 (detailed responses)
- **Safety Settings**: Configured for safe conversations

### **Conversation Management**

```javascript
// Start new conversation
geminiService.clearHistory();

// Send message with context
const response = await geminiService.sendMessage(message, {
  location: "Austin, Texas",
  roofArea: "2,400 sq ft",
  propertySize: "Residential",
});
```

### **Custom System Prompt**

The AI is configured with expertise in:

- Rainwater harvesting systems
- ROI calculations and cost analysis
- Water conservation techniques
- System maintenance and troubleshooting
- Local regulations and permits
- Environmental impact assessment

## 💡 Usage Examples

### **System Recommendations**

```
User: "I need help choosing a rainwater system"
AI: Analyzes property details and provides specific recommendations with costs
```

### **ROI Calculations**

```
User: "What's my return on investment?"
AI: Calculates payback period based on location and usage patterns
```

### **Maintenance Guidance**

```
User: "How do I maintain my system?"
AI: Provides seasonal maintenance schedules and troubleshooting tips
```

## 🔧 Customization

### **Update User Context**

Modify the `userContext` object in the main component:

```javascript
const [userContext, setUserContext] = useState({
  location: "Your City, State",
  roofArea: "Your roof area",
  propertySize: "Residential/Commercial",
  currentSystem: "Current water setup",
});
```

### **Modify AI Personality**

Edit the `SYSTEM_PROMPT` in `geminiService.js` to change:

- Expertise areas
- Response style
- Personality traits
- Output format

### **Adjust API Settings**

Fine-tune the generation config:

```javascript
generationConfig: {
  temperature: 0.7,        // Creativity (0-1)
  topK: 40,               // Token diversity
  topP: 0.95,             // Nucleus sampling
  maxOutputTokens: 1024   // Response length
}
```

## 🔒 Privacy & Security

### **Data Protection**

- No conversation data stored permanently
- API keys secure with environment variables
- User location data only used for context

### **Safety Settings**

- Content filtering enabled
- Harassment protection
- Safe conversation boundaries

### **Error Boundaries**

- Fallback responses when API unavailable
- Network error handling
- Rate limiting protection

## 📊 Cost Management

### **Gemini API Pricing**

- **gemini-1.5-flash**: $0.15 per 1M input tokens, $0.60 per 1M output tokens
- **Typical conversation**: ~500 tokens input, ~300 tokens output
- **Estimated cost**: ~$0.0003 per message

### **Optimization Tips**

- Use conversation history efficiently
- Clear history for new topics
- Monitor usage through Google Cloud Console

## 🐛 Troubleshooting

### **"API Key not working"**

- Verify API key is correct in `.env`
- Check API key has proper permissions
- Restart development server after adding key

### **"Rate limit exceeded"**

- Wait a few minutes before retrying
- Consider upgrading API quota
- Implement request queuing

### **"No response from AI"**

- Check internet connection
- Verify API key quota
- Look for safety filter blocks

### **Fallback Mode Active**

- AI will use pre-written responses
- Basic functionality still available
- Check console for specific errors

## 🎯 Best Practices

1. **Test Thoroughly**: Always test with your actual API key
2. **Monitor Usage**: Keep track of API calls and costs
3. **Handle Errors**: Provide clear feedback when issues occur
4. **Update Context**: Keep user context current for better responses
5. **Secure Keys**: Never commit API keys to version control

## 🚀 Next Steps

1. **Add your Gemini API key** to the `.env` file
2. **Test the chatbot** with various water sustainability questions
3. **Customize the system prompt** for your specific use case
4. **Monitor usage** and adjust settings as needed

Your AI-powered WaterBuddy is ready to help users make smart water sustainability decisions!
