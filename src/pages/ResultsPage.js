import React from "react";
import { useVoting } from "../context/VotingContext";
import { useAuth } from "../context/AuthContext";
import { Trophy } from "lucide-react";

const ResultsPage = () => {
  const { nurses, getTotalVotes, getPercentage, loading, votingClosed } = useVoting();
  const { currentUser } = useAuth();

  const canSeeResults = currentUser || votingClosed;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalVotes = getTotalVotes();
  const leadingNurse = nurses[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Voting Results
        </h1>
        <p className="text-center text-gray-600">
          Live rankings of nurse recognition votes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {canSeeResults && (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 text-sm">Total Votes</p>
            <p className="text-3xl font-bold text-blue-600">{totalVotes}</p>
          </div>
        )}
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 text-sm">Total Nurses</p>
          <p className="text-3xl font-bold text-indigo-600">{nurses.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 text-sm">Leading Nurse</p>
          <p className="text-xl font-bold text-yellow-600 truncate">
            {leadingNurse ? leadingNurse.name : "N/A"}
          </p>
        </div>
      </div>

      {/* Results List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {nurses.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No votes yet.
          </div>
        ) : (
          nurses.map((nurse, index) => (
            <div
              key={nurse.id}
              className={`rounded-lg shadow p-6 transition ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {index === 0 ? <Trophy size={24} /> : index + 1}
                </div>

                {/* Nurse Info */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-800">
                    {nurse.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {nurse.department || "Healthcare Professional"}
                  </p>
                </div>

                {/* Vote Info — visible to all after voting closes */}
                {canSeeResults && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {nurse.votes || 0}
                    </p>
                    <p className="text-sm text-gray-500">votes</p>
                  </div>
                )}

                {/* Badge */}
                {index === 0 && (
                  <div className="flex-shrink-0 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-semibold text-sm">
                    Leading
                  </div>
                )}
              </div>

              {/* Progress Bar — visible to all after voting closes */}
              {canSeeResults && (
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">
                      Percentage
                    </span>
                    <span className="text-xs font-bold text-gray-800">
                      {getPercentage(nurse.votes || 0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        index === 0
                          ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                          : "bg-gradient-to-r from-blue-400 to-indigo-600"
                      }`}
                      style={{ width: `${getPercentage(nurse.votes || 0)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-12 text-center text-gray-600 text-sm">
        <p>Final results as of 08/05/2026 at 11:20.</p>
      </div>
    </div>
  );
};

export default ResultsPage;
