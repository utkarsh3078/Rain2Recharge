import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WaterBuddyAssistant = ({ currentStep, locationData, propertyData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Provide contextual assistance based on current step
    const contextualTips = {
      1: "Hi! I\'m WaterBuddy 💧 I\'m here to help you through your water assessment. Need help finding your exact address or have questions about location accuracy?",
      2: "Great location choice! Now let\'s talk about your property. Not sure about your roof size? I can help you estimate it based on your home type and square footage.",
      3: "Interesting climate data for your area! I notice your rainfall patterns show good collection potential. Would you like me to explain what this means for your water savings?",
      4: "Your feasibility scores are looking promising! I can explain what each factor means and how to improve your water solution potential.",
      5: "Congratulations on completing your assessment! I can help you understand your results and suggest next steps for implementation."
    };

    if (currentStep && !messages?.length) {
      setMessages([{
        id: 1,
        sender: 'WaterBuddy',
        content: contextualTips?.[currentStep] || "Hello! I'm here to help with your water assessment. Ask me anything!",
        timestamp: new Date(),
        type: 'assistant'
      }]);
    }
  }, [currentStep]);

  const mockResponses = [
    "That's a great question! Based on your property details, I'd recommend starting with a 2,500-gallon storage system for optimal water collection.",
    "Your roof area of {roofSize} sq ft can collect approximately {collection} gallons per inch of rainfall. That's excellent potential!",
    "For your location in Austin, the best collection months are typically April-May and September-October when rainfall is highest.",
    "Groundwater recharge systems work well in your soil type. The permeable clay allows good infiltration while filtering contaminants.",
    "Local regulations in Texas are very favorable for rainwater harvesting. You may even qualify for tax incentives!",
    "I\'d suggest starting with rainwater harvesting since your feasibility score is 85/100. It offers the best return on investment for your property.",
    "The payback period for your system would be approximately 3.2 years, considering water bill savings and potential rebates.",
    "Your climate data shows moderate drought risk. A storage system would provide excellent backup during dry periods."
  ];

  const handleSendMessage = () => {
    if (!inputMessage?.trim()) return;

    const userMessage = {
      id: messages?.length + 1,
      sender: 'You',
      content: inputMessage,
      timestamp: new Date(),
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses?.[Math.floor(Math.random() * mockResponses?.length)];
      const processedResponse = randomResponse?.replace('{roofSize}', propertyData?.roofSize?.toLocaleString() || '1,500')?.replace('{collection}', Math.round((propertyData?.roofSize || 1500) * 0.623));

      const assistantMessage = {
        id: messages?.length + 2,
        sender: 'WaterBuddy',
        content: processedResponse,
        timestamp: new Date(),
        type: 'assistant'
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    "How much water can I collect?",
    "What\'s the installation cost?",
    "Do I need permits?",
    "How does maintenance work?",
    "What rebates are available?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-primary rounded-full shadow-brand-lg flex items-center justify-center text-white hover:shadow-brand transition-all duration-300 hover:scale-105"
        >
          {isOpen ? (
            <Icon name="X" size={24} />
          ) : (
            <div className="relative">
              <Icon name="Bot" size={24} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          )}
        </button>
      </div>
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-96 bg-white rounded-xl shadow-elevation border border-border z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center space-x-3 p-4 border-b border-border bg-gradient-primary rounded-t-xl text-white">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="Bot" size={18} />
            </div>
            <div>
              <h4 className="font-semibold">WaterBuddy</h4>
              <p className="text-xs opacity-90">Your AI Water Assistant</p>
            </div>
            <div className="ml-auto flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message?.type === 'user' ?'bg-primary text-white' :'bg-gray-100 text-text-primary'
                  }`}
                >
                  <p className="text-sm">{message?.content}</p>
                  <p className={`text-xs mt-1 ${
                    message?.type === 'user' ? 'text-white/70' : 'text-text-secondary'
                  }`}>
                    {message?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages?.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-text-secondary mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions?.slice(0, 3)?.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-text-secondary transition-colors duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                placeholder="Ask WaterBuddy anything..."
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                variant="default"
                size="sm"
                onClick={handleSendMessage}
                disabled={!inputMessage?.trim() || isTyping}
                iconName="Send"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WaterBuddyAssistant;