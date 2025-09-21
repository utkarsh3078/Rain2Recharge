import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ChatMessage from './components/ChatMessage';
import ConversationStarters from './components/ConversationStarters';
import ChatInput from './components/ChatInput';
import ConversationHistory from './components/ConversationHistory';
import ProactiveAssistance from './components/ProactiveAssistance';
import ExpertEscalation from './components/ExpertEscalation';

const AIAssistantWaterBuddyInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock conversation history
  const [conversations] = useState([
    {
      id: 1,
      title: "Rainwater System Selection",
      lastMessage: "Based on your roof area, I recommend a 5000-gallon system...",
      lastActivity: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 12,
      category: "guidance",
      hasBookmarks: true
    },
    {
      id: 2,
      title: "ROI Calculation Help",
      lastMessage: "Your payback period would be approximately 3.2 years...",
      lastActivity: new Date(Date.now() - 172800000), // 2 days ago
      messageCount: 8,
      category: "financial",
      hasBookmarks: false
    },
    {
      id: 3,
      title: "Local Installer Search",
      lastMessage: "I found 5 certified installers within 25 miles of your location...",
      lastActivity: new Date(Date.now() - 259200000), // 3 days ago
      messageCount: 6,
      category: "services",
      hasBookmarks: true
    },
    {
      id: 4,
      title: "Winter Maintenance Guide",
      lastMessage: "Here's your personalized winter maintenance checklist...",
      lastActivity: new Date(Date.now() - 604800000), // 1 week ago
      messageCount: 15,
      category: "maintenance",
      hasBookmarks: false
    }
  ]);

  // Mock initial messages for demonstration
  const initialMessages = [
    {
      id: 1,
      message: `Welcome back! I'm WaterBuddy, your AI assistant for smart water sustainability decisions. I see you're interested in rainwater harvesting systems.\n\nBased on your location in Austin, Texas, and your 2,400 sq ft roof area, I can help you:\n• Choose the right system size\n• Calculate potential savings\n• Find certified installers\n• Plan maintenance schedules\n\nWhat would you like to explore first?`,
      isUser: false,
      timestamp: new Date(Date.now() - 300000),
      attachments: [
        {
          type: 'calculator',
          title: 'Quick ROI Calculator',
          data: {
            cost: '$3,200 - $4,800',
            savings: '$480/year'
          }
        }
      ],
      suggestions: ['System recommendations', 'Cost breakdown', 'Local incentives', 'Installation timeline']
    }
  ];

  useEffect(() => {
    if (currentConversationId === null) {
      setMessages(initialMessages);
    }
  }, [currentConversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      message: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      'help me choose a system': {
        message: `Great! I'd be happy to help you choose the perfect rainwater harvesting system. Based on your property details, here are my recommendations:\n\n**For Your 2,400 sq ft Roof:**\n• **First Flush Diverter System** - Best for drinking water quality\n• **Modular Tank System** - Flexible capacity (2,000-8,000 gallons)\n• **Underground Cistern** - Space-saving, year-round protection\n\nYour roof can collect approximately 1,500 gallons per inch of rainfall. Austin averages 34 inches annually, so you could harvest about 51,000 gallons per year!\n\nWould you like me to dive deeper into any of these options?`,
        attachments: [
          {
            type: 'poll',
            question: 'What\'s your primary use for harvested water?',
            options: ['Irrigation only', 'Household use', 'Emergency backup', 'All of the above']
          }
        ],
        suggestions: ['Compare costs', 'Installation requirements', 'Maintenance needs', 'Local regulations']
      },
      'what\'s my roi timeline': {
        message: `Excellent question! Let me break down your ROI timeline based on Austin's water rates and your property size:\n\n**Investment Analysis:**\n• System Cost: $3,200 - $4,800 (installed)\n• Annual Water Savings: $480 - $720\n• Maintenance Costs: $120/year\n• **Net Annual Savings: $360 - $600**\n\n**Payback Timeline:**\n• Conservative estimate: 6.7 years\n• Optimistic estimate: 4.4 years\n• Average: **5.5 years**\n\n**Additional Benefits:**\n• Property value increase: $2,000 - $3,500\n• Drought protection: Priceless\n• Environmental impact: 15,000 gallons/year saved`,
        attachments: [
          {
            type: 'calculator',
            title: 'Detailed ROI Calculator',
            data: {
              cost: '$4,000 average',
              savings: '$600/year net'
            }
          }
        ],
        suggestions: ['Financing options', 'Tax incentives', 'System upgrades', 'Maintenance planning']
      },
      'find local installers': {
        message: `I've found several certified installers in the Austin area who specialize in rainwater harvesting systems:\n\n**Top Rated Installers:**\n\n🏆 **Austin Rainwater Solutions**\n• Rating: 4.9/5 (127 reviews)\n• Specializes in residential systems\n• Free estimates, 10-year warranty\n• Distance: 8 miles from you\n\n⭐ **Texas Water Harvest Co.**\n• Rating: 4.8/5 (89 reviews)\n• Licensed & insured\n• Financing available\n• Distance: 12 miles from you\n\n🔧 **Hill Country Water Systems**\n• Rating: 4.7/5 (156 reviews)\n• 15+ years experience\n• Maintenance packages available\n• Distance: 18 miles from you\n\nWould you like me to help you schedule consultations or get quotes?`,
        suggestions: ['Schedule consultation', 'Compare quotes', 'Check availability', 'Read reviews']
      },
      'seasonal maintenance tips': {
        message: `Perfect timing! Here's your personalized seasonal maintenance guide for Austin's climate:\n\n**Winter Maintenance (Dec-Feb):**\n• Insulate exposed pipes and fittings\n• Check for freeze damage after cold snaps\n• Clean gutters of leaves and debris\n• Test pump systems monthly\n\n**Spring Preparation (Mar-May):**\n• Inspect and clean first flush diverters\n• Check tank integrity and seals\n• Test overflow systems before heavy rains\n• Schedule professional inspection\n\n**Summer Optimization (Jun-Aug):**\n• Monitor water quality in hot weather\n• Clean screens and filters monthly\n• Check for algae growth in tanks\n• Optimize irrigation schedules\n\n**Fall Readiness (Sep-Nov):**\n• Clear gutters and downspouts\n• Inspect roof and collection surfaces\n• Prepare for winter weather\n• Stock up on maintenance supplies\n\nWould you like me to set up seasonal reminders for these tasks?`,
        suggestions: ['Set reminders', 'Maintenance checklist', 'Find supplies', 'Schedule service']
      }
    };

    const lowerMessage = userMessage?.toLowerCase();
    const matchedResponse = Object.keys(responses)?.find(key => 
      lowerMessage?.includes(key?.toLowerCase())
    );

    const response = matchedResponse ? responses?.[matchedResponse] : {
      message: `I understand you're asking about "${userMessage}". Let me help you with that!\n\nBased on your location in Austin and your interest in water sustainability, I can provide specific guidance on:\n\n• System selection and sizing\n• Cost analysis and ROI calculations\n• Local regulations and permits\n• Installation and maintenance\n• Seasonal optimization tips\n\nCould you be more specific about what aspect you'd like to explore? I'm here to make your water sustainability journey as smooth as possible!`,
      suggestions: ['System recommendations', 'Cost analysis', 'Local requirements', 'Get started']
    };

    return {
      id: Date.now() + 1,
      message: response?.message,
      isUser: false,
      timestamp: new Date(),
      attachments: response?.attachments || [],
      suggestions: response?.suggestions || []
    };
  };

  const handleStarterClick = (starterText) => {
    handleSendMessage(starterText);
  };

  const handleSelectConversation = (conversationId) => {
    setCurrentConversationId(conversationId);
    if (conversationId === null) {
      setMessages([]);
    } else {
      // Load conversation messages (mock data)
      const mockMessages = [
        {
          id: 1,
          message: "I need help choosing a rainwater harvesting system for my home.",
          isUser: true,
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          id: 2,
          message: "I\'d be happy to help! Can you tell me about your property size and location?",
          isUser: false,
          timestamp: new Date(Date.now() - 3500000)
        }
      ];
      setMessages(mockMessages);
    }
  };

  const handleVoiceInput = (isActive) => {
    setIsVoiceActive(isActive);
    if (isActive) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsVoiceActive(false);
        handleSendMessage("What's the best system for a 2000 square foot home?");
      }, 3000);
    }
  };

  const handleProactiveAction = (suggestionId, action) => {
    console.log('Proactive action:', suggestionId, action);
    if (action?.label === 'Show Checklist') {
      handleSendMessage('Show me the winter maintenance checklist');
    }
  };

  const handleExpertEscalation = (formData) => {
    console.log('Expert escalation request:', formData);
    const confirmationMessage = {
      id: Date.now(),
      message: `Thank you for your expert consultation request! I've connected you with our specialist team.\n\n**Request Details:**\n• Category: ${formData?.category}\n• Urgency: ${formData?.urgency}\n• Preferred Contact: ${formData?.preferredContact}\n\nA qualified expert will contact you within the next 2-4 hours. In the meantime, I'm still here to help with any other questions!`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, confirmationMessage]);
  };

  return (
    <>
      <Helmet>
        <title>AI Assistant - WaterBuddy Interface | Rain2Recharge</title>
        <meta name="description" content="Chat with WaterBuddy, your AI assistant for smart water sustainability decisions. Get personalized recommendations, ROI calculations, and expert guidance for rainwater harvesting systems." />
        <meta name="keywords" content="AI assistant, water sustainability, rainwater harvesting, WaterBuddy, smart water decisions, ROI calculator" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Header />
        
        <div className="pt-16 h-screen flex">
          {/* Conversation History Sidebar */}
          <ConversationHistory
            conversations={conversations}
            onSelectConversation={handleSelectConversation}
            currentConversationId={currentConversationId}
          />

          {/* Main Chat Interface */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Icon name="Bot" size={24} color="white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-text-primary">WaterBuddy AI Assistant</h1>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Online • Responds instantly</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowExpertModal(true)}
                    iconName="Users"
                    iconPosition="left"
                  >
                    Expert Help
                  </Button>
                  
                  <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-hover rounded-lg transition-colors duration-200">
                    <Icon name="MoreVertical" size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages?.length === 0 ? (
                <ConversationStarters
                  onStarterClick={handleStarterClick}
                  isVisible={true}
                />
              ) : (
                <>
                  {messages?.map((message) => (
                    <ChatMessage
                      key={message?.id}
                      message={message?.message}
                      isUser={message?.isUser}
                      timestamp={message?.timestamp}
                      attachments={message?.attachments}
                      suggestions={message?.suggestions}
                      avatar={message?.isUser ? null : {
                        icon: "Bot",
                        color: "white",
                        background: "gradient-to-br from-teal-400 to-blue-500"
                      }}
                    />
                  ))}
                  
                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                          <Icon name="Bot" size={16} color="white" />
                        </div>
                        <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              onVoiceInput={handleVoiceInput}
            />
          </div>
        </div>

        {/* Proactive Assistance */}
        <ProactiveAssistance
          userLocation="Austin, TX"
          systemType="rainwater harvesting"
          onDismiss={(id) => console.log('Dismissed:', id)}
          onAccept={handleProactiveAction}
        />

        {/* Expert Escalation Modal */}
        <ExpertEscalation
          isOpen={showExpertModal}
          onClose={() => setShowExpertModal(false)}
          onSubmit={handleExpertEscalation}
          conversationContext={messages?.slice(-5)} // Last 5 messages for context
        />

        {/* Voice Recording Overlay */}
        {isVoiceActive && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 text-center shadow-elevation">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Icon name="Mic" size={32} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Listening...</h3>
              <p className="text-text-secondary mb-4">Speak your question about water sustainability</p>
              <Button
                variant="outline"
                onClick={() => setIsVoiceActive(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AIAssistantWaterBuddyInterface;