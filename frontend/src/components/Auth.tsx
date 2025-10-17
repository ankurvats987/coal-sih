import React, { useState } from "react";
import { FileText } from "lucide-react";

interface AuthProps {
  onLogin: (userType: "user" | "reviewer") => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"user" | "reviewer">("user");

  // Sign-up specific fields
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Mock authentication - simple validation
    setTimeout(() => {
      if (isSignUp) {
        // Sign-up validation
        if (!fullName || !institution || !designation || !phone) {
          setError("Please fill in all required fields.");
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters.");
          setLoading(false);
          return;
        }
        // Successful sign-up - redirect to user dashboard
        onLogin("user");
      } else {
        // Sign-in validation
        if (email && password) {
          onLogin(userType);
        } else {
          setError("Please enter email and password.");
        }
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PRISM</h1>
          <p className="text-sm text-gray-600">
            Proposal Review & Innovation System for Mining
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Powered by NaCCER - Coal India Limited
          </p>
        </div>

        {/* Login/Sign Up Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
            {isSignUp ? "Register as Applicant" : "Sign In"}
          </h2>

          <form className="space-y-5" onSubmit={handleAuth}>
            {/* User Type Selection - Only for Sign In */}
            {!isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Login As
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType("user")}
                    className={`px-4 py-2 text-sm font-medium rounded border transition-colors ${
                      userType === "user"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                    }`}
                  >
                    Applicant
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("reviewer")}
                    className={`px-4 py-2 text-sm font-medium rounded border transition-colors ${
                      userType === "reviewer"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                    }`}
                  >
                    Reviewer
                  </button>
                </div>
              </div>
            )}

            {/* Sign Up Fields */}
            {isSignUp && (
              <>
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dr. John Doe"
                  />
                </div>

                {/* Institution */}
                <div>
                  <label
                    htmlFor="institution"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Institution/Organization{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="IIT Delhi"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Professor / Research Scholar"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address{" "}
                {isSignUp && <span className="text-red-500">*</span>}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password {isSignUp && <span className="text-red-500">*</span>}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  isSignUp ? "Minimum 6 characters" : "Enter your password"
                }
              />
            </div>

            {/* Confirm Password - Only for Sign Up */}
            {isSignUp && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Re-enter your password"
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading
                ? isSignUp
                  ? "Registering..."
                  : "Signing In..."
                : isSignUp
                ? "Register"
                : "Sign In"}
            </button>
          </form>

          {/* Toggle Sign Up/Sign In */}
          <div className="mt-6 text-center">
            {!isSignUp ? (
              <p className="text-sm text-gray-600">
                New applicant?{" "}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

          {!isSignUp && (
            <div className="mt-4 text-center text-xs text-gray-500">
              <p>Reviewers: Contact your system administrator for access</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© 2025 PRISM - NaCCER, Coal India Limited. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
