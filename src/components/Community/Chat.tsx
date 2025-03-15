import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessage {
  text: string;
  sender: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Card className="w-full shadow-md border border-border">
      <CardContent className="p-6">
        <div className="h-96 overflow-y-auto bg-secondary/30 p-4 rounded-md mb-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-2 opacity-50" />
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-2 p-3 rounded-lg ${
                  msg.sender === "You" 
                    ? "bg-primary/10 ml-auto max-w-[80%]" 
                    : "bg-secondary mr-auto max-w-[80%]"
                }`}
              >
                <div className="font-medium text-sm mb-1">{msg.sender}</div>
                <div>{msg.text}</div>
              </motion.div>
            ))
          )}
        </div>
        <div className="flex space-x-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={handleKeyDown}
            placeholder="Type a message..." 
            className="flex space-x-2"
          />
          <Button onClick={sendMessage} className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat;