import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isLoading, onVoiceInput }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef?.current?.scrollHeight, 120) + 'px';
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (onVoiceInput) {
      onVoiceInput(!isRecording);
    }
  };

  const quickActions = [
    { icon: "Camera", label: "Photo", action: () => console.log('Photo') },
    { icon: "Paperclip", label: "Attach", action: () => console.log('Attach') },
    { icon: "Calculator", label: "Calculate", action: () => console.log('Calculate') }
  ];

  return (
    <div className="border-t border-border bg-white p-4">
      {/* Quick Actions */}
      <div className="flex items-center space-x-2 mb-3 overflow-x-auto pb-2">
        {quickActions?.map((action, index) => (
          <button
            key={index}
            onClick={action?.action}
            className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-hover transition-colors duration-200 whitespace-nowrap"
          >
            <Icon name={action?.icon} size={16} />
            <span>{action?.label}</span>
          </button>
        ))}
      </div>
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask WaterBuddy anything about water sustainability..."
            className="w-full px-4 py-3 pr-12 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary placeholder-text-secondary"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
            disabled={isLoading}
          />
          
          {/* Character count */}
          {message?.length > 0 && (
            <div className="absolute bottom-2 right-3 text-xs text-text-secondary">
              {message?.length}/500
            </div>
          )}
        </div>

        {/* Voice Input Button */}
        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording 
              ? 'bg-red-500 text-white animate-pulse' :'bg-muted text-text-secondary hover:bg-accent hover:text-white'
          }`}
          disabled={isLoading}
        >
          <Icon name={isRecording ? "Square" : "Mic"} size={20} />
        </button>

        {/* Send Button */}
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message?.trim() || isLoading}
          loading={isLoading}
          className="w-12 h-12 rounded-full gradient-primary"
        >
          <Icon name="Send" size={20} color="white" />
        </Button>
      </form>
      {/* Voice Recording Indicator */}
      {isRecording && (
        <div className="mt-3 flex items-center justify-center space-x-2 text-red-500">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Listening...</span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      )}
      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-3 flex items-center justify-center space-x-2 text-text-secondary">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm">WaterBuddy is thinking...</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;