import { ChatMessage } from '../../types';
import { cn } from '../../lib/utils';
import { User, Bot, CheckCircle, FileText, Download } from 'lucide-react';

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === 'assistant';

  // Filter candidates with score >= 7
  const topCandidates = message.candidates?.filter(c => c.score >= 7) || [];

  const renderContentWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-1 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors no-underline"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={cn("flex w-full mb-4", isAssistant ? "justify-start" : "justify-end")}>
      <div className={cn(
        "flex max-w-[80%] gap-3",
        !isAssistant && "flex-row-reverse"
      )}>
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
          isAssistant ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {isAssistant ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
        </div>
        <div className={cn(
          "p-4 rounded-2xl text-sm shadow-sm flex flex-col",
          isAssistant
            ? "bg-card border text-foreground rounded-tl-none"
            : "bg-primary text-primary-foreground rounded-tr-none"
        )}>
          <div className="whitespace-pre-wrap">{renderContentWithLinks(message.content)}</div>

          {isAssistant && topCandidates.length > 0 && (
            <div className="mt-4 space-y-3 border-t pt-4">
              <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Top Recommended Candidates</p>
              <div className="flex flex-col gap-2">
                {topCandidates.map((candidate) => (
                  <div key={candidate.resume_id} className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg border">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm truncate">
                          {candidate.candidate_name || "Unknown Candidate"}
                        </h4>
                        <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                          <CheckCircle className="h-3 w-3" />
                          <span>{candidate.score} / 10</span>
                        </div>
                      </div>
                      {candidate.summary && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {candidate.summary}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={cn(
            "text-[10px] mt-2 opacity-70",
            !isAssistant && "text-right"
          )}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}
