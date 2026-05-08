import React, { useState } from "react";
import { useVoting } from "../context/VotingContext";
import { useAuth } from "../context/AuthContext";
import { Heart, Search, CheckCircle, Clock } from "lucide-react";

const HomePage = () => {
  const {
    filteredNurses,
    userVoted,
    addVote,
    searchTerm,
    setSearchTerm,
    loading,
    nurses,
    countdown,
    votingClosed,
  } = useVoting();
  const { currentUser } = useAuth();
  const [votedNurse, setVotedNurse] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleVote = async (nurseId, nurseName) => {
    const confirmed = window.confirm(`Vote for ${nurseName}?`);
    if (confirmed) {
      const success = await addVote(nurseId);
      if (success) {
        setVotedNurse(nurseName);
        setShowThankYou(true);
        setTimeout(() => setShowThankYou(false), 3000);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Best Nurse Voting System
        </h1>
        <p className="text-center text-gray-600">
          Vote for the nurse you believe deserves recognition.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search nurse name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Countdown Banner */}
      <div className="max-w-6xl mx-auto mb-6">
        {votingClosed ? (
          <div className="flex items-center justify-center gap-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg font-semibold">
            <Clock size={20} />
            Voting is now closed. Thank you for participating!
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 bg-blue-50 border border-blue-300 text-blue-700 px-4 py-3 rounded-lg">
            <Clock size={20} />
            <span>
              Voting closes on <strong>08/05/2026 at 11:20</strong> &mdash; Time remaining:{" "}
              <strong>{countdown}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Status Message */}
      {userVoted && (
        <div className="max-w-6xl mx-auto mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          ✓ Thank you for voting! Your vote has been recorded.
        </div>
      )}

      {/* Thank You Animation */}
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="animate-bounce bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-2">
            <CheckCircle size={24} />
            <span className="text-lg font-semibold">
              Thank you for voting for {votedNurse}!
            </span>
          </div>
        </div>
      )}

      {/* Nurse Cards Grid */}
      <div className="max-w-6xl mx-auto">
        {filteredNurses.length === 0 ? (
          <div className="text-center text-gray-500">
            {searchTerm
              ? "No nurses found matching your search."
              : "No nurses available yet."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNurses.map((nurse) => (
              <div
                key={nurse.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Avatar */}
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  <div className="text-6xl">👩‍⚕️</div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {nurse.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {nurse.department || "Healthcare Professional"}
                  </p>

                  {/* Vote Count — admin only */}
                  {currentUser && (
                    <div className="mb-4 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                      <span className="text-gray-600 font-medium">
                        Current Votes:
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        {nurse.votes || 0}
                      </span>
                    </div>
                  )}

                  {/* Vote Button */}
                  <button
                    onClick={() => handleVote(nurse.id, nurse.name)}
                    disabled={userVoted || votingClosed}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                      userVoted || votingClosed
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                    }`}
                  >
                    <Heart size={20} />
                    {votingClosed
                      ? "Voting Closed"
                      : userVoted
                      ? "Already Voted"
                      : "Vote Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="max-w-6xl mx-auto mt-12 text-center text-gray-600">
        <p className="text-sm">
          Total Nurses:{" "}
          <span className="font-bold text-blue-600">{nurses.length}</span>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
