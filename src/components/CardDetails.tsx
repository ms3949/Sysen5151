import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Bell, ExternalLink, Calendar, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

const cardData: Record<string, any> = {
  'chase-sapphire': {
    name: 'Chase Sapphire Reserve',
    issuer: 'Chase',
    logo: '🏦',
    color: 'from-blue-700 to-blue-900',
    points: 12500,
    pointsExpiring: 150,
    expiryDate: 'Dec 31, 2025',
    categories: ['Dining', 'Travel', 'Hotels'],
    offers: [
      { id: 1, merchant: 'Uber Eats', reward: '10% back', expiry: '15 days', category: 'Dining' },
      { id: 2, merchant: 'Hotels.com', reward: '$50 off', expiry: '45 days', category: 'Travel' }
    ],
    recentActivity: [
      { date: '2 days ago', merchant: 'Starbucks', amount: 8.50, points: 26 },
      { date: '5 days ago', merchant: 'United Airlines', amount: 450, points: 1350 },
      { date: '1 week ago', merchant: 'Hilton', amount: 280, points: 840 }
    ],
    stats: {
      monthlySpend: 1850,
      pointsEarned: 5550,
      avgRewardRate: 3.0
    }
  },
  'amex-gold': {
    name: 'American Express Gold',
    issuer: 'Amex',
    logo: '💳',
    color: 'from-yellow-500 to-yellow-700',
    points: 45890,
    pointsExpiring: 0,
    expiryDate: null,
    categories: ['Dining', 'Groceries', 'Supermarkets'],
    offers: [
      { id: 1, merchant: 'Grubhub', reward: '$10 off', expiry: '8 days', category: 'Dining' },
      { id: 2, merchant: 'Whole Foods', reward: '5x points', expiry: '22 days', category: 'Groceries' }
    ],
    recentActivity: [
      { date: '1 day ago', merchant: 'Trader Joes', amount: 85.20, points: 341 },
      { date: '3 days ago', merchant: 'The Cheesecake Factory', amount: 120, points: 480 },
      { date: '6 days ago', merchant: 'Safeway', amount: 62.40, points: 250 }
    ],
    stats: {
      monthlySpend: 2240,
      pointsEarned: 8960,
      avgRewardRate: 4.0
    }
  }
};

export default function CardDetails() {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const card = cardData[cardId || ''] || cardData['chase-sapphire'];

  const handleAddReminder = (offerId: number) => {
    toast.success('Reminder added!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      {/* Header */}
      <div className={`bg-gradient-to-br ${card.color} rounded-b-[2rem] p-6 pb-12 shadow-lg`}>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 mb-6"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <p className="text-white/80 mb-1">{card.issuer}</p>
            <h1 className="text-white text-3xl mb-4">{card.name}</h1>
            
            {card.points !== undefined && (
              <div>
                <p className="text-white/80 text-sm mb-1">Available Points</p>
                <p className="text-white text-4xl">{card.points.toLocaleString()}</p>
              </div>
            )}
          </div>
          <div className="text-5xl">{card.logo}</div>
        </div>

        {/* Expiry Warning */}
        {card.pointsExpiring > 0 && (
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">⚠️ {card.pointsExpiring} points expiring</p>
                <p className="text-white/80 text-sm">{card.expiryDate}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => toast.success('Reminder set!')}
              >
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 -mt-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <p className="text-gray-600 text-xs mb-1">This Month</p>
            <p className="text-gray-900 text-xl">${card.stats.monthlySpend}</p>
            <p className="text-gray-500 text-xs">Spend</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <p className="text-gray-600 text-xs mb-1">Earned</p>
            <p className="text-gray-900 text-xl">{card.stats.pointsEarned}</p>
            <p className="text-gray-500 text-xs">Points</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <p className="text-gray-600 text-xs mb-1">Avg Rate</p>
            <p className="text-gray-900 text-xl">{card.stats.avgRewardRate}x</p>
            <p className="text-gray-500 text-xs">Rewards</p>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-gray-900 text-xl mb-4">Bonus Categories</h2>
          <div className="flex flex-wrap gap-2">
            {card.categories.map((category: string) => (
              <Badge key={category} variant="secondary" className="px-4 py-2">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Active Offers */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-900 text-xl">Active Offers</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigate('/offers')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {card.offers.map((offer: any) => (
              <div key={offer.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-gray-900">{offer.merchant}</h3>
                    <p className="text-green-600">{offer.reward}</p>
                  </div>
                  <Badge variant="outline">{offer.category}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Expires in {offer.expiry}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAddReminder(offer.id)}
                  >
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-gray-900 text-xl mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {card.recentActivity.map((activity: any, index: number) => (
              <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div>
                  <p className="text-gray-900">{activity.merchant}</p>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">${activity.amount.toFixed(2)}</p>
                  <p className="text-sm text-green-600">+{activity.points} pts</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={() => window.open('https://chase.com', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on {card.issuer} Website
          </Button>
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={() => navigate('/analytics')}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            View Detailed Analytics
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around max-w-lg mx-auto">
          <button
            className="flex flex-col items-center text-gray-500"
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
