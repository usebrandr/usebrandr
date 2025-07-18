import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

interface ChatbotCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (answers: Record<string, string>) => void;
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  loading?: boolean;
  attachments?: File[];
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const ChatbotCampaignModal: React.FC<ChatbotCampaignModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  messages,
  inputValue,
  onInputChange,
  onSend,
  loading,
  attachments = [],
  onFileChange,
  inputRef
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, loading]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-0">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Campaign with AI</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-6 h-6 text-gray-500 dark:text-gray-300" />
          </button>
        </div>
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50 dark:bg-gray-900">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[75%] px-6 py-4 rounded-2xl shadow-md text-lg ${msg.sender === 'bot' ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white' : 'bg-blue-600 text-white'}`}>{msg.text}</div>
            </div>
          ))}
          {attachments.length > 0 && (
            <div className="mt-4">
              <div className="text-gray-500 text-sm mb-2">Attached Content</div>
              <ul className="space-y-2">
                {attachments.map((file, i) => (
                  <li key={i} className="text-blue-600 underline cursor-pointer" onClick={() => window.open(URL.createObjectURL(file), '_blank')}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
          <form className="flex gap-4" onSubmit={e => { e.preventDefault(); onSend(); }}>
            <input
              type="text"
              value={inputValue}
              onChange={e => onInputChange(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder={loading ? 'Thinking...' : 'Type your answer...'}
              disabled={loading}
              autoFocus
              ref={inputRef}
            />
            <label className="flex items-center cursor-pointer">
              <span className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-200 font-semibold text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 mr-2">Attach</span>
              <input type="file" multiple className="hidden" onChange={onFileChange} disabled={loading} />
            </label>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-60"
              disabled={loading || !inputValue.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotCampaignModal; 