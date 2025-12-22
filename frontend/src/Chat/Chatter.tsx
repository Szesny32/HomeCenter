import { useState, useEffect, useRef } from "react";
import './Chatter.css';
import { Client, Frame, Message as StompMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface Message {
  id: number;
  sender: string;
  content: string;
}

export default function Chatter() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef<Client | null>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch historical messages from REST API
  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch("/api/messages");
      const data: Message[] = await res.json();
      setMessages(data);
    };
    fetchHistory();
  }, []);

  const WS_URL =
  import.meta.env.MODE === 'development' ? "http://localhost:8080/ws" : "/ws";

  // Initialize WebSocket / STOMP client with SockJS
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,
    });

    client.onConnect = (frame: Frame) => {
      console.log("Connected via WebSocket");

      // Subscribe to topic for real-time messages
      client.subscribe("/topic/messages", (msg: StompMessage) => {
        const body: Message = JSON.parse(msg.body);
        setMessages(prev => [...prev, body]);
      });
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  // Send message via WebSocket STOMP
  const sendMessage = () => {
    if (!input.trim()) return;

    clientRef.current?.publish({
      destination: "/app/chat", // musi zgadzać się z @MessageMapping("/chat")
      body: JSON.stringify({ sender: "User", content: input }),
    });

    setInput("");
  };

  return (
    <div className="chatter-container">
      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className="message">
              <span className="from">{msg.sender}:</span>{" "}
              <span>{msg.content}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
