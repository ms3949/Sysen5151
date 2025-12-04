import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

const suggestionChips = [
  'Best card for groceries',
  "What's expiring soon?",
  'How much have I earned?',
  'Show me travel offers',
  'When should I activate categories?'
];

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  quickActions?: { label: string; action: string }[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I'm your RewardsHub AI assistant. I can help you maximize your credit card rewards, find the best offers, and answer questions about your cards. How can I help you today?",
    sender: 'assistant',
    timestamp: new Date()
  }
];

export default function AIAssistant() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('best card') || lowerMessage.includes('which card')) {
      if (lowerMessage.includes('grocery') || lowerMessage.includes('groceries')) {
        return {
          id: Date.now(),
          text: "For groceries, I recommend using your American Express Gold card. It offers 4x points on supermarket purchases (up to $25,000 per year, then 1x). This is one of the best rewards rates for grocery shopping!",
          sender: 'assistant',
          timestamp: new Date(),
          quickActions: [
            { label: 'View Amex Gold Details', action: '/card/amex-gold' },
            { label: 'See Grocery Offers', action: '/offers' }
          ]
        };
      } else if (lowerMessage.includes('travel')) {
        return {
          id: Date.now(),
          text: "For travel, your Chase Sapphire Reserve is the best choice! It offers 3x points on travel and dining, plus you get valuable travel protections and lounge access. You currently have 12,500 points.",
          sender: 'assistant',
          timestamp: new Date(),
          quickActions: [
            { label: 'View Chase Sapphire Details', action: '/card/chase-sapphire' },
            { label: 'See Travel Offers', action: '/offers' }
          ]
        };
      } else if (lowerMessage.includes('dining') || lowerMessage.includes('restaurant')) {
        return {
          id: Date.now(),
          text: "Both your Chase Sapphire Reserve and Amex Gold are excellent for dining! Chase offers 3x points while Amex offers 4x points. I'd recommend using the Amex Gold for maximum rewards.",
          sender: 'assistant',
          timestamp: new Date(),
          quickActions: [
            { label: 'Compare Cards', action: '/analytics' }
          ]
        };
      }
    }

    if (lowerMessage.includes('expir')) {
      return {
        id: Date.now(),
        text: "You have a few things expiring soon:\n\n• 150 Chase points expiring on Dec 31, 2025\n• $25 Discover cashback expiring on Nov 30, 2025\n• Uber Eats 10% offer expiring in 15 days\n\nWould you like me to set reminders for these?",
        sender: 'assistant',
        timestamp: new Date(),
        quickActions: [
          { label: 'View All Reminders', action: '/reminders' },
          { label: 'Set Reminder', action: '/reminders' }
        ]
      };
    }

    if (lowerMessage.includes('earn') || lowerMessage.includes('saved') || lowerMessage.includes('total')) {
      return {
        id: Date.now(),
        text: "Great question! Here's your rewards summary:\n\n💰 Total rewards value: $1,247\n📈 This month's earnings: $156\n🎯 Average reward rate: 3.5%\n\nYou're doing amazing! Keep using the right cards for each purchase to maximize your rewards.",
        sender: 'assistant',
        timestamp: new Date(),
        quickActions: [
          { label: 'View Detailed Analytics', action: '/analytics' }
        ]
      };
    }

    if (lowerMessage.includes('offer') || lowerMessage.includes('deal')) {
      return {
        id: Date.now(),
        text: "You have 12 active offers available! Here are some highlights:\n\n🍔 Uber Eats: 10% cashback\n🏨 Hotels.com: $50 off\n🛒 Whole Foods: 5x points\n🛍️ Amazon: 5% cashback\n\nCheck out the offers page to see all available deals!",
        sender: 'assistant',
        timestamp: new Date(),
        quickActions: [
          { label: 'View All Offers', action: '/offers' }
        ]
      };
    }

    if (lowerMessage.includes('activate') || lowerMessage.includes('category') || lowerMessage.includes('categories')) {
      return {
        id: Date.now(),
        text: "Good reminder! You have rotating categories that need activation:\n\n🔄 Discover it Q4: Amazon (5% cashback) - Already active ✓\n🔄 Citi Custom Cash: Gas stations (3% cashback) - Activate by Dec 1\n\nI'll set a reminder for you to activate the Gas category!",
        sender: 'assistant',
        timestamp: new Date(),
        quickActions: [
          { label: 'Manage Categories', action: '/reminders' }
        ]
      };
    }

    // Default response
    return {
      id: Date.now(),
      text: "I can help you with:\n\n• Finding the best card for different purchases\n• Tracking expiring rewards and offers\n• Viewing your rewards earnings\n• Managing rotating categories\n• Discovering new offers\n\nWhat would you like to know?",
      sender: 'assistant',
      timestamp: new Date()
    };
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = getAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSend();
  };

  const handleQuickAction = (action: string) => {
    navigate(action);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-b-[2rem] p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-white text-2xl">AI Assistant</h1>
          </div>
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <p className="text-white/90 text-center text-sm">
          Powered by intelligent rewards analysis
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        {messages.length === 1 && (
          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-3 text-center">Try asking:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestionChips.map((chip, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(chip)}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all shadow-sm border border-gray-200"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                    : 'bg-white text-gray-900 shadow-md'
                }`}
              >
                {message.sender === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-600 text-xs">AI Assistant</span>
                  </div>
                )}
                <p className="whitespace-pre-line">{message.text}</p>
                
                {message.quickActions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.action)}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-all"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your rewards..."
              className="flex-1 h-12"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="h-12 w-12 bg-gradient-to-br from-purple-600 to-indigo-600"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
