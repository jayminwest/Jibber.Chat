import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

const ChatPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMountain, setSelectedMountain] = useState('');

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(50);

        if (error) throw error;

        setMessages(data.map(msg => ({
          text: msg.user_message,
          response: msg.ai_response,
          timestamp: new Date(msg.created_at),
          type: 'history'
        })));
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    loadChatHistory();
  }, [user.id]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      setLoading(true);
      const userMessage = inputMessage;
      setInputMessage('');

      setMessages(prev => [...prev, {
        text: userMessage,
        timestamp: new Date(),
        type: 'user'
      }]);

      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: userMessage,
          userId: user.id,
          mountain: selectedMountain
        }
      });

      if (error) throw error;

      setMessages(prev => [...prev, {
        text: data.response,
        timestamp: new Date(),
        type: 'ai'
      }]);

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        text: `Error: ${error.message || 'Failed to send message. Please try again.'}`,
        timestamp: new Date(),
        type: 'error'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 pt-16">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 h-fit">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Mountain</h2>
              <select
                value={selectedMountain}
                onChange={(e) => setSelectedMountain(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a mountain</option>
                <option value="vail">Vail</option>
                <option value="whistler">Whistler</option>
                <option value="park-city">Park City</option>
              </select>
            </div>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-3 h-full flex flex-col">
            <div className="flex-1 bg-white rounded-xl shadow-sm flex flex-col overflow-hidden">
              {/* Chat Messages - Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p>{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area - Fixed at bottom */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about conditions, trails, or recommendations..."
                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                    ) : (
                      'Send'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
