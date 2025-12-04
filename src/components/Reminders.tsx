import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Bell, Calendar, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

const upcomingReminders = [
  {
    id: 1,
    type: 'expiry',
    title: 'Points Expiring',
    description: '150 Chase points expire',
    card: 'Chase Sapphire Reserve',
    cardLogo: '🏦',
    date: 'Dec 31, 2025',
    daysUntil: 56,
    urgency: 'medium'
  },
  {
    id: 2,
    type: 'expiry',
    title: 'Cashback Expiring',
    description: '$25 Discover cashback expires',
    card: 'Discover it',
    cardLogo: '🔍',
    date: 'Nov 30, 2025',
    daysUntil: 24,
    urgency: 'high'
  },
  {
    id: 3,
    type: 'category',
    title: 'Activate Q1 Categories',
    description: 'New rotating categories available',
    card: 'Discover it',
    cardLogo: '🔍',
    date: 'Jan 1, 2026',
    daysUntil: 86,
    urgency: 'low'
  },
  {
    id: 4,
    type: 'offer',
    title: 'Uber Eats Offer Expiring',
    description: '10% cashback ends soon',
    card: 'Chase Sapphire Reserve',
    cardLogo: '🏦',
    date: 'Nov 21, 2025',
    daysUntil: 15,
    urgency: 'high'
  },
  {
    id: 5,
    type: 'category',
    title: 'Activate Gas Category',
    description: 'Remember to activate bonus',
    card: 'Citi Custom Cash',
    cardLogo: '🏛️',
    date: 'Dec 1, 2025',
    daysUntil: 25,
    urgency: 'medium'
  }
];

const notificationSettings = [
  { id: 'push', label: 'Push Notifications', description: 'Get alerts on your device' },
  { id: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
  { id: 'expiry', label: 'Expiration Alerts', description: 'Notify before points/cashback expire' },
  { id: 'offers', label: 'New Offers', description: 'Get notified about new deals' },
  { id: 'categories', label: 'Category Activation', description: 'Remind me to activate rotating categories' }
];

const urgencyColors = {
  high: 'border-red-300 bg-red-50',
  medium: 'border-yellow-300 bg-yellow-50',
  low: 'border-green-300 bg-green-50'
};

const typeIcons = {
  expiry: '⏰',
  category: '🔄',
  offer: '🎁'
};

export default function Reminders() {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState(upcomingReminders);
  const [settings, setSettings] = useState({
    push: true,
    email: true,
    expiry: true,
    offers: true,
    categories: true
  });

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast.success('Reminder deleted');
  };

  const handleSnooze = (id: number) => {
    toast.success('Reminder snoozed for 1 week');
  };

  const toggleSetting = (id: string) => {
    setSettings({ ...settings, [id]: !settings[id as keyof typeof settings] });
  };

  // Sort reminders by urgency and days until
  const sortedReminders = [...reminders].sort((a, b) => {
    const urgencyOrder = { high: 0, medium: 1, low: 2 };
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    }
    return a.daysUntil - b.daysUntil;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-white text-2xl">Smart Reminders</h1>
          <div className="w-10" />
        </div>

        <div className="text-center">
          <p className="text-white/90">
            {reminders.length} upcoming reminder{reminders.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Timeline View */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900 text-xl">Upcoming</h2>
          </div>

          <div className="space-y-4">
            {sortedReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`border-2 rounded-2xl p-4 ${urgencyColors[reminder.urgency]}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-2xl">{typeIcons[reminder.type]}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-gray-900">{reminder.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {reminder.daysUntil} days
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{reminder.cardLogo}</span>
                      <span>{reminder.card}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-300">
                  <p className="text-sm text-gray-600">{reminder.date}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSnooze(reminder.id)}
                    >
                      Snooze
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteReminder(reminder.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reminders.length === 0 && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-gray-600">All caught up!</p>
              <p className="text-sm text-gray-500">No upcoming reminders</p>
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900 text-xl">Notification Settings</h2>
          </div>

          <div className="space-y-4">
            {notificationSettings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-start justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex-1 mr-4">
                  <p className="text-gray-900 mb-1">{setting.label}</p>
                  <p className="text-sm text-gray-600">{setting.description}</p>
                </div>
                <Switch
                  checked={settings[setting.id as keyof typeof settings]}
                  onCheckedChange={() => toggleSetting(setting.id)}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-900">
              💡 Tip: Enable all notifications to never miss an important deadline or opportunity
            </p>
          </div>
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
