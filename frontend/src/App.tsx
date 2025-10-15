import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import UserDashboard from "./components/UserDashboard";
import ReviewerDashboard from "./components/ReviewerDashboard";
import Auth from "./components/Auth";
import { mockProposals, mockEvaluations } from "./data/mockData";
import { Proposal } from "./types";

// Load proposals from localStorage or use mockProposals as default
const loadProposals = (): Proposal[] => {
  const stored = localStorage.getItem("prism-proposals");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return mockProposals;
    }
  }
  return mockProposals;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"user" | "reviewer" | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>(loadProposals());

  // Save proposals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("prism-proposals", JSON.stringify(proposals));
  }, [proposals]);

  const handleLogin = (type: "user" | "reviewer") => {
    setUserType(type);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType(null);
  };

  const handleAddProposal = (newProposal: Proposal) => {
    setProposals([newProposal, ...proposals]);
  };

  const handleUpdateProposalStatus = (
    proposalId: string,
    newStatus: Proposal["status"]
  ) => {
    setProposals(
      proposals.map((p) =>
        p.id === proposalId ? { ...p, status: newStatus } : p
      )
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {loggedIn && userType && <Navigation currentView={userType} />}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                !loggedIn ? (
                  <Auth onLogin={handleLogin} />
                ) : userType === "user" ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/reviewer" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                loggedIn ? (
                  <UserDashboard
                    proposals={proposals}
                    onAddProposal={handleAddProposal}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/reviewer"
              element={
                loggedIn ? (
                  <ReviewerDashboard
                    proposals={proposals}
                    evaluations={mockEvaluations}
                    onUpdateProposalStatus={handleUpdateProposalStatus}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
