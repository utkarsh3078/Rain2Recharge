import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ChatMessage = ({ message, isUser, timestamp, avatar, attachments, suggestions }) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderAttachment = (attachment) => {
    switch (attachment?.type) {
      case 'calculator':
        return (
          <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Calculator" size={20} color="var(--color-primary)" />
              <span className="font-medium text-text-primary">{attachment?.title}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">System Cost:</span>
                <div className="font-semibold text-text-primary">{attachment?.data?.cost}</div>
              </div>
              <div>
                <span className="text-text-secondary">Annual Savings:</span>
                <div className="font-semibold text-success">{attachment?.data?.savings}</div>
              </div>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="mt-3 rounded-xl overflow-hidden">
            <Image 
              src={attachment?.url} 
              alt={attachment?.alt}
              className="w-full h-48 object-cover"
            />
          </div>
        );
      case 'poll':
        return (
          <div className="mt-3 p-4 bg-muted rounded-xl">
            <div className="font-medium text-text-primary mb-3">{attachment?.question}</div>
            <div className="space-y-2">
              {attachment?.options?.map((option, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 rounded-lg border border-border hover:bg-hover transition-colors duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-3`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          {isUser ? (
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
              <Icon name="Bot" size={16} color="white" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 rounded-2xl max-w-full ${
            isUser 
              ? 'bg-primary text-primary-foreground rounded-br-md' 
              : 'bg-white border border-border rounded-bl-md shadow-sm'
          }`}>
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {message}
            </div>
            
            {/* Attachments */}
            {attachments && attachments?.map((attachment, index) => (
              <div key={index}>
                {renderAttachment(attachment)}
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {suggestions && suggestions?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  className="px-3 py-1.5 text-xs bg-hover border border-border rounded-full text-text-secondary hover:text-text-primary hover:bg-accent/10 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Timestamp */}
          <div className={`text-xs text-text-secondary mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;