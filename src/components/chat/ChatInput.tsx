import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface ChatInputProps {
  onSendMessage: (msg: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about candidates (e.g., 'Who has the most React experience?')"
        className="w-full bg-card border rounded-xl pl-4 pr-16 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
        disabled={isLoading}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <Button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          size="sm"
          className="rounded-lg"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </form>
  );
}
