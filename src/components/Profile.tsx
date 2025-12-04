import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  HelpCircle, 
  FileText,
  Moon,
  LogOut,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export default function Profile() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const connectedCards = [
    { name: 'Chase Sapphire Reserve', issuer: 'Chase', logo: '🏦', status: 'Connected' },
    { name: 'American Express Gold', issuer: 'Amex', logo: '💳', status: 'Connected' },
    { name: 'Discover it', issuer: 'Discover', logo: '🔍', status: 'Connected' },
    { name: 'Citi Custom Cash', issuer: 'Citi', logo: '🏛️', status: 'Connected' }
  ];

  const handleDisconnectCard = (cardName: string) => {
    toast.success(`${cardName} disconnected`);
  };

  const handleDeleteAccount = () => {
    toast.success('Account deletion request submitted. You will receive a confirmation email.');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-b-[2rem] p-6 pb-16 shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 mb-6"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Profile Info */}
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-white text-2xl mb-1">Sarah Johnson</h1>
          <p className="text-indigo-100">sarah.johnson@email.com</p>
        </div>
      </div>

      <div className="px-6 -mt-8">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
          <h2 className="text-gray-900 text-xl mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue="Sarah Johnson"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="sarah.johnson@email.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="mt-1"
              />
            </div>
            <Button className="w-full">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Connected Cards */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <h2 className="text-gray-900 text-xl">Connected Cards</h2>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/link-cards')}
            >
              Add Card
            </Button>
          </div>
          <div className="space-y-3">
            {connectedCards.map((card, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{card.logo}</div>
                  <div>
                    <p className="text-gray-900">{card.name}</p>
                    <p className="text-sm text-green-600">{card.status}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDisconnectCard(card.name)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Disconnect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900 text-xl">Notification Preferences</h2>
          </div>
          <button
            onClick={() => navigate('/reminders')}
            className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
          >
            <span className="text-gray-900">Manage notification settings</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
          <h2 className="text-gray-900 text-xl mb-4">Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Enable dark theme</p>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </div>

        {/* Support & Legal */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
          <h2 className="text-gray-900 text-xl mb-4">Support & Legal</h2>
          <div className="space-y-2">
            <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Help Center</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Privacy Policy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Terms of Service</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-blue-900 mb-1">Your data is secure</p>
              <p className="text-sm text-blue-700">
                We use bank-level encryption to protect your information. We never store your credit card credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-3 mb-6">
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={() => navigate('/welcome')}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          
          {!showDeleteConfirm ? (
            <Button
              variant="outline"
              className="w-full h-12 text-red-600 border-red-300 hover:bg-red-50"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          ) : (
            <div className="border-2 border-red-300 rounded-2xl p-4 bg-red-50">
              <p className="text-red-900 mb-3">
                Are you sure? This will permanently delete your account and all data. This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteAccount}
                >
                  Yes, Delete
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* App Info */}
        <div className="text-center pb-6">
          <p className="text-gray-600 text-sm mb-1">RewardsHub v1.0.0</p>
          <p className="text-gray-500 text-xs">Made with ❤️ for reward maximizers</p>
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
            className="flex flex-col items-center text-indigo-600"
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
