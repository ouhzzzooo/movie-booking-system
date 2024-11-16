import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { useDeveloperStore } from '../store/developerStore';

const Chat: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { admin, fetchChats: fetchAdminChats, messages: adminMessages, sendMessage: sendAdminMessage } = useAdminStore();
  const { developer, fetchChats: fetchDeveloperChats, messages: developerMessages, sendMessage: sendDeveloperMessage } = useDeveloperStore();

  const isAdmin = !!admin;
  const isDeveloper = !!developer;

  const messages = isAdmin ? adminMessages : isDeveloper ? developerMessages : [];

  useEffect(() => {
    const fetchChats = async () => {
      if (isAdmin) {
        await fetchAdminChats();
      } else if (isDeveloper) {
        await fetchDeveloperChats();
      }
    };

    fetchChats();
    const interval = setInterval(fetchChats, 5000);
    return () => clearInterval(interval);
  }, [isAdmin, isDeveloper, fetchAdminChats, fetchDeveloperChats]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      if (isAdmin) {
        await sendAdminMessage(newMessage);
        setNewMessage('');
      } else if (isDeveloper) {
        await sendDeveloperMessage(newMessage);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Chat</h1>

      <div className="bg-white rounded-lg shadow-md h-[calc(100vh-12rem)]">
        <div className="flex flex-col h-full">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.chatId}
                  className={`flex ${
                    (isAdmin && message.admin?.adminId === admin?.adminId) ||
                    (isDeveloper && message.developer?.developerId === developer?.developerId)
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      (isAdmin && message.admin?.adminId === admin?.adminId) ||
                      (isDeveloper && message.developer?.developerId === developer?.developerId)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">
                        {message.admin ? 'Admin' : 'Developer'}
                      </span>
                      <span className="text-xs opacity-75">
                        {new Date(message.dateTime).toLocaleTimeString()}
                      </span>
                    </div>
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;