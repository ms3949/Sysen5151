import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Welcome from './components/Welcome';
import Login from './components/Login';
import LinkCards from './components/LinkCards';
import Dashboard from './components/Dashboard';
import CardDetails from './components/CardDetails';
import Offers from './components/Offers';
import Reminders from './components/Reminders';
import AIAssistant from './components/AIAssistant';
import Profile from './components/Profile';
import Analytics from './components/Analytics';
import { Toaster } from './components/ui/sonner';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Routes>
          {/* Onboarding Flow */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/link-cards" element={<LinkCards setHasCompletedOnboarding={setHasCompletedOnboarding} />} />
          
          {/* Main App */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/card/:cardId" element={<CardDetails />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analytics" element={<Analytics />} />
          
          {/* Catch-all routes */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;