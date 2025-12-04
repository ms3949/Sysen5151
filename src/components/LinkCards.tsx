import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CreditCard, Check, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface LinkCardsProps {
  setHasCompletedOnboarding: (value: boolean) => void;
}

const cardBrands = [
  { name: 'Chase', logo: '🏦', color: 'from-blue-700 to-blue-900' },
  { name: 'American Express', logo: '💳', color: 'from-blue-400 to-blue-600' },
  { name: 'Citi', logo: '🏛️', color: 'from-red-500 to-red-700' },
  { name: 'Capital One', logo: '💰', color: 'from-red-600 to-orange-600' },
  { name: 'Discover', logo: '🔍', color: 'from-orange-500 to-orange-700' },
  { name: 'Bank of America', logo: '🏦', color: 'from-red-700 to-blue-900' },
];

export default function LinkCards({ setHasCompletedOnboarding }: LinkCardsProps) {
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const toggleCard = (cardName: string) => {
    setSelectedCards(prev =>
      prev.includes(cardName)
        ? prev.filter(c => c !== cardName)
        : [...prev, cardName]
    );
  };

  const handleContinue = () => {
    if (selectedCards.length === 0) {
      toast.error('Please select at least one card to continue');
      return;
    }

    setIsConnecting(true);
    // Mock connection process
    setTimeout(() => {
      setHasCompletedOnboarding(true);
      toast.success(`Successfully connected ${selectedCards.length} card${selectedCards.length > 1 ? 's' : ''}!`);
      navigate('/dashboard');
    }, 2000);
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-blue-600 to-purple-700">
      <Button
        variant="ghost"
        className="self-start text-white mb-4"
        onClick={() => navigate('/login')}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </Button>

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl mb-2">Link Your Cards</h1>
            <p className="text-blue-100">
              Select your credit card issuers to start tracking rewards
            </p>
            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-2 h-2 rounded-full bg-white/50" />
              <div className="w-2 h-2 rounded-full bg-white/50" />
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            {/* Security Notice */}
            <div className="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <p className="text-sm text-blue-900">
                🔒 We use bank-level encryption and never store your credentials. 
                Connections are powered by secure OAuth protocols.
              </p>
            </div>

            {/* Card Selection Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {cardBrands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => toggleCard(brand.name)}
                  className={`relative p-6 rounded-2xl border-2 transition-all ${
                    selectedCards.includes(brand.name)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {selectedCards.includes(brand.name) && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${brand.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {brand.logo}
                  </div>
                  <p className="text-sm text-gray-900 text-center">{brand.name}</p>
                </button>
              ))}
            </div>

            {/* Manual Entry Option */}
            <div className="mb-6">
              <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl hover:border-gray-400 transition-all">
                <CreditCard className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Enter card details manually</p>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleContinue}
                disabled={isConnecting}
                className="w-full h-12"
              >
                {isConnecting ? 'Connecting...' : `Continue with ${selectedCards.length || 0} card${selectedCards.length !== 1 ? 's' : ''}`}
              </Button>
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="w-full h-12"
                disabled={isConnecting}
              >
                Skip for now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
