import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIAssistantPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const messages = [
    {
      type: 'assistant',
      content: "Hi! I'm WaterBuddy, your AI water sustainability assistant. How can I help you today?",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      type: 'user',
      content: "I want to install a rainwater harvesting system but don't know where to start.",
      timestamp: new Date(Date.now() - 240000)
    },
    {
      type: 'assistant',
      content: `Great choice! Let me help you get started. Based on your location and property type, I can provide personalized recommendations.\n\nFirst, let's assess your property's potential. Would you like me to:\n\n• Analyze your roof area and rainfall data\n• Calculate potential water savings\n• Estimate installation costs\n• Find local certified installers`,
      timestamp: new Date(Date.now() - 180000)
    },
    {
      type: 'user',
      content: "Yes, please analyze my roof area and calculate savings!",
      timestamp: new Date(Date.now() - 120000)
    },
    {
      type: 'assistant',
      content: `Perfect! I'll need a few details:\n\n📍 Your location (for rainfall data)\n🏠 Roof size (approximate square footage)\n💧 Current water usage\n\nShall we start with a quick assessment? It takes just 3 minutes and provides detailed insights!`,
      timestamp: new Date(Date.now() - 60000)
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      if (currentMessage < messages?.length - 1) {
        setIsTyping(true);
        setTimeout(() => {
          setCurrentMessage(prev => prev + 1);
          setIsTyping(false);
        }, 1500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentMessage, messages?.length]);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-teal-200">
                <Icon name="Bot" size={20} color="var(--color-accent)" />
                <span className="text-sm font-medium text-accent">AI-Powered Assistant</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
                Meet WaterBuddy
                <br />
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Your Smart Water Guide
                </span>
              </h2>
              
              <p className="text-xl text-text-secondary leading-relaxed">
                Get instant, personalized guidance for your water sustainability journey. 
                WaterBuddy uses advanced AI to provide expert recommendations, answer questions, 
                and guide you through every step of implementation.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: 'Zap', title: 'Instant Answers', desc: '24/7 expert guidance' },
                { icon: 'Target', title: 'Personalized', desc: 'Tailored to your property' },
                { icon: 'BookOpen', title: 'Educational', desc: 'Learn as you implement' },
                { icon: 'Users', title: 'Community', desc: 'Connect with others' }
              ]?.map((feature, index) => (
                <div key={feature?.title} className="flex items-start space-x-3 p-4 bg-white/60 rounded-xl">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={feature?.icon} size={20} color="var(--color-accent)" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{feature?.title}</h4>
                    <p className="text-sm text-text-secondary">{feature?.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/ai-assistant-water-buddy-interface">
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 shadow-brand"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Chat with WaterBuddy
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50"
                iconName="Play"
                iconPosition="left"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Chat Interface Preview */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white rounded-3xl shadow-elevation overflow-hidden max-w-md mx-auto">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon name="Bot" size={20} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">WaterBuddy</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-white/90">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages?.slice(0, currentMessage + 1)?.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message?.type === 'user' ?'bg-blue-600 text-white' :'bg-gray-100 text-text-primary'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message?.content}</p>
                      <p className={`text-xs mt-1 ${
                        message?.type === 'user' ? 'text-blue-100' : 'text-text-secondary'
                      }`}>
                        {formatTime(message?.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                    <span className="text-sm text-text-secondary">Ask WaterBuddy anything...</span>
                  </div>
                  <button className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                    <Icon name="Send" size={16} color="white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-brand flex items-center justify-center animate-pulse-gentle">
              <Icon name="Sparkles" size={24} color="var(--color-accent)" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-full shadow-brand flex items-center justify-center animate-pulse-gentle" style={{ animationDelay: '1s' }}>
              <Icon name="MessageCircle" size={20} color="var(--color-primary)" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantPreview;