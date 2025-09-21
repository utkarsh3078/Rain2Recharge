import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const ConversationHistory = ({ conversations, onSelectConversation, currentConversationId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredConversations = conversations?.filter(conv =>
    conv?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    conv?.lastMessage?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate?.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } else if (diffInHours < 168) { // 7 days
      return messageDate?.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageDate?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      guidance: "Settings",
      financial: "TrendingUp",
      services: "MapPin",
      maintenance: "Calendar",
      legal: "FileText",
      support: "AlertCircle",
      general: "MessageCircle"
    };
    return icons?.[category] || "MessageCircle";
  };

  return (
    <div className={`bg-white border-r border-border transition-all duration-300 ${
      isExpanded ? 'w-80' : 'w-16'
    } lg:w-80`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
            <h2 className="text-lg font-semibold text-text-primary">Chat History</h2>
            <p className="text-sm text-text-secondary">Your conversations with WaterBuddy</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden p-2 rounded-lg hover:bg-hover transition-colors duration-200"
          >
            <Icon name={isExpanded ? "ChevronLeft" : "MessageCircle"} size={20} />
          </button>
        </div>

        {/* Search */}
        <div className={`mt-4 ${isExpanded ? 'block' : 'hidden'} lg:block`}>
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>
      </div>
      {/* Conversations List */}
      <div className={`flex-1 overflow-y-auto ${isExpanded ? 'block' : 'hidden'} lg:block`}>
        {filteredConversations?.length === 0 ? (
          <div className="p-4 text-center">
            <Icon name="MessageCircle" size={48} color="var(--color-text-secondary)" className="mx-auto mb-3" />
            <p className="text-text-secondary text-sm">
              {searchTerm ? 'No conversations found' : 'No conversations yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations?.map((conversation) => (
              <button
                key={conversation?.id}
                onClick={() => onSelectConversation(conversation?.id)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                  currentConversationId === conversation?.id
                    ? 'bg-primary/10 border border-primary/20' :'hover:bg-hover'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    currentConversationId === conversation?.id
                      ? 'bg-primary text-white' :'bg-muted text-text-secondary'
                  }`}>
                    <Icon name={getCategoryIcon(conversation?.category)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-text-primary text-sm truncate">
                        {conversation?.title}
                      </h4>
                      <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                        {formatDate(conversation?.lastActivity)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-text-secondary line-clamp-2">
                      {conversation?.lastMessage}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-text-secondary">
                        {conversation?.messageCount} messages
                      </span>
                      {conversation?.hasBookmarks && (
                        <Icon name="Bookmark" size={12} color="var(--color-warning)" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* New Chat Button */}
      <div className={`p-4 border-t border-border ${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <button
          onClick={() => onSelectConversation(null)}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-primary text-white rounded-lg hover:shadow-brand transition-all duration-200"
        >
          <Icon name="Plus" size={18} />
          <span>New Chat</span>
        </button>
      </div>
      {/* Collapsed State Quick Actions */}
      <div className={`${isExpanded ? 'hidden' : 'block'} lg:hidden p-2 space-y-2`}>
        <button
          onClick={() => onSelectConversation(null)}
          className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          <Icon name="Plus" size={20} />
        </button>
        <button className="w-full p-3 text-text-secondary hover:text-text-primary hover:bg-hover rounded-lg transition-colors duration-200">
          <Icon name="Search" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ConversationHistory;