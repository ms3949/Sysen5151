import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, TrendingUp, Download } from 'lucide-react';
import { Badge } from './ui/badge';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const categorySpendData = [
  { category: 'Dining', spend: 850, rewards: 102, rewardRate: 4.0 },
  { category: 'Groceries', spend: 620, rewards: 74.4, rewardRate: 4.0 },
  { category: 'Travel', spend: 1200, rewards: 120, rewardRate: 3.0 },
  { category: 'Gas', spend: 180, rewards: 5.4, rewardRate: 3.0 },
  { category: 'Shopping', spend: 450, rewards: 22.5, rewardRate: 5.0 },
  { category: 'Other', spend: 320, rewards: 3.2, rewardRate: 1.0 }
];

const monthlyEarningsData = [
  { month: 'Jul', earned: 245, redeemed: 0 },
  { month: 'Aug', earned: 289, redeemed: 150 },
  { month: 'Sep', earned: 312, redeemed: 0 },
  { month: 'Oct', earned: 267, redeemed: 200 },
  { month: 'Nov', earned: 328, redeemed: 0 }
];

const rewardStatusData = [
  { name: 'Active Points', value: 58390, color: '#10b981' },
  { name: 'Redeemed', value: 35000, color: '#3b82f6' },
  { name: 'Expired', value: 2500, color: '#ef4444' }
];

const COLORS = ['#10b981', '#3b82f6', '#ef4444'];

export default function Analytics() {
  const navigate = useNavigate();

  const totalSpend = categorySpendData.reduce((sum, item) => sum + item.spend, 0);
  const totalRewards = categorySpendData.reduce((sum, item) => sum + item.rewards, 0);
  const avgRewardRate = (totalRewards / totalSpend) * 100;

  const handleExport = () => {
    // Mock export functionality
    const csvContent = 'Category,Spend,Rewards,Rate\n' +
      categorySpendData.map(d => `${d.category},$${d.spend},$${d.rewards},${d.rewardRate}%`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rewards-analytics.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-b-[2rem] p-6 pb-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-white text-2xl">Insights & Analytics</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleExport}
          >
            <Download className="w-5 h-5" />
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-white/80 text-sm mb-1">Total Spend</p>
            <p className="text-white text-xl">${totalSpend}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-white/80 text-sm mb-1">Total Rewards</p>
            <p className="text-white text-xl">${totalRewards.toFixed(0)}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-white/80 text-sm mb-1">Avg Rate</p>
            <p className="text-white text-xl">{avgRewardRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Key Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-cyan-600" />
            <h2 className="text-gray-900 text-xl">Key Insights</h2>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎉</div>
                <div>
                  <p className="text-green-900 mb-1">You've saved $327 this year!</p>
                  <p className="text-sm text-green-700">
                    That's 23% more than last year. Keep it up!
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <p className="text-blue-900 mb-1">Optimize your dining rewards</p>
                  <p className="text-sm text-blue-700">
                    Switch to Amex Gold for dining to earn 4x points instead of 3x
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚠️</div>
                <div>
                  <p className="text-yellow-900 mb-1">$175 in rewards expiring soon</p>
                  <p className="text-sm text-yellow-700">
                    Consider redeeming or using these cards more
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Spending Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-gray-900 text-xl mb-4">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categorySpendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                formatter={(value: number) => `$${value}`}
              />
              <Legend />
              <Bar dataKey="spend" fill="#3b82f6" name="Spend ($)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="rewards" fill="#10b981" name="Rewards ($)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Details Table */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-gray-900 text-xl mb-4">Reward Rate by Category</h2>
          <div className="space-y-3">
            {categorySpendData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <div className="flex-1">
                  <p className="text-gray-900">{item.category}</p>
                  <p className="text-sm text-gray-600">${item.spend} spent</p>
                </div>
                <div className="text-right">
                  <Badge variant={item.rewardRate >= 4 ? 'default' : 'secondary'}>
                    {item.rewardRate}x
                  </Badge>
                  <p className="text-sm text-green-600 mt-1">${item.rewards.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Earnings Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-gray-900 text-xl mb-4">Monthly Earnings Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyEarningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                formatter={(value: number) => `$${value}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="earned" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Earned ($)"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="redeemed" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Redeemed ($)"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Reward Status Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-gray-900 text-xl mb-4">Reward Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={rewardStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {rewardStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {rewardStatusData.map((item, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-4 h-4 rounded-full mx-auto mb-1" 
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-sm text-gray-600">{item.name}</p>
                <p className="text-gray-900">${item.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Export Section */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200 mb-6">
          <h2 className="text-gray-900 text-xl mb-2">Export Your Data</h2>
          <p className="text-gray-600 mb-4">Download your complete rewards history and analytics</p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
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
            className="flex flex-col items-center text-cyan-600"
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
