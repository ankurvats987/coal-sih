import { FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  currentView: "user" | "reviewer";
}

export default function Navigation({ currentView }: NavigationProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd clear authentication tokens here
    navigate("/");
    window.location.reload(); // Simple way to reset state
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-2.5">
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">PRISM</h1>
              <p className="text-xs text-gray-500">
                {currentView === "user"
                  ? "Applicant Portal"
                  : "Reviewer Portal"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
