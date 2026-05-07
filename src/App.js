import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { VotingProvider } from "./context/VotingContext";
import { AuthProvider } from "./context/AuthContext";
import { useVoting } from "./context/VotingContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import { BarChart3, Settings, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const { darkMode, toggleDarkMode } = useVoting();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-blue-600"
        >
          <BarChart3 size={24} />
          NurseVote
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Vote
          </Link>
          <Link
            to="/results"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Results
          </Link>
          <Link
            to="/admin-login"
            className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center gap-1"
          >
            <Settings size={18} />
            Admin
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-blue-600 font-medium py-2"
          >
            Vote
          </Link>
          <Link
            to="/results"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-blue-600 font-medium py-2"
          >
            Results
          </Link>
          <Link
            to="/admin-login"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-blue-600 font-medium py-2 flex items-center gap-1"
          >
            <Settings size={18} />
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
};

const AppContent = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <VotingProvider>
          <AppContent />
        </VotingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
