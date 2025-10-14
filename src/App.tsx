import { useState } from "react";
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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"user" | "reviewer" | null>(null);
  const [activeTab, setActiveTab] = useState<"proposals" | "profile">("proposals");

  const handleLogin = (type: "user" | "reviewer") => {
    setUserType(type);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {loggedIn && userType && (
          <Navigation 
            currentView={userType}
            activeTab={userType === "user" ? activeTab : undefined}
            onTabChange={userType === "user" ? setActiveTab : undefined}
          />
        )}
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
                  <UserDashboard proposals={mockProposals} activeTab={activeTab} />
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
                    proposals={mockProposals}
                    evaluations={mockEvaluations}
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
