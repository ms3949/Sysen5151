import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Calendar, Filter } from 'lucide-react';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

const offers = [
  {
    id: 1,
    merchant: 'Uber Eats',
    reward: '10% cashback',
    card: 'Chase Sapphire Reserve',
    cardLogo: '🏦',
    category: 'Dining',
    expiry: '15 days',
    expiryUrgency: 'high',
    description: 'Get 10% cashback on all orders',
    terms: 'Valid on orders over $15'
  },
  {
    id: 2,
    merchant: 'Hotels.com',
    reward: '$50 off',
    card: 'Chase Sapphire Reserve',
    cardLogo: '🏦',
    category: 'Travel',
    expiry: '45 days',
    expiryUrgency: 'low',
    description: 'Book your next stay and save',
    terms: 'Minimum booking of $200'
  },
  {
    id: 3,
    merchant: 'Grubhub',
    reward: '$10 off',
    card: 'American Express Gold',
    cardLogo: '💳',
    category: 'Dining',
    expiry: '8 days',
    expiryUrgency: 'high',
    description: 'Order delivery and save',
    terms: 'Valid on orders over $30'
  },
  {
    id: 4,
    merchant: 'Whole Foods',
    reward: '5x points',
    card: 'American Express Gold',
    cardLogo: '💳',
    category: 'Groceries',
    expiry: '22 days',
    expiryUrgency: 'medium',
    description: 'Earn bonus points on groceries',
    terms: 'In-store and online purchases'
  },
  {
    id: 5,
    merchant: 'Amazon',
    reward: '5% cashback',
    card: 'Discover it',
    cardLogo: '🔍',
    category: 'Online Shopping',
    expiry: '60 days',
    expiryUrgency: 'low',
    description: 'Q4 rotating category bonus',
    terms: 'Activate category bonus'
  },
  {
    id: 6,
    merchant: 'Gas Stations',
    reward: '3% cashback',
    card: 'Citi Custom Cash',
    cardLogo: '🏛️',
    category: 'Gas',
    expiry: '90 days',
    expiryUrgency: 'low',
    description: 'Top spending category this month',
    terms: 'Up to $500/month'
  }
];

const categories = ['All Offers', 'Expiring Soon', 'New', 'Dining', 'Travel', 'Groceries', 'Online Shopping', 'Gas'];

const urgencyColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500'
};

export default function Offers() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Offers');
  const [savedOffers, setSavedOffers] = useState<number[]>([]);

  const handleSaveOffer = (offerId: number) => {
    if (savedOffers.includes(offerId)) {
      setSavedOffers(savedOffers.filter(id => id !== offerId));
      toast.success('Offer removed from saved');
    } else {
      setSavedOffers([...savedOffers, offerId]);
      toast.success('Offer saved!');
    }
  };

  const handleAddReminder = (merchant: string) => {
    toast.success(`Reminder set for ${merchant} offer`);
  };

  const filteredOffers = offers.filter(offer => {
    if (selectedCategory === 'All Offers') return true;
    if (selectedCategory === 'Expiring Soon') return offer.expiryUrgency === 'high';
    if (selectedCategory === 'New') return offer.id <= 3;
    return offer.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-white text-2xl">Offers & Deals</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-white/90 text-center">
          {filteredOffers.length} active offer{filteredOffers.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="px-6 -mt-4">
        {/* Category Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Offers Grid */}
        <div className="space-y-4">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              {/* Offer Header */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-xl mb-1">{offer.merchant}</h3>
                    <p className="text-purple-600">{offer.reward}</p>
                  </div>
                  <div className="text-3xl">{offer.cardLogo}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{offer.category}</Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <div className={`w-2 h-2 rounded-full ${urgencyColors[offer.expiryUrgency]}`} />
                    Expires in {offer.expiry}
                  </div>
                </div>
              </div>

              {/* Offer Body */}
              <div className="p-4">
                <p className="text-gray-900 mb-2">{offer.description}</p>
                <p className="text-sm text-gray-600 mb-4">{offer.terms}</p>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    {offer.cardLogo} {offer.card}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => toast.success(`Opening ${offer.merchant}...`)}
                  >
                    Use Offer
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAddReminder(offer.merchant)}
                  >
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSaveOffer(offer.id)}
                    className={savedOffers.includes(offer.id) ? 'bg-pink-50 border-pink-300' : ''}
                  >
                    {savedOffers.includes(offer.id) ? '❤️' : '🤍'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl mb-2">No offers found</p>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
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
            className="flex flex-col items-center text-purple-600"
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
