import { FileText, Users } from 'lucide-react';

interface NavigationProps {
  currentView: 'user' | 'reviewer';
  onViewChange: (view: 'user' | 'reviewer') => void;
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">NaCCER Evaluation System</h1>
          </div>

          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewChange('user')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                currentView === 'user'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span className="font-medium">User</span>
            </button>
            <button
              onClick={() => onViewChange('reviewer')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                currentView === 'reviewer'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="h-4 w-4" />
              <span className="font-medium">Reviewer</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
