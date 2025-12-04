import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { CreditCard, Bell, TrendingUp, Sparkles } from 'lucide-react';
import { useState } from 'react';

const benefits = [
  {
    icon: CreditCard,
    title: 'Track All Rewards',
    description: 'See all your credit card rewards in one place. Never lose track of points or cashback again.'
  },
  {
    icon: Bell,
    title: 'Never Miss Offers',
    description: 'Get timely alerts for rotating categories, expiring offers, and activation deadlines.'
  },
  {
    icon: TrendingUp,
    title: 'Maximize Rewards',
    description: 'Smart recommendations on which card to use for every purchase to earn the most.'
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    description: 'Get personalized advice and discover opportunities to boost your rewards earnings.'
  }
];

export default function Welcome() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-lg mb-4">
            <CreditCard className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-white text-4xl mb-2">RewardsHub</h1>
          <p className="text-blue-100">Your smart credit card companion</p>
        </div>

        {/* Carousel */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="text-center mb-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className={`transition-all duration-300 ${
                    currentSlide === index ? 'block' : 'hidden'
                  }`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-gray-900 text-2xl mb-3">{benefit.title}</h2>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full h-12 bg-white text-blue-600 hover:bg-gray-50"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
          <Button
            variant="ghost"
            className="w-full h-12 text-white hover:bg-white/10"
            onClick={() => navigate('/dashboard')}
          >
            Skip for now
          </Button>
        </div>

        {/* Legal */}
        <p className="text-center text-blue-100 text-sm mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
