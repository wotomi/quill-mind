import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles,
  FileText,
  Copy,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
  selectedFile: string | null;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  fileContext?: string;
}

export const ChatPanel = ({ selectedFile }: ChatPanelProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your AI assistant. I can help you with writing, editing, and improving your markdown documents. How can I assist you today?",
      timestamp: new Date(),
    },
    {
      id: "2", 
      type: "user",
      content: "Can you help me improve the structure of my README file?",
      timestamp: new Date(),
      fileContext: "README.md"
    },
    {
      id: "3",
      type: "ai", 
      content: "I'd be happy to help improve your README structure! Here are some suggestions:\n\n1. **Clear title and description** - Make sure your project name and purpose are immediately clear\n2. **Installation instructions** - Step-by-step setup guide\n3. **Usage examples** - Show how to use your project\n4. **Contributing guidelines** - Help others contribute\n\nWould you like me to analyze your current README and suggest specific improvements?",
      timestamp: new Date(),
      fileContext: "README.md"
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
      fileContext: selectedFile || undefined
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `I understand you want help with "${message}". Let me analyze this in the context of ${selectedFile || "your current work"} and provide some suggestions...`,
        timestamp: new Date(),
        fileContext: selectedFile || undefined
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-full bg-card flex flex-col">
      {/* Header */}
      <div className="h-12 border-b border-panel-border bg-panel-header flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-ai flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">AI Assistant</span>
        </div>
        
        {selectedFile && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <FileText className="w-3 h-3" />
            {selectedFile}
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={cn(
                "flex gap-3",
                msg.type === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.type === "ai" && (
                <Avatar className="w-8 h-8 bg-gradient-ai">
                  <AvatarFallback className="bg-transparent">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={cn(
                "max-w-[85%] rounded-lg p-3 space-y-2",
                msg.type === "user" 
                  ? "bg-primary text-primary-foreground ml-auto" 
                  : "bg-secondary text-secondary-foreground"
              )}>
                {msg.fileContext && (
                  <div className="flex items-center gap-1 text-xs opacity-70">
                    <FileText className="w-3 h-3" />
                    {msg.fileContext}
                  </div>
                )}
                
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>

                {msg.type === "ai" && (
                  <div className="flex items-center gap-1 pt-1">
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs opacity-60 hover:opacity-100">
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 opacity-60 hover:opacity-100">
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 opacity-60 hover:opacity-100">
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>

              {msg.type === "user" && (
                <Avatar className="w-8 h-8 bg-muted">
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-panel-border">
        <div className="flex gap-2">
          <Input
            placeholder="Ask AI about your document..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-background border-border"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            size="sm"
            className="bg-gradient-ai hover:opacity-90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Sparkles className="w-3 h-3" />
          AI can make mistakes. Verify important information.
        </div>
      </div>
    </div>
  );
};