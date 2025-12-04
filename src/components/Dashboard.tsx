import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Bell, Plus, MessageSquare, TrendingUp, Menu } from 'lucide-react';
import { useState } from 'react';

const mockCards = [
  {
    id: 'chase-sapphire',
    name: 'Chase Sapphire Reserve',
    issuer: 'Chase',
    logo: '🏦',
    color: 'from-blue-700 to-blue-900',
    points: 12500,
    pointsExpiring: 150,
    expiryDate: 'Dec 31, 2025',
    urgency: 'medium',
    recommendation: 'Best for dining & travel'
  },
  {
    id: 'amex-gold',
    name: 'American Express Gold',
    issuer: 'Amex',
    logo: '💳',
    color: 'from-yellow-500 to-yellow-700',
    points: 45890,
    pointsExpiring: 0,
    expiryDate: null,
    urgency: 'low',
    recommendation: 'Best for groceries & dining'
  },
  {
    id: 'discover-it',
    name: 'Discover it',
    issuer: 'Discover',
    logo: '🔍',
    color: 'from-orange-500 to-orange-700',
    cashback: 127.50,
    cashbackExpiring: 25,
    expiryDate: 'Nov 30, 2025',
    urgency: 'high',
    recommendation: '5% category: Amazon this quarter'
  },
  {
    id: 'citi-custom',
    name: 'Citi Custom Cash',
    issuer: 'Citi',
    logo: '🏛️',
    color: 'from-red-500 to-red-700',
    cashback: 234.80,
    pointsExpiring: 0,
    expiryDate: null,
    urgency: 'low',
    recommendation: 'Activate Q4 categories'
  }
];

const urgencyColors = {
  high: 'bg-red-100 text-red-700 border-red-300',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  low: 'bg-green-100 text-green-700 border-green-300'
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const bestCardNow = mockCards[1]; // Amex Gold for demonstration

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-blue-100 mb-1">Good morning,</p>
            <h1 className="text-white text-3xl">Sarah</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => navigate('/reminders')}
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-blue-100 text-sm mb-1">Total Rewards</p>
            <p className="text-white text-2xl">$1,247</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-blue-100 text-sm mb-1">Expiring Soon</p>
            <p className="text-white text-2xl">$175</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Best Card Recommendation */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border border-green-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-green-600 text-sm mb-1">💡 Best Card to Use Now</p>
              <h3 className="text-gray-900 text-xl">{bestCardNow.name}</h3>
            </div>
            <div className={`text-2xl w-12 h-12 flex items-center justify-center bg-gradient-to-br ${bestCardNow.color} rounded-xl`}>
              {bestCardNow.logo}
            </div>
          </div>
          <p className="text-gray-600 mb-4">{bestCardNow.recommendation}</p>
          <Button
            size="sm"
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => navigate(`/card/${bestCardNow.id}`)}
          >
            View Details
          </Button>
        </div>

        {/* Cards Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-900 text-xl">Your Cards</h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate('/link-cards')}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Card
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          {mockCards.map((card) => (
            <div
              key={card.id}
              onClick={() => navigate(`/card/${card.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-br ${card.color} p-4 text-white`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="text-white/80 text-sm mb-1">{card.issuer}</p>
                    <h3 className="text-xl">{card.name}</h3>
                  </div>
                  <div className="text-3xl">{card.logo}</div>
                </div>
                <div className="flex gap-4">
                  {card.points !== undefined && (
                    <div>
                      <p className="text-white/80 text-sm">Points</p>
                      <p className="text-2xl">{card.points.toLocaleString()}</p>
                    </div>
                  )}
                  {card.cashback !== undefined && (
                    <div>
                      <p className="text-white/80 text-sm">Cash Back</p>
                      <p className="text-2xl">${card.cashback.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                {(card.pointsExpiring > 0 || card.cashbackExpiring > 0) && (
                  <div className={`flex items-center justify-between p-3 rounded-xl border mb-3 ${urgencyColors[card.urgency]}`}>
                    <div>
                      <p className="text-sm">
                        {card.pointsExpiring ? `${card.pointsExpiring} points` : `$${card.cashbackExpiring}`} expiring
                      </p>
                      <p className="text-xs opacity-80">{card.expiryDate}</p>
                    </div>
                    <Bell className="w-4 h-4" />
                  </div>
                )}
                <p className="text-sm text-gray-600">{card.recommendation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate('/offers')}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-gray-900 mb-1">Offers</h3>
            <p className="text-sm text-gray-600">12 active deals</p>
          </button>
          <button
            onClick={() => navigate('/analytics')}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-gray-900 mb-1">Insights</h3>
            <p className="text-sm text-gray-600">View analytics</p>
          </button>
        </div>
      </div>

      {/* Floating AI Assistant Button */}
      <button
        onClick={() => navigate('/assistant')}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around max-w-lg mx-auto">
          <button
            className="flex flex-col items-center text-blue-600"
            onClick={() => navigate('/dashboard')}
          >
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">Home</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-500"
            onClick={() => navigate('/offers')}
          >
            <div className="w-6 h-6 mb-1">🎁</div>
            <span className="text-xs">Offers</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-500"
            onClick={() => navigate('/analytics')}
          >
            <div className="w-6 h-6 mb-1">📊</div>
            <span className="text-xs">Insights</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-500"
            onClick={() => navigate('/profile')}
          >
            <div className="w-6 h-6 mb-1">👤</div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
