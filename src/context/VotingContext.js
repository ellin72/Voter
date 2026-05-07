import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const VotingContext = createContext();

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error("useVoting must be used within VotingProvider");
  }
  return context;
};

export const VotingProvider = ({ children }) => {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userVoted, setUserVoted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Load initial data
  useEffect(() => {
    loadNurses();
    checkIfUserVoted();
  }, []);

  // Real-time listener for nurses
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "nurses"), (snapshot) => {
      const nursesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNurses(nursesData.sort((a, b) => b.votes - a.votes));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load nurses from Firestore
  const loadNurses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "nurses"));
      const nursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNurses(nursesData.sort((a, b) => b.votes - a.votes));
    } catch (error) {
      console.error("Error loading nurses:", error);
    }
  };

  // Add vote
  const addVote = async (nurseId) => {
    if (userVoted) {
      alert("You have already voted!");
      return false;
    }

    try {
      const nurseRef = doc(db, "nurses", nurseId);
      const nurseDoc = await getDocs(
        query(collection(db, "nurses"), where("__name__", "==", nurseId)),
      );

      if (nurseDoc.docs.length > 0) {
        const currentData = nurseDoc.docs[0].data();
        await updateDoc(nurseRef, {
          votes: (currentData.votes || 0) + 1,
        });

        localStorage.setItem("userVoted", "true");
        setUserVoted(true);
        return true;
      }
    } catch (error) {
      console.error("Error adding vote:", error);
    }
    return false;
  };

  // Add nurse
  const addNurse = async (nurseName, department) => {
    try {
      await addDoc(collection(db, "nurses"), {
        name: nurseName,
        department: department,
        votes: 0,
        createdAt: new Date(),
      });
      return true;
    } catch (error) {
      console.error("Error adding nurse:", error);
    }
    return false;
  };

  // Update nurse
  const updateNurse = async (nurseId, nurseName, department) => {
    try {
      const nurseRef = doc(db, "nurses", nurseId);
      await updateDoc(nurseRef, {
        name: nurseName,
        department: department,
      });
      return true;
    } catch (error) {
      console.error("Error updating nurse:", error);
    }
    return false;
  };

  // Delete nurse
  const deleteNurse = async (nurseId) => {
    try {
      await deleteDoc(doc(db, "nurses", nurseId));
      return true;
    } catch (error) {
      console.error("Error deleting nurse:", error);
    }
    return false;
  };

  // Reset all votes
  const resetAllVotes = async () => {
    try {
      for (const nurse of nurses) {
        const nurseRef = doc(db, "nurses", nurse.id);
        await updateDoc(nurseRef, { votes: 0 });
      }
      localStorage.removeItem("userVoted");
      setUserVoted(false);
      return true;
    } catch (error) {
      console.error("Error resetting votes:", error);
    }
    return false;
  };

  // Check if user already voted
  const checkIfUserVoted = () => {
    const voted = localStorage.getItem("userVoted") === "true";
    setUserVoted(voted);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Calculate total votes
  const getTotalVotes = () => {
    return nurses.reduce((sum, nurse) => sum + (nurse.votes || 0), 0);
  };

  // Get percentage
  const getPercentage = (votes) => {
    const total = getTotalVotes();
    return total === 0 ? 0 : Math.round((votes / total) * 100);
  };

  // Filter nurses by search term
  const filteredNurses = nurses.filter((nurse) =>
    nurse.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const value = {
    nurses,
    filteredNurses,
    loading,
    userVoted,
    darkMode,
    searchTerm,
    setSearchTerm,
    addVote,
    addNurse,
    updateNurse,
    deleteNurse,
    resetAllVotes,
    toggleDarkMode,
    getTotalVotes,
    getPercentage,
  };

  return (
    <VotingContext.Provider value={value}>{children}</VotingContext.Provider>
  );
};
