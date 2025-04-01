import { useState, useEffect } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { WebSocketClient, type EventMessage } from '@/shared/lib/websocket';

let wsInstance: WebSocketClient | null = null;

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<EventMessage[]>([]);
  const [topic, setTopic] = useState('general');

  useEffect(() => {
    if (!wsInstance) {
      console.log('new ws instance...');
      wsInstance = new WebSocketClient();

      wsInstance.onMessage((event) => {
        console.log('event = ', event);
        setMessages((prev) => [...prev, event]);
      });
    }

    return () => {
      console.log('Component unmounted, but wsInstance persists...');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && username.trim()) {
      wsInstance!.send({ action: 'send', topic, message, user: username });
      setMessage('');
    }
  };

  const subscribeToTopic = () => {
    wsInstance!.send({ action: 'subscribe', topic });
  };

  const unsubscribeFromTopic = () => {
    wsInstance!.send({ action: 'unsubscribe', topic });
  };

  return (
    <div className="fixed right-4 bottom-4">
      <Button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white shadow-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </Button>
      {isOpen && (
        <div className="fixed right-4 bottom-16 mb-2 w-80 rounded-lg border border-gray-300 bg-white p-4 shadow-xl">
          {/* <Button
            className="absolute top-2 right-2"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </Button> */}
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mb-2"
          />
          <div className="mb-4 flex gap-2">
            <Button onClick={subscribeToTopic}>Subscribe</Button>
            <Button onClick={unsubscribeFromTopic} variant="outline">
              Unsubscribe
            </Button>
          </div>
          <Card className="mb-2 h-64 overflow-y-auto">
            <CardContent>
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <strong>{msg.user}:</strong> {msg.message}
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Input
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      )}
    </div>
  );
}
