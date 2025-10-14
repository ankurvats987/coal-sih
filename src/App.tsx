import { useState } from 'react';
import Navigation from './components/Navigation';
import UserDashboard from './components/UserDashboard';
import ReviewerDashboard from './components/ReviewerDashboard';
import { mockProposals, mockEvaluations } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState<'user' | 'reviewer'>('user');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      <main>
        {currentView === 'user' ? (
          <UserDashboard proposals={mockProposals} />
        ) : (
          <ReviewerDashboard proposals={mockProposals} evaluations={mockEvaluations} />
        )}
      </main>
    </div>
  );
}

export default App;
