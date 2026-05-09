import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { chatService } from '../services/chatService';
import { resumeService } from '../services/resumeService';
import { Resume } from '../types';
import { ChatBubble } from '../components/chat/ChatBubble';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function ChatPage() {
  const { messages, isLoading, sessionId, addMessage, setLoading } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [candidates, setCandidates] = useState<Resume[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string>('all');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await resumeService.getAll();
        setCandidates(data);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      }
    };
    fetchCandidates();
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content,
      timestamp: new Date().toISOString()
    };
    
    addMessage(userMsg);
    setLoading(true);

    try {
      const response = await chatService.sendMessage(content, sessionId, selectedCandidate);
      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: response.answer,
        candidates: response.candidates,
        timestamp: new Date().toISOString()
      };
      addMessage(assistantMsg);
    } catch (error) {
      addMessage({
        id: Date.now().toString() + '-error',
        role: 'assistant',
        content: "Sorry, I encountered an error processing your request. Please check your backend connection.",
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Candidate Assistant</h1>
            <p className="text-sm text-muted-foreground">Ask natural language questions about your talent pool.</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="candidate-select" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            Candidate:
          </label>
          <select
            id="candidate-select"
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
            className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-[200px]"
          >
            <option value="all">All</option>
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>
                {c.candidate_name || `Candidate ${c.id}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-card border rounded-2xl flex flex-col shadow-sm">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 scroll-smooth"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <MessageSquare className="h-12 w-12 mb-4" />
              <p className="text-lg font-medium">No messages yet</p>
              <p className="text-sm max-w-xs">Try asking: "Which candidates have more than 5 years of experience with Python?"</p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))
          )}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-none flex space-x-1 items-center">
                <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t bg-muted/30">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
